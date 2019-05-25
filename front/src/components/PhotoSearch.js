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
import * as actions from '../actions';
import ReactLoading from 'react-loading';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import Gallery from 'react-grid-gallery'
import _ from 'lodash';


class PhotoSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            step : 1, // 1 : 원하는 얼굴 사진 넣기 , 2 : detection된 얼굴 중에서 선택 , 3 : 최종적으로 찾은 사진들
            btnMsg : '다음단계',
            selectedFile : null,
            imagePreviewUrl : '',
            cropedFaces : null,
            selectedCropedFaces : null,
            resultImages : [],
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

    onSelectFace = async(res)=>{
        // e.preventDefault();
        await this.setState({
            ...this.state,
            selectedCropedFaces : `${this.props.userInfo.id}_face_${res.value}.jpeg`
        })
        console.log("선택한 이미지 이름 : ", this.state.selectedCropedFaces)
    }

    getList = async(files) => {
        let temp = [];
        _.forEach(files, (val, i)=>{
            let file = {
                thumbnailWidth: 200,
                thumbnailHeight: 200,
                isSelected: false,
                src : ``,
                thumbnail: ``,
                caption: `${val.name}`
            };

            file = {
                ...file,
                src:`${config.swiftUri}/v1/${config.adminProjectId}/${this.props.userInfo.id}/${val.name}?temp_url_sig=${this.state.sig}&temp_url_expires=${this.state.exp}`,
                thumbnail:`${config.swiftUri}/v1/${config.adminProjectId}/${this.props.userInfo.id}/${val.name}?temp_url_sig=${this.state.sig}&temp_url_expires=${this.state.exp}`
            }
            temp.push(file);    
        })
        await this.setState({
            ...this.state,
            resultImages : temp,
        })
    }

    nextStep = async()=>{
        switch(this.state.step){
            case 1 : 
                if(this.state.selectedFile == null){
                    alert("검색할 하나의 이미지를 반드시 넣어 주세요!");
                    return;
                }
                this.setState({
                    isLoading : true
                })
                let formData = new FormData();
                await formData.append('file', this.state.selectedFile);
                await formData.append('field', this.props.userInfo.id);
                await axios.post(`${config.serverUri}/search/face/detection`, formData)
                .then((res)=>{
                    this.setState({
                        ...this.state,
                        cropedFaces : res.data.data,
                        isLoading : false
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
                // 얼굴 비교
                if(this.state.selectedCropedFaces == null){
                    alert('반드시 하나의 이미지를 선택해 주세요')
                    return;
                }
                await this.setState({
                    isLoading : true
                })
                console.log("image temp url", this.props.imageTempUrl.toString());
                await axios.get(`${config.serverUri}/search/face/comparison`, {
                    params : {
                        file_name : this.state.selectedCropedFaces,
                        user_id : this.props.userInfo.id,
                        target_list : this.props.imageTempUrl.toString()
                    }
                }).then(async(res)=>{
                    console.log("얼굴 유사도 비교 : ", res);
                    await this.setState({
                        isLoading : false
                    })
                }).catch(async(err)=>{
                    console.log(err);
                    alert("에러!")
                    await this.setState({
                        isLoading : false
                    })
                })

                // 결과
                await this.setState({
                    ...this.state,
                    step : 3,
                    btnMsg : '종료'
                });
                break;  
            case 3 : 
                // 종료
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
                                    {
                                        this.state.isLoading ? 
                                        <div>
                                            <p style={{color : "#F4983E", fontSize: "20x", marginBottom: "0", textAlign:"center"}}><b>선택한 사진에서 얼굴을 찾고 있습니다<br></br>
                                                잠시만 기다려 주세요 :)</b></p>
                                            <div style={{marginLeft: "calc(50% - 75px)", height: "150px", overflowY : "hidden"}}>
                                                <ReactLoading type={'bubbles'} color={"#F4983E"} height={10} width={100} />
                                            </div>
                                        </div>
                                        : <div>
                                            <img src={this.state.imagePreviewUrl}
                                            style={{width: "500px", height : "auto"}}
                                            ></img>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        : null
                    }
                    {
                        this.state.step == 2 ?
                        <div>
                            <ImagePicker className="flex-1"
                                images={this.state.cropedFaces.map((face, filename) => ({
                                    src: `data:image/jpeg;base64, ${face.contents}`, value: filename
                                }))}
                                onPick={this.onSelectFace}
                            />
                            {
                                this.state.isLoading ? 
                                <div>
                                    <p style={{color : "#F4983E", fontSize: "20x", marginBottom: "0", textAlign:"center"}}><b>내 클라우드에서 해당되는 얼굴을 찾는중입니다<br></br>
                                        잠시만 기다려 주세요:)</b></p>
                                    <div style={{marginLeft: "calc(50% - 75px)", height: "150px", overflowY : "hidden"}}>
                                        <ReactLoading type={'bubbles'} color={"#F4983E"} height={10} width={100} />
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                        : null
                    }
                    {
                        this.state.step == 3 ?
                        <div>
                            {
                                this.state.resultImages.length == 0 ?
                                <div>
                                    일치하는 결과가 없습니다.
                                </div>
                                : <div>
                                    <Gallery images={this.state.resultImages}/>
                                </div>
                            }
                        </div>
                        : null
                    }
                    </DialogContent>
                    <button className ="circle-btn" onClick={this.nextStep} disabled={this.state.isLoading}
                        style = {{ padding : "12px"}}>{this.state.btnMsg}</button>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo : state.user,
        imageTempUrl : state.imageTempUrl
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        setimageUrl : (images)=>dispatch(actions.setimageUrl(images))
    }
}
  
PhotoSearch = connect(mapStateToProps, mapDispatchToProps)(PhotoSearch)

export default PhotoSearch;