import React, { Component } from 'react';
import '../index.css'
import './components.css'
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon  from '@material-ui/icons/Search';
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import logo from '../img/logo2.png';

class TopBar extends Component {
    state = {
        searchText : "",
        isLoggedIn : false,
    }

    goHome = () =>{
        console.log("CLICK LOGO");
    }

    onSearch = ()=>{
        console.log("CLICK SEARCH BUTTON");
    };

    onLogin=()=>{
        console.log("CLICK LOGIN BUTTON");
    };

    onSignup = ()=>{
        console.log("CLICK SIGNUP BUTTON");
    };
    
    render() {
        return (
            <div className="row-container">
                {/* 로고 */}
                <div onClick={this.goHome} className="flex-1">
                    <img src={logo} alt= "home"/>
                </div>

                {/* 검색 */}
                <div className="flex-6 search">
                    <InputBase placeholder="파일을 검색해 보세요" className="flex-6"></InputBase>
                    <IconButton className="flex-1" onClick={this.onSearch} aria-label="Search">
                        <SearchIcon />
                    </IconButton>
                </div>

                {/* 프로필 및 설정 */}
                <div className="flex-2">
                {
                    this.state.isLoggedIn?
                    // true
                    <div></div>
                    // false
                    :<div className="row-container">
                        <Button onClick={this.onLogin()} variant="outlined" className="flex-1"> 
                            <Person />LOGIN
                        </Button>
                        <Button onClick={this.onSignup()} variant="outlined" className="flex-2">
                            <PersonAdd />SIGN UP
                        </Button>
                    </div>
                }
                </div>
            </div>
      );
    }
}

export default TopBar;