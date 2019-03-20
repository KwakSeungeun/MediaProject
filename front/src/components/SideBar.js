import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';


class SideBar extends Component {
    state = {
        open: false,
    };
    
    render() {
        return (
        <div>
            {/* 기능 */}
            <div>
                <List component="nav">
                    <Tooltip title="자동으로 원하는 친구들의 사진을 모아줍니다.">
                        <ListItem  button>
                            <ListItemText primary="사진으로 검색하기" />
                        </ListItem>
                    </Tooltip>
                        <ListItem button>
                            <ListItemText primary="폴더 자동화정리" />
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