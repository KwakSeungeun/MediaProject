const formidable = require('formidable');
const fs = require('fs');

exports.faceDetection = (req, res)=>{
    let form = new formidable.IncomingForm()
    form.multiples = true; //여러 파일 업로드
    form.encoding = 'utf-8'; //인코딩 타입 정의 (한글 사용 가능) => header에 setting이 되지 않음
    form.keepExtensions = true; //확장자 표시

    form.on('file', (field, file)=>{
        console.log(file);
    })
    // fs.readFile(form.uploadDir,data => {
    //     console.log(data);
    // })
    console.log("====END=====")
    res.send('!!!');
}