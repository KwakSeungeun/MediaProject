const axios = require('axios');
const cloud = require('../../config/cloud.config');

exports.getList = (req, res)=>{
  res.send('get files!');
};

exports.upload = (req, res) =>{
  console.log(req.body);
  axios.put(`${cloud.uri}/`)
  // res.send();
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