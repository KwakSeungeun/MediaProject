import React, { Component } from 'react';
import '../index.css'
import 'filepond/dist/filepond.min.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {FilePond} from 'react-filepond';
import config from '../config/config.js'
import axios from 'axios';

class MainConents extends Component {
    constructor(props){
        super(props);
        this.state = {
            openFolderModal: false,
            uploadFiles : []
        };
    }
    addDir = ()=>{
        console.log("user : ", this.props.user);
        console.log("dir : ", this.props.dir);
        this.setState({openFolderModal : true});
    }

    onClose= ()=>{
        this.setState({openFolderModal : false});
    }

    addFiles= async()=>{
        let token = null;
        await axios.get(`${config.serverUri}/auth/keystone`)
        .then(res=>{
            token = res.data.keystoneToken;
        }).catch(err=>{
            alert("서버 에러");
        });
        console.log("TOKEN : ", token);
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
        axios.defaults.headers.common['X-Auth-Token'] = token;
        this.state.uploadFiles.map(file=>{
            console.log("업로드할 file : ", file.filename);
            axios.put(`${config.cloudUri}/v1/admin/test/${file.filename}`,
            ).then(res=>{
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

    render() {
    return (
        <div  style={{background: "white"}}>
            {/* <div className="row-container" style={{width: "100%"}}>
                <Button variant="contained" onClick={this.addDir} style={{width: "50%"}}>폴더추가</Button>
            </div> */}
            <FilePond instantUpload={false} allowMultiple={true}
                onaddfile={this.handlePondFile}
            />
            <Button variant="contained" onClick={this.addFiles} style={{width : "100%"}}>파일추가</Button>
            {/* <AddFolderModal open={this.state.openFolderModal} close={this.onClose}/> */}
        </div>
    );
    }
}
export default MainConents;


class AddFolderModal extends Component{
    constructor(props){
        super(props);
    }
    onClose= ()=>{
        this.props.close();
    }
    addFolder= async()=>{
    }
    render(){
        return (
            <div>
                <Dialog
                    open={this.props.open}
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
                    <Button variant="outlined" onClick={this.addFolder} style={{margin: "16px"}}>폴더추가</Button>
                </Dialog>
            </div>
        );
    }
}