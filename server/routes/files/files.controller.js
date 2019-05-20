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
  form.multiples = true;
  form.keepExtensions = true;

  form.parse(req, async function(err, fields, files) {
     let user = JSON.parse(fields.user_info);

     await _.map(files.file, async(file)=>{
       // temp에 저장되어 있는 데이터 읽기
        return await fs.readFile(file.path, async(err, binaryData)=>{
          // swift api를 이용해 읽어온 data 넘기기
          return await axios.put(`${config.swiftUri}/v1/${config.adminProjectId}/${user.id}/${file.name}`, 
          binaryData, {
            headers: {
              "Content-Type" : `${file.type}`,
              "X-Auth-Token" : `${user.os_token}`
            },
          }).catch(err => {
            res.status(500).json({
              err : err.message
            });
          });
        })
     })

     res.json({message : "success upload files"});
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