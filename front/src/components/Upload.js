import React, {Component} from 'react';
import '../index.css';
import Button from '@material-ui/core/Button';
import Dropzone from './DropZone.js'
import Progress from './Progress.js'
import axios from 'axios';
import config from '../config/config.js';
import { connect } from 'react-redux';
import _ from 'lodash';
import MainContents from './MainContents';
import { setToggle, resetToggle } from '../actions';

// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      percentage : 10,
    };
  

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  uploadFiles = async() => {
    if(this.state.files.length === 0){
      alert("하나 이상의 파일을 선택해 주세요.");
      return;
    }

    let formData = new FormData();
    formData.append('user_info', JSON.stringify(this.props.userInfo));
    
    await _.forEach(this.state.files, async(file)=>{
      await formData.append('file', file);
    });

    axios.post(`${config.serverUri}/files/upload`, formData)
      .then((res)=>{
        console.log(res);
        alert("업로드 완료!");
        this.props.setToggle();
        this.props.resetToggle();
        this.props.close();
      })
      .catch(err=>{
        console.log(err);
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
            this.state.files.length !== 0 ?
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
          {/* <CircularProgressbar value={this.state.percentage} text={`${this.state.percentage}%`} /> */}
          <Button variant="outlined" onClick={this.uploadFiles} 
            style={{marginTop: "16px", width: "100%"}}>완료</Button>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setToggle: () => dispatch(setToggle()),
      resetToggle: () => dispatch(resetToggle())
  }
}

const mapStateToProps = (state) => {
  return {
      userInfo : state.user,
  }
}

Upload = connect(mapStateToProps, mapDispatchToProps)(Upload)

export default Upload