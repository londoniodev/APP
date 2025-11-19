import os
import warnings

# Suppress NNPACK warnings
os.environ['OMP_NUM_THREADS'] = '1'
warnings.filterwarnings('ignore', category=UserWarning)

from fastapi import FastAPI
import cv2
import threading
import time
import numpy as np
import requests
from detector import YoloDetector
from dotenv import load_dotenv
import io
from minio import Minio
import uuid
from urllib.parse import urlparse

load_dotenv()

app = FastAPI()

# Configuration
API_URL = os.getenv("API_URL", "http://api:3000")

# MinIO Config
MINIO_ACCESS_KEY = os.getenv("MINIO_ROOT_USER", "minioadmin")
MINIO_SECRET_KEY = os.getenv("MINIO_ROOT_PASSWORD", "minioadmin")
MINIO_SERVER_URL = os.getenv("MINIO_SERVER_URL", "https://s3.universoexplora.tech")

# Parse endpoint and secure flag from SERVER_URL
parsed_url = urlparse(MINIO_SERVER_URL)
MINIO_ENDPOINT = os.getenv("MINIO_ENDPOINT", parsed_url.netloc)
MINIO_SECURE = parsed_url.scheme == "https"
MINIO_BUCKET = os.getenv("MINIO_BUCKET", "events")

# Initialize MinIO Client
minio_client = Minio(
    MINIO_ENDPOINT,
    access_key=MINIO_ACCESS_KEY,
    secret_key=MINIO_SECRET_KEY,
    secure=MINIO_SECURE
)

# Global state
detector = YoloDetector()
is_running = False
camera_threads = {}  # {camera_id: thread}
camera_frames = {}  # {camera_id: latest_annotated_frame}

def upload_snapshot(frame):
    """Upload frame to MinIO and return public URL"""
    try:
        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            return None
        
        data = io.BytesIO(buffer)
        length = len(buffer)
        filename = f"{uuid.uuid4()}.jpg"
        
        minio_client.put_object(
            MINIO_BUCKET,
            filename,
            data,
            length,
            content_type="image/jpeg"
        )
        
        url = f"{MINIO_SERVER_URL}/{MINIO_BUCKET}/{filename}"
        return url
    except Exception as e:
        print(f"❌ MinIO Upload Error: {e}")
        return None

def get_active_cameras():
    """Fetch active cameras from the API"""
    try:
        response = requests.get(f"{API_URL}/cameras")
        if response.status_code == 200:
            cameras = response.json()
            # Filter only active cameras
            return [cam for cam in cameras if cam.get('isActive', False)]
        else:
            print(f"❌ Failed to fetch cameras: {response.status_code}")
            return []
    except Exception as e:
        print(f"❌ Error fetching cameras: {e}")
        return []

def process_camera(camera):
    """Process video stream from a single camera"""
    global camera_frames
    camera_id = camera['id']
    rtsp_url = camera['rtspUrl']
    camera_name = camera['name']
    
    print(f"📹 Starting processing for camera: {camera_name} (ID: {camera_id})")
    
    cap = cv2.VideoCapture(rtsp_url)
    
    if not cap.isOpened():
        print(f"❌ Could not open camera {camera_name} at {rtsp_url}")
        return
    
    last_alert_time = 0
    ALERT_COOLDOWN = 10  # Seconds between alerts
    
    while is_running and camera_id in camera_threads:
        ret, frame = cap.read()
        if not ret:
            print(f"⚠️ Stream ended for {camera_name}, retrying in 5s...")
            time.sleep(5)
            cap = cv2.VideoCapture(rtsp_url)
            continue
        
        # Run Detection
        detections, annotated_frame = detector.detect(frame)
        
        # Store latest annotated frame for streaming
        camera_frames[camera_id] = annotated_frame
        
        # Check for person detection
        person_detected = any(d['class'] == 0 for d in detections)
        
        current_time = time.time()
        if person_detected and (current_time - last_alert_time > ALERT_COOLDOWN):
            print(f"⚠️ Person detected on {camera_name}! Confidence: {detections[0]['conf']:.2f}")
            
            # Upload snapshot
            snapshot_url = upload_snapshot(annotated_frame)
            if not snapshot_url:
                snapshot_url = ""
            
            # Send event to API
            try:
                payload = {
                    "type": "INTRUSION",
                    "cameraId": camera_id,
                    "description": f"Person detected on {camera_name} with confidence {detections[0]['conf']:.2f}",
                    "snapshotUrl": snapshot_url,
                    "videoUrl": ""
                }
                response = requests.post(f"{API_URL}/events", json=payload)
                if response.status_code == 201:
                    print(f"✅ Event sent for {camera_name}. Snapshot: {snapshot_url}")
                    last_alert_time = current_time
                else:
                    print(f"❌ Failed to send event for {camera_name}: {response.text}")
            except Exception as e:
                print(f"❌ Error sending event for {camera_name}: {e}")
    
    cap.release()
    print(f"🛑 Stopped processing camera: {camera_name}")

