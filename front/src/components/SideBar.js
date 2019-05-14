import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import PhotoSearch from './PhotoSearch';


class SideBar extends Component {
    state = {
        open: false,
        listItem : [
            {id : 'photo_search', name : '사진으로 검색하기', selected : false}, 
            'my_dir', 
            'recent_files', 
            'favorites', 
            'trash'
        ]
    };
    
    clickList = (click_val)=>{
        let index = this.state.listItem.findIndex((element)=>{
            return element.id == click_val;
        });
        switch(click_val){}
    }

    render() {
        let search = <PhotoSearch/>
        return (
        <div>
            {/* 기능 */}
            <div>
                <List component="nav">
                    <Tooltip title="자동으로 원하는 친구들의 사진을 모아줍니다.">
                        <ListItem  button>
                            <ListItemText onClick={this.clickList('photo_search')} primary="사진으로 검색하기" />
                            
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