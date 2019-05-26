### Cloud Service 얼굴인식 구조

### 설치 library

FACE DETECTION
```
    pip install numpy

    pip install opencv-python

    pip install https://pypi.python.org/packages/da/06/bd3e241c4eb0a662914b3b4875fc52dd176a9db0d4a2c915ac2ad8800e9e/dlib-19.7.0-cp36-cp36m-win_amd64.whl#md5=b7330a5b2d46420343fbed5df69e6a3f

```

FACE COMPARISION

1.package 설치
```
    pip install boto3

    pip install awscli --upgrad

```

2.aws configure 사용권한 설정
```
cmd

    aws configure

    access_key : 입력

    access_secret_key : 입력

    region : 입력(ex. 'us-east-1')
    
```



##### 사진 검색 시나리오
1.사용자는 하나의 이미지 선택

2.옵션으로 장소, 시간 선택

3.(옵션이 있다면) 장소, 시간으로 Image 분류 

4.crop된 이미지와 비교해 이 얼굴이 포함된 모든 사진 return

이미지를 storage에 검색이 빠르도록 잘 저장해야 할듯!

##### 얼굴 유사도 링크

1.https://jsh93.tistory.com/52

2.https://m.blog.naver.com/PostView.nhn?blogId=kjh3864&logNo=221219659663&proxyReferer=https%3A%2F%2Fwww.google.co.kr%2F

window에서 torch와 openface 설치가 어려움


##### 설치