def camera_manager():
    """Periodically check for new/removed cameras and manage threads"""
    global camera_threads
    
    while is_running:
        try:
            # Get current active cameras from API
            active_cameras = get_active_cameras()
            active_camera_ids = {cam['id'] for cam in active_cameras}
            current_camera_ids = set(camera_threads.keys())
            
            # Start threads for new cameras
            new_cameras = active_camera_ids - current_camera_ids
            for camera in active_cameras:
                if camera['id'] in new_cameras:
                    thread = threading.Thread(
                        target=process_camera,
                        args=(camera,),
                        daemon=True
                    )
                    thread.start()
                    camera_threads[camera['id']] = thread
                    print(f"✅ Started monitoring camera: {camera['name']}")
            
            # Remove threads for deleted/inactive cameras
            removed_cameras = current_camera_ids - active_camera_ids
            for camera_id in removed_cameras:
                if camera_id in camera_threads:
                    del camera_threads[camera_id]
                    print(f"🗑️ Stopped monitoring camera ID: {camera_id}")
            
        except Exception as e:
            print(f"❌ Error in camera manager: {e}")
        
        # Check every 30 seconds for camera changes
        time.sleep(30)

@app.on_event("startup")
def startup_event():
    global is_running
    is_running = True
    
    # Start camera manager thread
    manager_thread = threading.Thread(target=camera_manager, daemon=True)
    manager_thread.start()
    print("🚀 AI Service started - monitoring cameras from API")

@app.on_event("shutdown")
def shutdown_event():
    global is_running
    is_running = False
    print("🛑 AI Service shutting down")

@app.get("/")
def read_root():
    return {
        "status": "running",
        "api_url": API_URL,
        "active_cameras": len(camera_threads)
    }

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/cameras")
def list_cameras():
    """List currently monitored cameras"""
    return {
        "active_cameras": list(camera_threads.keys()),
        "count": len(camera_threads)
    }

