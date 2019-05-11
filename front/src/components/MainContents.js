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
import {FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import config from '../config/config.js'
import axios from 'axios';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class MainConents extends Component {
    constructor(props){
        super(props);
        this.state = {
            openFolderModal: false,
            openFileModal : false,
            uploadFiles : []
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
        await axios.get(`${config.serverUri}/auth/keystone`)
        .then(res=>{
            token = res.data.keystoneToken;
        }).catch(err=>{
            alert("서버 에러");
        });
        this.state.uploadFiles.map(file=>{
            console.log("업로드할 file : ", file.filename);
            axios.put(`/v1/admin/test/${file.filename}`,{ //package.json proxy 설정으로 cors문제 해결
                headers : {
                    "X-Auth-Token" : `${token}`,
                    'Access-Control-Allow-Origin': "*", 
                    'Access-Control-Allow-Methods':"PUT",
                    'Access=Control-Allow-Headers': "x-requested-with"
                }
            }).then(res=>{
                console.log("res : ",res);
            }).catch(err=>{
                console.log("err : ",err);
            });
        })
    }

    handlePondFile= async(error, file)=>{
        if (error) {
            console.log('Oh no');
            return;
        }
        await this.setState({
            uploadFiles : this.state.uploadFiles.concat(file)
        });
    }

    handleRemoveFile = (file)=>{
        
    }

    render() {
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
                    <IconButton className='dialog-close' aria-label="Close" onClick={this.onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <FilePond instantUpload={false} allowMultiple={true}
                    onaddfile={this.handlePondFile}
                    onremovefile={this.handleRemoveFile}
                />
                <Button variant="contained" onClick={this.addFiles} style={{width : "100%"}}>파일추가</Button>
            </Dialog>
            {/* 폴더 추가 모달 */}
            <Dialog
                open={this.state.openFolderModal}
                disableBackdropClick = {true}
                fullWidth = {true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="row-container">
                    <DialogTitle className='dialog-title'>폴더관리</DialogTitle>
                    <IconButton className='dialog-close' aria-label="Close" onClick={this.onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <DialogContent>
                </DialogContent>
                <Button variant="outlined" onClick={this.addDir} style={{margin: "16px"}}>폴더추가</Button>
            </Dialog>
        </div>
    );
    }
}
export default MainConents;