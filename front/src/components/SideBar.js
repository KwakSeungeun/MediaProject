import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import PhotoSearch from './PhotoSearch';


class SideBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            listItem : [
                {id : 'photo_search', name : '사진으로 검색하기', selected : false}, 
                {id : 'my_dir', name : '내 폴더', selected: false}, 
                {id : 'recent_files', name : '최근 열어본 파일', selected: false },
                {id : 'favorites', name : '즐겨찾기', selected: false },
                {id : 'trash', name: '휴지통', selected:false}
            ]
        };
    }
    
    clickList = (e,click_val)=>{
        e.preventDefault();
        console.log(click_val);
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
                            <PhotoSearch open = {false}/>
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