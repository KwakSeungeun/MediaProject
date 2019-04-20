import React, { Component } from 'react';
import '../index.css'
import { sizing, spacing } from '@material-ui/system';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import logo from '../img/logo2.png';
import { unstable_Box as Box } from '@material-ui/core/Box';

class TopBar extends Component {
    state = {
        searchText : "",
    }

    goHome = () =>{
        console.log("CLICK LOGO");
    }
    
    render() {
        return (
            <div>
                <Toolbar className="row-container">
                    {/* 로고 */}
                    <div onClick={this.goHome} className="flex-1">
                        <img src={logo} alt= "home"/>
                    </div>
                    {/* 검색 */}
                    <div className="flex-6">
                    <Box mx="auto"  width="75%">
                        <Paper >
                            <input placeholder="검색어를 입력하세요"></input>
                        </Paper>
                    </Box>
                    </div>
                    {/* 프로필 및 설정 */}
                    <div className="flex-1">

                    </div>
                </Toolbar>
            </div>
      );
    }
}

export default TopBar;