import React, {Component} from 'react'
import '../index.css'
import Button from '@material-ui/core/Button';
import Lightbox from 'react-images';
import Dropzone from './DropZone.js'
import Progress from './Progress.js'
import axios from 'axios';
import config from '../config/config.js'
import { connect } from 'react-redux'

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
    };
  

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  uploadFiles = async() => {
    if(this.state.files.length == 0){
      alert("하나 이상의 파일을 선택해 주세요.");
      return;
    }
    // this.setState({ uploadProgress: {}, uploading: true });
    // const promises = [];
    // this.state.files.forEach(file => {
    //   promises.push(this.sendRequest(file));
    // });
    // try {
    //   await Promise.all(promises);

    //   this.setState({ successfullUploaded: true, uploading: false });
    // } catch (e) {
    //   // Not Production ready! Do some error handling here instead...
    //   this.setState({ successfullUploaded: true, uploading: false });
    // }
  }

  sendRequest(file) {
    return new Promise(async(resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user_info', JSON.stringify(this.props.userInfo));
      let files = {
        data : formData,
        file_name : file.name,
        user_info : this.props.userInfo
      };

      axios.post(`${config.serverUri}/files/upload`, formData)
      .then((res)=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err);
      })
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="Upload">
          <Dropzone
            onFilesAdded={this.onFilesAdded}
            disabled={this.state.uploading || this.state.successfullUploaded}
          />
          {
            this.state.files.length != 0 ?
              <div className="Files">
                {this.state.files.map(file => {
                  return (
                    <div key={file.name} className="Row">
                      <span className="Filename">{file.name}</span>
                      {this.renderProgress(file)}
                    </div>
                  );
                })}
              </div>
            : null
          }
          <Button variant="outlined" onClick={this.uploadFiles} 
            style={{marginTop: "16px", width: "100%"}}>완료</Button>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      userInfo : state.user
  }
}

Upload = connect(mapStateToProps)(Upload)

export default Upload