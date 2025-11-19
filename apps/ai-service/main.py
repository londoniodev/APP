from fastapi import FastAPI
import cv2
import threading
import time
import os
import requests
from detector import YoloDetector
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

import io
from minio import Minio
import uuid
from urllib.parse import urlparse

# Configuration
RTSP_URL = os.getenv("RTSP_URL", 0) # Default to webcam (0) if not set
API_URL = os.getenv("API_URL", "http://localhost:3000")
CAMERA_ID = os.getenv("CAMERA_ID", "test-camera")

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
