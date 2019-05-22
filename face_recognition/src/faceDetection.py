import numpy as np
import cv2
import os
import shutil
import dlib

currentDir = os.getcwd()

def createFolder(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print ('Error: Creating directory. ' +  directory)

def detectionFace(src):
    # openface에서 제공하는 classifier사용
#     face_cascade = cv2.CascadeClassifier(os.path.join(currentDir, r"..\data\haarcascades\haarcascade_frontalface_default.xml"))
    face_cascade = cv2.CascadeClassifier('../data/haarcascades/haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.03, 5)
    return faces

createFolder(os.path.join(currentDir, r"..\..\temp\cropedFaces"))
image = cv2.imread(os.path.join(currentDir, r"..\..\temp\sourceImage\peopleTest.jpg"))
faces = detectionFace(image)

for (x,y,w,h) in faces:
    cv2.rectangle(image, (x,y),(x+w, y+h),(0,255,0),2)
    sub_face = image[y:y+h, x:x+w] 
    face_file_name = os.path.join(currentDir, r"..\..\temp\cropedFaces\face_") + str(y) + ".jpg"
    cv2.imwrite(face_file_name, sub_face)