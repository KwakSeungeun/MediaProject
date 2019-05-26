import numpy as np
import cv2
import os
import shutil
import dlib
# import openface

def createFolder(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print ('Error: Creating directory. ' +  directory)

def removeFolder(directory):
    try:
        shutil.rmtree(directory)
    except OSError:
        print('Error: Removing directory.' + directory)

def detectionFace(src):
    # openface에서 제공하는 classifier사용
    face_cascade = cv2.CascadeClassifier('../data/haarcascades/haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.03, 5)
    return faces

def transFace(src):
    return src

#crop face저장하기 위한 경로
createFolder("./detectedFaces/")
image = cv2.imread("../images/testImage1.jpg")
faces = detectionFace(image)

for (x,y,w,h) in faces:
    cv2.rectangle(image, (x,y),(x+w, y+h),(0,255,0),2)
    sub_face = image[y:y+h, x:x+w]
    sub_face_gray = cv2.cvtColor(sub_face, cv2.COLOR_BGR2GRAY)
    trans_face = transFace(sub_face_gray)
    face_file_name = "./detectedFaces/face_" + str(y) + ".jpg"
    cv2.imwrite(face_file_name, trans_face)

cv2.imshow("face detection test", image) 
cv2.waitKey(0)
# removeFolder("./detectedFaces/")
cv2.destoryAllWindows()

# Classifier가 정확하지 않음 => 얼굴이 아닌 부분도 인식하는 경우가 있음
# Feature matching을 사용하여 찾고자 하는 사람의 얼굴이 들어있는 사진을 모을 수 있을 것으로 생각.
# crop전에 평면에 잘 보이도록 transform(using dlib) 필요?? (학습시에는 이것이 필요)
# crop된 이미지들을 사용자 전체에게 뿌리기 => Openface 사용해 이와 관련한 결과값 뿌려주기