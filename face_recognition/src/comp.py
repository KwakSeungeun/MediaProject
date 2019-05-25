import boto3
import os
import sys

currentDir = os.getcwd()

targetListlen = len(sys.argv)

fileName = sys.argv[1]
userId = sys.argv[2]

sourceFile = currentDir +'\\..\\..\\temp\\cropedFaces\\' + userId + '\\' + fileName # 선택한 얼굴
imageSource=open(sourceFile,'rb')


for i in range(3,len(sys.argv)):
    print(sys.argv[i])

# targetFile = '../images/testImage1.jpg' # true 이미지
# imageTarget=open(targetFile,'rb')

# client = boto3.client('rekognition');

# response = client.compare_faces(SimilarityThreshold=85, 
#                                 SourceImage = {'Bytes' : imageSource.read(),}, 
#                                 TargetImage = {'Bytes' : imageTarget.read()})

# # S3에 있는 것을 reference로 하기 때문에 직접 이용하기 어려움
# # searchRes = client.search_faces_by_image(...)

# # response['FaceMatches'] == [] 매치된 얼굴이 없는것
# # response['FaceMatches'] == [...] 매칭되면 이 안에 매칭된 box 위치와 similarity나옴
# for faceMatch in response['FaceMatches']:
#     similarity = faceMatch['Similarity']
#     print('The face sibilarity is ' , similarity)

# imageSource.close()
# imageTarget.close()
print("====Complete comparision====")