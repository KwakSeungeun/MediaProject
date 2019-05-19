import React, { Component } from 'react';
import '../index.css'
import 'filepond/dist/filepond.min.css';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// // import {FilePond, registerPlugin } from 'react-filepond';
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import config from '../config/config.js'
import axios from 'axios';
import _ from 'lodash';
import Upload from './Upload.js'
import {connect} from 'react-redux';


// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class MainContents extends Component {
    constructor(props){
        super(props);
        this.state = {
            openFolderModal: false,
            openFileModal : false,
            uploadFiles : [],
        };
    }
    addDir = ()=>{
        console.log("user : ", this.props.user);
        console.log("dir : ", this.props.dir);
    }

    openAddFolder = ()=>{
        this.setState({openFolderModal : true});
    }

    openAddFiles = ()=>{
        this.setState({openFileModal:true});
    }

    onClose= ()=>{
        this.setState({
            openFolderModal : false,
            openFileModal : false,
            uploadFiles : []
        });
    }

    addFiles= async()=>{
        let token = null;
        await axios.get(`${config.keystonUri}/v3/auth/tokens`, config.admin_info)
        .then(res=>{
            token = res.headers['x-subject-token'];
        }).catch(err=>{
            alert("서버 에러");
        });
        console.log("TOKEN : ", token);
        // swift 정보 받기는 성공, token의 문제
        await axios.get(`${config.swiftUri}/info`)
        .then(res=>{
            console.log("res : ",res);
        }).catch(err=>{
            console.log("err :", err);
        })

        this.state.uploadFiles.map(file=>{
            axios.put(`${config.swiftUri}/v1/admin/test/${file.filename}`,file,{ 
                headers : {
                    'Content-Type': "multipart/form-data",
                    "X-Auth-Token" : `${token}`,
                }
            }).then(res=>{
                console.log("res : ",res);
            }).catch(err=>{
                console.log("err : ",err);
            });
        })
    }

    handleAddFile= async(error, file)=>{
        if (error) {
            alert("ERROR");
            return;
        }
        await this.setState({
            uploadFiles : this.state.uploadFiles.concat(file)
        });
        console.log("현재 파일들 : ", this.state.uploadFiles);
    }

    handleRemoveFile = (error,file)=>{   
        if (error) {
            alert("ERROR");
            return;
        }
        let temp = _.remove(this.state.uploadFiles, (element)=>{
            return element.id !== file.id;
        });
        this.setState({uploadFiles : temp});
    }

    render() {
        console.log("this is maincontents")
        console.log(this.props.userInfo);
    return (
        <div  style={{background: "white"}}>
            <div className="row-container" style={{width: "50%"}}>
                <Button variant="contained" onClick={this.openAddFolder} className="flex-1">폴더추가</Button>
                <Button variant="contained" onClick={this.openAddFiles} 
                    className="flex-1" style={{marginLeft: "16px"}}>파일추가</Button>
            </div>
            {/* 파일 추가 모달 */}
            <Dialog
                open={this.state.openFileModal}
                disableBackdropClick = {false}
                fullWidth = {true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <div className="row-container">
                    <DialogTitle className='dialog-title'>파일관리</DialogTitle>
                    {/* <IconButton className='dialog-close' aria-label="Close" onClick={this.onClose}>
                        <CloseIcon />
                    </IconButton> */}
                </div>
                    <Upload close={this.onClose} userInfo = {this.props.user}/>
                {/* <FilePond instantUpload={false} allowMultiple={true}
                    onaddfile={this.handleAddFile}
                    onremovefile={this.handleRemoveFile}
                /> */}
                {/* <Button variant="contained" onClick={this.addFiles} style={{width : "100%"}}>파일 업로드</Button> */}
            </Dialog>
            {/* 폴더 추가 모달 */}
            <Dialog
                open={this.state.openFolderModal}
                disableBackdropClick = {true}
                fullWidth = {true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="row-container" style={{height : "60px"}}>
                    <DialogTitle className='dialog-title'>폴더관리</DialogTitle>
                    <IconButton className='dialog-close' aria-label="Close" onClick={this.onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="round-box">
                    TODO:: 유저의 디렉토리 구조에 맞게 화면에 보여줌
                </div>
                <Button variant="outlined" onClick={this.addDir} style={{margin: "16px"}}>폴더추가</Button>
            </Dialog>
        </div>
    );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         userInfo : state.user
//     }
// }

// MainContents = connect(mapStateToProps)(MainContents)

export default MainContents;