const axios = require('axios');
const cloud = require('../../config/cloud.config');
const formidable = require('formidable')
// const util = require('util')
exports.getList = (req, res)=>{
  res.send('get files!');
};

exports.upload = (req, res) =>{
  let form = new formidable.IncomingForm()
  form.multiples = true;
  form.encoding = 'utf-8';
  form.keepExtensions = true;

  form.parse(req, function(err, fields, files) {
     console.log('user_info: ', fields);
     console.log('files', files);

     
  })

  res.send();
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