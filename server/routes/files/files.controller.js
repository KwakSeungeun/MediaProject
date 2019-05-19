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
  form.encoding = 'utf-8';
  form.keepExtensions = true;

  form.parse(req, function(err, fields, files) {
     let user = JSON.parse(fields.user_info);

      _.forEach(files, (file)=>{
        // console.log(file)
        fs.readFile(file.path, 'utf8', (err, data)=>{
          console.log(data)
          axios.put(`${config.swiftUri}/v1/${config.adminProjectId}/${user.id}/${file.name}`, data, {
            headers: {
              // "Content-Type" : `${file.type}`,
              "X-Auth-Token" : `${user.os_token}`
            },
            // body: data,
            // encoding : 'binary'
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