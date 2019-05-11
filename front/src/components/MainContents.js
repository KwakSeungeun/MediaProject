import React, { Component } from 'react';
import '../index.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class MainConents extends Component {
    constructor(props){
        super(props);
        this.state = {
            openFolderModal: false,
        };
    }

    addFiles = ()=>{

    }

    addDir = ()=>{
        console.log("user : ", this.props.user);
        console.log("dir : ", this.props.dir);
        this.setState({openFolderModal : true});
    }

    onClose= ()=>{
        this.setState({openFolderModal : false});
    }

    render() {
    return (
        <div  style={{background: "white"}}>
        {/* 상단 메뉴 */}
            <div className="row-container" style={{width: "50%"}}>
                <Button variant="contained" onClick={this.addDir} className="flex-1">폴더추가</Button>
                <Button variant="contained" onClick={this.addFiles} 
                    className="flex-1" style={{marginLeft: "16px"}}>파일추가</Button>
            </div>
            <AddFolderModal open={this.state.openFolderModal} close={this.onClose}/>
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
    addFolder= ()=>{

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