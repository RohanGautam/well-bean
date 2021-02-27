import cv2
import numpy as np
import dlib
from imutils import face_utils
import face_recognition
from keras.models import load_model
from statistics import mode
from utils.datasets import get_labels
from utils.inference import detect_faces
from utils.inference import draw_text
from utils.inference import draw_bounding_box
from utils.inference import apply_offsets
from utils.inference import load_detection_model
from utils.preprocessor import preprocess_input
import sys

USE_WEBCAM = False # If false, loads video file source
SRC = sys.argv[1]
OUTPUT = sys.argv[2]

# parameters for loading data and images
emotion_model_path = '/Users/laksh/Desktop/Projects/well-bean/server/emotion-recognition/models/emotion_model.hdf5'
emotion_labels = get_labels('fer2013')

cap = cv2.VideoCapture(SRC)
_, first_frame = cap.read()
length = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

fourcc = cv2.VideoWriter_fourcc(*'FMP4')
out = cv2.VideoWriter(
            OUTPUT, fourcc, 20.0, (first_frame.shape[:2][1], first_frame.shape[:2][0]))

# hyper-parameters for bounding boxes shape
frame_window = 10
emotion_offsets = (20, 40)

# loading models
detector = dlib.get_frontal_face_detector()
emotion_classifier = load_model(emotion_model_path)

# predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")


# getting input model shapes for inference
emotion_target_size = emotion_classifier.input_shape[1:3]

# starting lists for calculating modes
emotion_window = []

# Select video or webcam feed
cap = None
if (USE_WEBCAM == True):
    cap = cv2.VideoCapture(0) # Webcam source
else:
    cap = cv2.VideoCapture(SRC) # Video file source

moods = {
  "happy": 0,
  "sad": 0,
  "neutral": 0,
}

for i in range(length): # True:
    ret, bgr_image = cap.read()

    if not ret:
        break

    #bgr_image = video_capture.read()[1]

    gray_image = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2GRAY)
    rgb_image = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2RGB)

    faces = detector(rgb_image)

    for face_coordinates in faces:

        x1, x2, y1, y2 = apply_offsets(face_utils.rect_to_bb(face_coordinates), emotion_offsets)
        gray_face = gray_image[y1:y2, x1:x2]
        try:
            gray_face = cv2.resize(gray_face, (emotion_target_size))
        except:
            continue

        gray_face = preprocess_input(gray_face, True)
        gray_face = np.expand_dims(gray_face, 0)
        gray_face = np.expand_dims(gray_face, -1)
        emotion_prediction = emotion_classifier.predict(gray_face)
        emotion_probability = np.max(emotion_prediction)
        emotion_label_arg = np.argmax(emotion_prediction)
        emotion_text = emotion_labels[emotion_label_arg]
        emotion_window.append(emotion_text)

        if len(emotion_window) > frame_window:
            emotion_window.pop(0)
        try:
            emotion_mode = mode(emotion_window)
        except:
            continue

        if emotion_text == 'angry':
            color = emotion_probability * np.asarray((255, 0, 0))
        elif emotion_text == 'sad':
            color = emotion_probability * np.asarray((0, 0, 255))
            moods["sad"] = moods["sad"]+1
        elif emotion_text == 'happy':
            color = emotion_probability * np.asarray((255, 255, 0))
            moods["happy"] = moods["happy"]+1
        elif emotion_text == 'surprise':
            color = emotion_probability * np.asarray((0, 255, 255))
        else:
            color = emotion_probability * np.asarray((0, 255, 0))
            moods["neutral"] = moods["neutral"]+1

        color = color.astype(int)
        color = color.tolist()

        draw_bounding_box(face_utils.rect_to_bb(face_coordinates), rgb_image, color)
        draw_text(face_utils.rect_to_bb(face_coordinates), rgb_image, emotion_mode,
                  color, 0, -45, 1, 1)

    bgr_image = cv2.cvtColor(rgb_image, cv2.COLOR_RGB2BGR)
    
    out.write(bgr_image)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
out.release()
cv2.destroyAllWindows()
print(f"{moods['happy']} {moods['sad']} {moods['neutral']}")