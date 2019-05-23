const formidable = require('formidable');
const fs = require('fs');
// const pythonShell = require('python-shell');
const cmd = require('node-command-line');

exports.faceDetection = (req, res)=>{
    let form = new formidable.IncomingForm()
    form.multiples = true; //여러 파일 업로드
    form.encoding = 'utf-8'; //인코딩 타입 정의 (한글 사용 가능) => header에 setting이 되지 않음
    form.keepExtensions = true; //확장자 표시

    form.on('file', (field, file)=>{
        console.log("읽어온 파일 : ",file);
    })
    form.parse(req, (err, fields, files)=>{
        console.log("============LAST============");
    })

    // cmd.run('activate face_recognition');
    // cmd.run('python ../../face_recognition/src/faceDetection.py');

    res.send('success');

    // let options = {
    //     mode: 'text',
    //     pythonOptions: ['-u'],
    //     scriptPath: '../../../face_recognition/src/',
    //     args: ['test1', 'test2']
    // };
    // pythonShell.run('faceDetection.py', options, function (err, results) {
    //     if (err) throw err;
    //     console.log('results: %j', results);
    //     res.send('success');
    // });
}