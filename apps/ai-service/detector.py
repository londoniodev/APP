from ultralytics import YOLO
import cv2
import numpy as np

class YoloDetector:
    def __init__(self, model_path='yolov8n.pt'):
        self.model = YOLO(model_path)
        # Classes we care about: 0=person, 39=bottle, etc. (COCO dataset)
        # For shoplifting, we track people and items.
        self.target_classes = [0] # Just people for now (Intrusion)

    def detect(self, frame):
        results = self.model(frame, classes=self.target_classes, verbose=False)
        detections = []
        
        for r in results:
            boxes = r.boxes
            for box in boxes:
                b = box.xyxy[0].cpu().numpy() # get box coordinates in (top, left, bottom, right) format
                conf = box.conf[0].cpu().numpy()
                cls = box.cls[0].cpu().numpy()
                
                detections.append({
                    "bbox": b.tolist(),
                    "conf": float(conf),
                    "class": int(cls)
                })
        
        return detections, results[0].plot() # Return detections and annotated frame
