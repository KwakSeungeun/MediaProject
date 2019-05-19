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

  form.parse(req, function(err, fields, files) {
     let user = JSON.parse(fields.user_info);

      _.forEach(files, (file)=>{
        fs.readFile(file.path, (err, binaryData)=>{
          axios.put(`${config.swiftUri}/v1/${config.adminProjectId}/${user.id}/${file.name}`, binaryData, {
            headers: {
              "Content-Type" : `${file.type}`,
              "X-Auth-Token" : `${user.os_token}`
            },
          }).then(() => {
            res.json({message : "success upload!"});
          }).catch(err => {
            console.log(err)
            res.status(500).json({
              err : err.message
            });
          })
          
        })
      })
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