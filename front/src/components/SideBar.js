import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import PhotoSearch from './PhotoSearch';
import _ from 'lodash';

class SideBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            listItem : { // 각 기능 실행하기 위한 object
                photo_search :  false, 
                my_dir : false, 
                recent_files :  false ,
                favorites : false ,
                trash : false
            }
        };
    }
    
    clickList = async(e,val)=>{
        e.preventDefault();

        let temp = {};
        _.forEach(this.state.listItem, (item, key)=>{
            if(key == val){
                temp[key] = true;
            }else{
                temp[key] = false;
            }
        })
        
        await this.setState({
            ...this.state,
            listItem : temp
        });
    }

    onClose = ()=>{
        this.setState({
            ...this.state,
            listItem : { // 모두 닫기
                photo_search :  false, 
                my_dir : false, 
                recent_files :  false ,
                favorites : false ,
                trash : false
            }
        })
    }

    render() {
        return (
        <div>
            {/* 기능 */}
            <div>
                <List component="nav">
                    <Tooltip title="자동으로 원하는 친구들의 사진을 모아줍니다.">
                        <ListItem  button>
                            <ListItemText onClick={(e)=>this.clickList(e,'photo_search')} primary="사진으로 검색하기" />
                            <PhotoSearch open = {this.state.listItem.photo_search} close = {this.onClose}/>
                        </ListItem>
                    </Tooltip>
                        {/* <ListItem button>
                            <ListItemText primary="폴더 자동화정리" />
                        </ListItem> */}
                        <ListItem button>
                            <ListItemText primary="내 폴더"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="최근 열어본 파일"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="즐겨찾기"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="휴지통"/>
                        </ListItem>
                </List>
            </div>
            {/* 사용자 별 폴더 */}
            <div>

            </div>
        </div>
        );
    }
}

export default SideBar;