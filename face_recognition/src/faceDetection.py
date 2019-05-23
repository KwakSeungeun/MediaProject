import numpy as np
import cv2
import os
import shutil
import dlib
import sys

currentDir = os.getcwd()
user_id = sys.argv[1]

def createFolder(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print ('Error: Creating directory. ' +  directory)

def detectionFace(src):
    # openface에서 제공하는 classifier사용
    face_cascade = cv2.CascadeClassifier(os.path.join(currentDir, r"..\data\haarcascades\haarcascade_frontalface_default.xml"))
    gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.03, 5)
    return faces

createFolder(os.path.join(currentDir, r"..\..\temp\cropedFaces"))
createFolder(os.path.join(currentDir, r"..\..\temp\cropedFaces\\"+user_id))
image = cv2.imread(os.path.join(currentDir, r"..\..\temp\sourceImage\\" + user_id + "_sourceImage.jpg"))
# print("READ Image : ", image)
faces = detectionFace(image)

i=1
for (x,y,w,h) in faces:
    cv2.rectangle(image, (x,y),(x+w, y+h),(0,255,0),2)
    sub_face = image[y:y+h, x:x+w] 
    face_file_name = os.path.join(currentDir, r"..\..\temp\cropedFaces\\"+user_id +"\\"+ user_id +"_face_") + str(i) + ".jpg"
    cv2.imwrite(face_file_name, sub_face)
    i += 1