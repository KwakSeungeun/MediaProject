import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Dropzone from './DropZone.js'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import config from '../config/config';
import axios from 'axios';
import { connect } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from '@material-ui/core/Button'

class PhotoSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            step : 1, // 1 : 원하는 얼굴 사진 넣기 , 2 : detection된 얼굴 중에서 선택 , 3 : 최종적으로 찾은 사진들
            btnMsg : '다음단계',
            selectedFile : null,
            imagePreviewUrl : '',
            cropedFaces : null,
        };
    }

    onClose = ()=>{
        this.setState({
            step : 1, 
            btnMsg : '다음단계',
            selectedFile : null,
            imagePreviewUrl : ''
        });
        this.props.close();
    }

    nextStep = async()=>{
        switch(this.state.step){
            case 1 : 
                if(this.state.selectedFile == null){
                    alert("검색할 하나의 이미지를 반드시 넣어 주세요!");
                    return;
                }
                let formData = new FormData();
                await formData.append('file', this.state.selectedFile);
                await formData.append('field', this.props.userInfo.id);
                await axios.post(`${config.serverUri}/search/face/detection`, formData)
                .then((res)=>{
                    alert("성공!");
                    console.log(res.data);
                    this.setState({
                        cropedFaces : res.data
                    })
                }).catch(err=>{
                    console.log(err);
                    alert("에러!")
                })
                await this.setState({
                    ...this.state,
                    step : 2,
                    btnMsg : '다음단계'
                });
                break;
            case 2 :
                await this.setState({
                    ...this.state,
                    step : 3,
                    btnMsg : '종료'
                });
                break;  
            case 3 : 
                await this.setState({
                    ...this.state,
                    selectedFile : null,
                    step : 1,
                    btnMsg : '다음단계'
                });
                this.props.close();
                break;
            default : 
                alert("에러!");
                this.setState({ selectedFile : null });
                this.props.close();
                break;
        }
    }

    onFilesAdded = (file)=>{
        console.log(file[0]);
        this.setState({
            selectedFile : file[0],
            imagePreviewUrl : URL.createObjectURL(file[0])
        })
    }

    render(){
        return(
            <div>
                <Dialog
                    open={this.props.open}
                    disableBackdropClick = {true}
                    fullWidth = {true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <div className="row-container">
                        <DialogTitle className='dialog-title'>파일 추가</DialogTitle>
                        <IconButton className='dialog-close' aria-label="Close" onClick={this.onClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Divider style={{marginBottom : "16px"}} />
                    <DialogContent>
                    {
                        this.state.step == 1 ? 
                        <div>
                            {
                                this.state.selectedFile == null ?
                                <div>
                                    <p style = {{margin : "16px", textAlign:"center"}}>
                                     찾고 싶은 사람의 얼굴이 포함된 사진을 넣어주세요!</p>
                                    <Dropzone onFilesAdded={this.onFilesAdded}/>
                                </div>
                                :<div>
                                    <img src={this.state.imagePreviewUrl}
                                    style={{width: "500px", height : "auto"}}
                                    ></img>
                                </div>
                            }
                        </div>
                        : null
                    }
                    {
                        this.state.step == 2 ?
                        <div>두번째 ==> 인식된 얼굴이 맞는 지 확인
                            <img src={this.state.cropedFaces[0].contents}></img>
                        </div>
                        : null
                    }
                    {
                        this.state.step == 3 ?
                        <div>세 번째</div>
                        : null
                    }
                    </DialogContent>
                    <button className ="circle-btn" onClick={this.nextStep} 
                        style = {{ padding : "12px"}}>{this.state.btnMsg}</button>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo : state.user
    }
  }
  
PhotoSearch = connect(mapStateToProps)(PhotoSearch)

export default PhotoSearch;