# INPUT  << image file
# OUTPUT >> detected faces

import numpy as np
import cv2
import os
import shutil
import dlib

def detectionFace(src):
    # openface에서 제공하는 classifier사용
    face_cascade = cv2.CascadeClassifier('../data/haarcascades/haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.03, 5)
    return faces

# 파이썬 실행시 사진을 input으로 줘야함
# createFolder("./detectedFaces/")
# image = cv2.imread("../images/testImage2.jpg")
# faces = detectionFace(image)