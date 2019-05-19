var fs = require('fs-extra');

const IncomingForm = require('formidable').IncomingForm

exports.getList = (req, res)=>{
  res.send('get files!');
};

exports.upload = (req, res) =>{
  console.log(req.body);
  res.send();
  // let formData = req.data.formData
  // console.log(formData)
  // let userInfo = req.data.userInfo
  // console.log(userInfo)
  // form.parse(req, (err, fields, files) => {
  //   console.log(req)
  //   let oldpath = files.uploadFile.path;
  //   let newpath = '../../uploads' + files.filetoupload.name;
  //   fs.rename(oldpath, newpath, (err)=>{
  //     if(err) throw erro;
  //     res.write('file uploaded and moved!')
  //     res.end();
  //   })
  // })
  // form.on('file', (field, file) => {
  //   let oldpath = file.filetoupload.path;
  //   let newpath = '../../uploads/' + FileList.filetoupload.name;
  //   fs.rename(oladpath, newpath, (err)=>{
  //     if(err) throw err;
  //     res.write('file uploaded and moved!');
  //     res.end();
  //   })

    // form.parse(req, function(err, fields, files) {
    //    res.writeHead(200, {'content-type': 'multipart/form-data'});
    //    res.write('received upload:\n\n');
    //    res.end()}); 
    //   //  res.end(util.inspect({fields: fields, files: files})); 
    //   //   }); 
    // console.log('parseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        
    // //전송받은 파일 처리
    // form.on('file', function(fields, files) {
    //   //  console.log(this.openedFiles); 
    //    console.log(" 총 업로드 파일 갯수 == ", this.openedFiles.length); 
    //    for(var i = 0; i < this.openedFiles.length; i++) { 
    //      /* Temporary location of our uploaded file */ // 맥에서는 temp_path 가 폴더가 아니라, 업로드한 파일임. 
    //      var temp_path = this.openedFiles[i].path; /* The file name of the uploaded file */ 
    //      var file_name = this.openedFiles[i].name; /* Location where we want to copy the uploaded file */ 
    //      var new_location = 'C:Users/17063/MediaProject/server/uploads/'
    //      console.log("temp_path == ", temp_path); 
    //      console.log("file_name == ", file_name); 
    //      console.log(this.openedFiles[i]); // temp_path 로 받은 파일을, 원래 이름으로 변경하여 이동시킨다. 
         
    //      fs.move(temp_path, new_location + file_name, function (err) {
    //         if (err) { console.error(err); } 
    //         else { console.log("success!") } 
    //       }); 
        
    //     } 
      
    //   }); 

    //   res.json({result : 'upload files!'});

      return;

    // req.open("PUT", "http://http://15.164.100.240:8080/")
    // // 파일처리 / 오픈스택으로 업로드
    // console.log('formData777777777777777777')
    // console.log(req.data.fData)
    // console.log('userInfo77777777777777777777777777777777')
    // console.log(req.data.uData)
    console.log('just req777777777777777777777')
    console.log(res)
    console.log('7777777777777777777777777777777')
  // })

  // form.on('end', () => {
  //   res.json()
  // })

  // form.parse(req)

  // console.log("REQ : ",req);
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