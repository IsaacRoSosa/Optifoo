from ultralytics import YOLO
from collections import Counter

def detect_objects(img, model_name='yolov5su.pt'):
    """Detect objects in a pre-processed numpy.ndarray image."""
    model = YOLO(model_name)

    results = model.predict(source=img, save=False, conf=0.3)

    if results[0].boxes:
        detected_objects = []
        for box in results[0].boxes:
            class_id = int(box.cls[0])
            object_name = model.names[class_id]
            detected_objects.append(object_name)

        object_count = Counter(detected_objects)
        result = [{"element": obj, "count": count} 
                  for obj, count in object_count.items()]
        return result
    else:
        return [{"error": "No objects detected"}]