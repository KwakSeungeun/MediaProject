const formidable = require('formidable');
const fs = require('fs');
// const pythonShell = require('python-shell');
const cmd = require('node-command-line');

exports.faceDetection = (req, res)=>{
    console.log("\n\n========================");
    let form = new formidable.IncomingForm()
    form.multiples = true; //여러 파일 업로드
    form.encoding = 'utf-8'; //인코딩 타입 정의 (한글 사용 가능) => header에 setting이 되지 않음
    form.keepExtensions = true; //확장자 표시

    let user_id = null;

    new Promise((resolve, reject)=>{
        form.on('field', (field, value)=>{
            user_id = value;
            console.log("USER_ID : ", user_id)
        }).on('file', (field, file)=>{
            // console.log("읽어온 파일 : ",file);
        }).on('error', error=>{
            console.log("READ FORMDATA ERR!!\n");
            reject(error);
        });
    
        form.parse(req, (err, fields, files)=>{
            console.log("============LAST============");
            resolve();
        })
    }).then(()=>{
        // python 실행 (arg로 아이디 보내주기)
        // cmd.run('activate face_recognition');
        // cmd.run('python ../../../face_recognition/src/faceDetection.py');
    }).then(()=>{
        //  소스파일 삭제 (croped 는 얼굴 다 찾고 삭제 하기)
    }).then(()=>{
        // 완료
        res.send('success');
    }).catch((err)=>{
        console.log("READ FORMDATA ERR!!\n");
        res.status(500).json({message : "fail face Detection"});
    })

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