exports.getList = (req, res)=>{
  res.send('get files!');
};

exports.upload = (req, res) =>{
  console.log("REQ : ",req);
  res.json({result : 'upload files!'});
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