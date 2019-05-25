const formidable = require('formidable');
const fs = require('fs');
// const pythonShell = require('python-shell');
const cmd = require('node-command-line');

/**
 * Promise all
 * @author Loreto Parisi (loretoparisi at gmail dot com)
 */
function promiseAllP(items, block) {
    var promises = [];
    items.forEach(function(item,index) {
        promises.push( function(item,i) {
            return new Promise(function(resolve, reject) {
                return block.apply(this,[item,index,resolve,reject]);
            });
        }(item,index))
    });
    return Promise.all(promises);
} //promiseAll

/**
 * read files
 * @param dirname string
 * @return Promise
 * @author Loreto Parisi (loretoparisi at gmail dot com)
 * @see http://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
 */
function readFiles(dirname) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, function(err, filenames) {
            if (err) return reject(err);
            promiseAllP(filenames,
            (filename,index,resolve,reject) =>  {
                fs.readFile((dirname + filename), function(err, content) {
                    if (err) return reject(err);
                    return resolve({filename: filename, contents: content.toString('base64')});
                });
            })
            .then(results => {
                return resolve(results);
            })
            .catch(error => {
                return reject(error);
            });
        });
  });
}

exports.faceDetection = (req, res)=>{
    let form = new formidable.IncomingForm()
    form.multiples = true; //여러 파일 업로드
    form.encoding = 'utf-8'; //인코딩 타입 정의 (한글 사용 가능) => header에 setting이 되지 않음
    form.keepExtensions = true; //확장자 표시

    let user_id = null;
    let fileDir;
    let sourceDir = __dirname + '\\..\\..\\..\\temp\\sourceImage';
    let detectionDir = __dirname + "\\..\\..\\..\\face_recognition\\src";
    let images = [];

    if(!fs.existsSync(sourceDir)){
        fs.mkdirSync(sourceDir);
    }

    new Promise(async(resolve, reject)=>{
        // __dirname : 현재 절대 경로
        await form.parse(req, (err, fields, files)=>{
            user_id = fields.field;
            let fileName = user_id + "_sourceImage";
            let file = files.file;
            fileDir = `${sourceDir}\\${fileName}.jpeg`;
            fs.renameSync(file.path,fileDir,()=>{});
            resolve();
        })
    }).then(async()=>{
        // python 실행 (arg로 아이디 보내주기)
        let count = await cmd.run(`cd ${detectionDir} & activate face_recognition & python faceDetection.py ${user_id}\n`);
    }).then(()=>{
        //  소스파일 삭제 (croped 는 얼굴 다 찾고 삭제 하기)
        fs.unlinkSync(`${fileDir}`);
    }).then(async()=>{
        // 잘린 얼굴들 보내기 
        readFiles(`${__dirname}\\..\\..\\..\\temp\\cropedFaces\\${user_id}\\`)
        .then(files => {
            // 완료
            res.json({
                data : files
            });
        })
        .catch( error => {
            console.log( error );
        });      
    }).catch((err)=>{
        console.log("READ FORMDATA ERR!!\n", err);
        res.status(500).json({message : "fail face Detection"});
    })
}

exports.faceComparison = (req, res)=>{
    new Promise(async(resolve, reject)=>{
        // 파일 이름과 유저 아이디 받아오기
        let file_name = req.query.file_name;
        let user_id = req.query.user_id;
        let target_list = req.query.target_list.replace(/,/gi, " ");

        // 파이썬 돌리기
        let detectionDir = __dirname + "\\..\\..\\..\\face_recognition\\src";
        console.log(target_list);

        await cmd.run(`cd ${detectionDir} & activate face_recognition & python comp.py ${file_name} ${user_id} ${target_list}\n`);
        resolve()
    }).then(()=>{
        // croped 한 얼굴 이미지들 지우기 
        res.json({message : 'success'})
    })
}