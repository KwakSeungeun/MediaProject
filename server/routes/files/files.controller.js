const axios = require('axios');
const config = require('../../config/cloud.config');
const formidable = require('formidable')
const _ = require('lodash');
const fs = require('fs');

exports.getList = (req, res)=>{
  res.send('get files!');
};

exports.upload = (req, res) =>{
  let form = new formidable.IncomingForm()
  form.multiples = true; //여러 파일 업로드
  form.encoding = 'utf-8'; //인코딩 타입 정의 (한글 사용 가능) => header에 setting이 되지 않음
  form.keepExtensions = true; //확장자 표시

  let user;
  form.on('field', (field, value)=>{
    user = JSON.parse(value);
  }).on('file', async (field, file)=>{
    console.log("type : ", file.type);
    await fs.readFile(file.path,'utf-8' , async function(err, data){
      await axios.put(`${config.swiftUri}/v1/${config.adminProjectId}/${user.id}/${file.name}`, data, {
        headers: {
          "Content-Type" : `${file.type}`,
          "X-Auth-Token" : `${user.os_token}`
        },
      }).then(()=>{
        console.log("클라우드 업로드 성공!");
      }).catch(err => {
        res.status(500).json( {
          message : "Fail upload to Cloud(SWIFT)!",
          err : err.message
        });
      });
    });
  }).on('end', ()=>{
    console.log("=========SUCCESS!========");
    res.json({message : "success upload files"});
  }).on('error', error=>{
    console.log("ERR!!\n");
    res.status(500).json({message : "fail upload"});
  });

  form.parse(req, (err, fields, files)=>{
    console.log("============LAST============");
  })
}

exports.download = (req, res)=>{
  res.send('download files!');
}

exports.arrange = (req, res)=>{
  res.send('arrange files!');
}

exports.delete = (req, res)=>{
  res.send('delete files!');
}