@app.get("/stream/{camera_id}")
def stream_camera(camera_id: str):
    """Stream MJPEG video with detections for a specific camera"""
    from fastapi.responses import StreamingResponse
    
    print(f"🔌 Client connected to stream for camera {camera_id}")
    
    def generate():
        while True:
            if camera_id in camera_frames:
                frame = camera_frames[camera_id]
                # Encode frame to JPEG
                ret, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 95])
                if ret:
                    yield (b'--frame\r\n'
                           b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
                else:
                    print(f"❌ Failed to encode frame for camera {camera_id}")
            else:
                # Print once per second to avoid log spam
                if int(time.time()) % 5 == 0:
                    print(f"⚠️ No frame available for camera {camera_id}. Available cameras: {list(camera_frames.keys())}")
                
                # Create a black placeholder frame with text
                blank_image = np.zeros((480, 640, 3), np.uint8)
                cv2.putText(blank_image, "Waiting for stream...", (50, 240), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
                ret, buffer = cv2.imencode('.jpg', blank_image)
                if ret:
                     yield (b'--frame\r\n'
                           b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
                
            time.sleep(0.05) # ~20 FPS
    
    return StreamingResponse(
        generate(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )


# MinIO Config
# Adapting to user's environment variables
MINIO_ACCESS_KEY = os.getenv("MINIO_ROOT_USER", "minioadmin")
MINIO_SECRET_KEY = os.getenv("MINIO_ROOT_PASSWORD", "minioadmin")
MINIO_SERVER_URL = os.getenv("MINIO_SERVER_URL", "https://s3.universoexplora.tech")

# Parse endpoint and secure flag from SERVER_URL
parsed_url = urlparse(MINIO_SERVER_URL)
MINIO_ENDPOINT = os.getenv("MINIO_ENDPOINT", parsed_url.netloc) # Use netloc (domain) from URL
MINIO_SECURE = parsed_url.scheme == "https"
MINIO_BUCKET = os.getenv("MINIO_BUCKET", "events")

# Initialize MinIO Client
minio_client = Minio(
    MINIO_ENDPOINT,
    access_key=MINIO_ACCESS_KEY,
    secret_key=MINIO_SECRET_KEY,
    secure=MINIO_SECURE
)

detector = YoloDetector()
is_running = False

def upload_snapshot(frame):
    try:
        # Encode frame to jpg
        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            return None
        
        data = io.BytesIO(buffer)
        length = len(buffer)
        filename = f"{uuid.uuid4()}.jpg"
        
        # Upload
        minio_client.put_object(
            MINIO_BUCKET,
            filename,
            data,
            length,
            content_type="image/jpeg"
        )
        
        # Generate URL
        # Using the provided MINIO_SERVER_URL to construct the public link
        url = f"{MINIO_SERVER_URL}/{MINIO_BUCKET}/{filename}"
        
        return url
    except Exception as e:
        print(f"❌ MinIO Upload Error: {e}")
        return None

def process_video():
    global is_running
    cap = cv2.VideoCapture(RTSP_URL)
    
    if not cap.isOpened():
        print(f"Error: Could not open video source {RTSP_URL}")
        return

    print(f"Started processing video from {RTSP_URL}")
    
    last_alert_time = 0
    ALERT_COOLDOWN = 10 # Seconds between alerts

    while is_running:
        ret, frame = cap.read()
        if not ret:
            print("Stream ended or failed, retrying in 5s...")
            time.sleep(5)
            cap = cv2.VideoCapture(RTSP_URL)
            continue

        # Run Detection
        detections, annotated_frame = detector.detect(frame)
        
        # Logic: If person detected, log it (and eventually send to API)
        person_detected = any(d['class'] == 0 for d in detections) # 0 is Person
        
        current_time = time.time()
        if person_detected and (current_time - last_alert_time > ALERT_COOLDOWN):
            print(f"⚠️ Person detected! Confidence: {detections[0]['conf']:.2f}")
            
            # Upload Snapshot
            snapshot_url = upload_snapshot(annotated_frame)
            if not snapshot_url:
                snapshot_url = "http://placeholder.com/error.jpg"

            # Send event to API
            try:
                payload = {
                    "type": "INTRUSION",
                    "cameraId": CAMERA_ID,
                    "description": f"Person detected with confidence {detections[0]['conf']:.2f}",
                    "snapshotUrl": snapshot_url,
                    "videoUrl": ""
                }
                response = requests.post(f"{API_URL}/events", json=payload)
                if response.status_code == 201:
                    print(f"✅ Event sent to API. Snapshot: {snapshot_url}")
                    last_alert_time = current_time
                else:
                    print(f"❌ Failed to send event: {response.text}")
            except Exception as e:
                print(f"❌ Error sending event: {e}")
            
        # Optional: Resize for performance if needed
        # frame = cv2.resize(frame, (640, 480))
        
        # In a real headless service, we don't show the window.
        # cv2.imshow("AI Service", annotated_frame)
        # if cv2.waitKey(1) & 0xFF == ord('q'):
        #     break
            
    cap.release()
    print("Video processing stopped.")

@app.on_event("startup")
def startup_event():
    global is_running
    is_running = True
    thread = threading.Thread(target=process_video, daemon=True)
    thread.start()

@app.on_event("shutdown")
def shutdown_event():
    global is_running
    is_running = False

@app.get("/")
def read_root():
    return {"status": "running", "camera": RTSP_URL}

@app.get("/health")
def health_check():
    return {"status": "ok"}
