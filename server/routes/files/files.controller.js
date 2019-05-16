const IncomingForm = require('formidable').IncomingForm

exports.getList = (req, res)=>{
  res.send('get files!');
};

exports.upload = (req, res) =>{
  var form = new IncomingForm()

  form.on('file', (field, file) => {
    // 파일처리 / 오픈스택으로 업로드
  })

  form.on('end', () => {
    res.json()
  })

  form.parse(req)

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