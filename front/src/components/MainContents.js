import React, { Component, Fragment } from 'react';
import '../index.css'
import 'filepond/dist/filepond.min.css';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Upload from './Upload.js'
import Thumb from './Thumb.js'
import {render} from 'react-dom'
import Gallery from 'react-grid-gallery'

const IMAGES = [{
    src : "http://15.164.100.240:8080/v1/AUTH_c0b8a4b703d94f0db5e9446472dd8432/q/MON.jpg?temp_url_sig=1a5dd0836dd9b594e6002c241d9b120d6027a30a&temp_url_expires=1558440664",
    thumbnail: "http://15.164.100.240:8080/v1/AUTH_c0b8a4b703d94f0db5e9446472dd8432/q/MON.jpg?temp_url_sig=1a5dd0836dd9b594e6002c241d9b120d6027a30a&temp_url_expires=1558440664",
    thumbnailWidth: 200,
    thumbnailHeight: 200,
    isSelected: false,
    caption: "Claude Monet"
}]

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

    render() {
    return (
        <Fragment>
            <div>
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
                        <DialogTitle className='dialog-title'>파일 추가</DialogTitle>
                        <IconButton className='dialog-close' aria-label="Close" onClick={this.onClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Upload close={this.onClose} userInfo = {this.props.user}/>
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
            <div>
                {
                    this.props.user.token!=='' ?
                    <div><Thumb /></div>
                    : null
                }
            </div>
        </Fragment>
    )}
}

export default MainContents;