import boto3
import os
import sys
import urllib.request
import shutil

def removeFolder(directory):
    try:
        shutil.rmtree(directory)
    except OSError:
        print('Error: Removing directory.' + directory)

def createFolder(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print ('Error: Creating directory. ' +  directory)

print("\n\n\n================== START PYTHON ====================\n")

resultURL = []
currentDir = os.getcwd()

fileName = sys.argv[1]
userId = sys.argv[2]

# 찾고자 하는 얼굴 읽어오기
sourceFile = currentDir +'\\..\\..\\temp\\cropedFaces\\' + userId + '\\' + fileName # 선택한 얼굴
imageSource=open(sourceFile,'rb')

createFolder('./temp_' + userId)

for i in range(3,len(sys.argv)):
    print()
    info = sys.argv[i].split('_'); #0 : filename, 1 : signiture, 2: expire
    tempURL = "http://13.125.219.210:8080/" + "v1/" + "AUTH_c0b8a4b703d94f0db5e9446472dd8432/" + userId + "/" + info[0] + "?temp_url_sig=" + info[1] + "&temp_url_expires=" + info[2]

    targetFile = './temp_' + userId + '/_tempTarget_' + str(i) + '.jpeg'
    urllib.request.urlretrieve(tempURL, targetFile)
    imageTarget = open(targetFile, 'rb')

client = boto3.client('rekognition');
response = client.compare_faces(SimilarityThreshold=70,
                                SourceImage={'Bytes': imageSource.read()},
                                TargetImage={'Bytes': imageTarget.read()})
for faceMatch in response['FaceMatches']:
    similarity = faceMatch['Similarity']
    print(similarity)
    
imageTarget.close()
imageSource.close()
removeFolder('./temp_' + userId)
print("================== END PYTHON =====================\n\n\n")