import React, {Component} from 'react'
import Gallery from 'react-grid-gallery'
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';
import axios from 'axios';
import cloud from '../config/config';

var crypto = require('crypto')

class Thumb extends Component {
    constructor(props){
        super(props)
        this.state = {
            IMAGES : [],
            files: [],
            sig: '',
            exp: '',
            isError : false,
        }

        // this.makeTempUrl = this.makeTempUrl.bind(this);
        // this.getList = this.getList.bind(this);
    }

    componentWillMount(){
        this.makeTempUrl();
        this.getList();
    }

    makeTempUrl = async() => {
        let method = "GET"
        let duration_in_seconds = 60;
        await this.setState({
            ...this.state,
            exp: parseInt(Date.now()/1000 + duration_in_seconds)
        })
        let path = `/v1/${cloud.adminProjectId}/a`
        let key = `key`
        let hmac_body = `${method}\n${this.state.exp}\n${path}`
        await this.setState({
            ...this.state,
            sig: crypto.createHmac('sha1', key).update(hmac_body).digest('hex')
        })
    }

    getList = () => {
        if(this.props.userInfo == null){
            console.log("USER NULL!")
            return;
        }
        axios.get(`${cloud.serverUri}/files/list`,{
                params : {
                    token : this.props.userInfo.os_token,
                    user_id : this.props.userInfo.id
                }
            }).then(async(res)=>{
            await this.setState({
                ...this.state,
                files : res.data.data
            })
            let temp = [];
            let imagesTempUrl = [];
            _.forEach(this.state.files, (val, i)=>{
                let file = {
                    thumbnailWidth: 200,
                    thumbnailHeight: 200,
                    isSelected: false,
                    src : ``,
                    thumbnail: ``,
                    caption: `${val.name}`
                };
                switch(val.name.split('.').pop()){
                    case ('jpg'||'jpeg'||'png'):
                        file = {
                            ...file,
                           src:`${cloud.swiftUri}/v1/${cloud.adminProjectId}/${this.props.userInfo.id}/${val.name}?temp_url_sig=${this.state.sig}&temp_url_expires=${this.state.exp}`,
                           thumbnail:`${cloud.swiftUri}/v1/${cloud.adminProjectId}/${this.props.userInfo.id}/${val.name}?temp_url_sig=${this.state.sig}&temp_url_expires=${this.state.exp}`
                        }
                        imagesTempUrl.push(`${val.name}_${this.state.sig}_${this.state.exp}`);
                        break;
                    case ('hwp'||'word'):
                        file ={
                            ...file,
                            src: `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_doc.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`,
                            thumbnail: `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_doc.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`
                        }
                        break;
                    case ('excel'):
                            file ={
                                ...file,
                                src: `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_excel.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`,
                                thumbnail: `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_excel.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`
                            }
                            break;
                    case ('ppt'||'pptx'):
                        file = {
                            ...file,
                            src: `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_ppt.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`,
                            thumbnail: `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_ppt.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`
                        }
                        break;
                    case ('mp3'||'wma'):
                        file = {
                            ...file,
                            src: `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_music.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`,
                            thumbnail: `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_music.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`
                        }
                        break;
                    case ('avi'||'mp4'||'wmp'||'mpeg'):
                        file = {
                            ...file,
                            src:  `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_video.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`,
                            thumbnail:  `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_video.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`
                        }
                        break;
                    case ('zip'||'tar'||'rar'):
                        file = {
                            ...file,
                            src:  `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_zip.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`,
                            thumbnail:  `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_zip.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`
                        }
                        break;
                    case ('pdf'):
                        file = {
                            ...file,
                            src:  `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/i_pdf.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`,
                            thumbnail:  `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/i_pdf.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`
                        }
                        break;
                    default ://그 외
                        file = {
                            ...file,
                            src: `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_etc.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`,
                            thumbnail: `${cloud.swiftUri}/v1/${cloud.adminProjectId}/admin/image_etc.png?temp_url_sig=${cloud.adminSig}&temp_url_expires=${cloud.adminExp}`
                        }
                        break;
                }
                temp.push(file);    
            })
            await this.setState({
                ...this.state,
                IMAGES : temp,
                isError : false
            })
            await this.props.setimageUrl(imagesTempUrl);
        })
        .catch(err=>{
                console.log(err)
                this.setState({
                    ...this.state,
                    isError : true
                })
        });
    }

    render(){
        return (    
            <div style={{marginTop : "32px"}}>
                {
                    this.state.isError ? 
                    <div style={
                        {marginTop:"30%", padding:"8px", border:"1px solid grey", borderRadius:"10px", textAlign: "center"}}>
                        <p><b>클라우드에 데이터를 저장해 보세요! :)</b></p>
                    </div>
                    : <Gallery images={this.state.IMAGES}/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo : state.user
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        setimageUrl : (images)=>dispatch(actions.setimageUrl(images))
    }
}

  
Thumb = connect(mapStateToProps, mapDispatchToProps)(Thumb)

export default Thumb;