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
import { connect } from 'react-redux';

class MainContents extends Component {
    constructor(props){
        super(props);
        this.state = {
            openFolderModal: false,
            openFileModal : false,
            uploadFiles : []
        };
    }
    addDir = ()=>{
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
        let user_token = this.props.userInfo.token;
        let toggle = this.props.toggleValue.toggle;
        console.log(user_token)
        console.log(toggle)
    
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
                    this.props.userInfo != null ?
                    <div style={{width : "80%", margin : "32px"}}><Thumb /></div>
                    : null
                }
            </div>
        </Fragment>
    )}
}

const mapStateToProps = (state) => {
    return {
        userInfo : state.user
    }
  }
  
MainContents = connect(mapStateToProps)(MainContents)

export default MainContents;