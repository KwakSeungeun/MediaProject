import React, { Component } from 'react';
import '../index.css'
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon  from '@material-ui/icons/Search';
import logo from '../img/logo2.png';

class TopBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            searchText : "",
            isLoggedIn : false,
            loginModal : false,
            signupModal : false
        };
    }
    

    goHome = () =>{
        console.log("CLICK LOGO");
    }

    onSearch = ()=>{
        console.log("CLICK SEARCH BUTTON");
    };

    onLogin=()=>{
        console.log("CLICK LOGIN BUTTON");
        this.setState({loginModal : true});
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
                    <InputBase placeholder="파일을 검색해 보세요" className="flex-7"></InputBase>
                    <IconButton style={{margin: "0px 0px 10px 0px"}} className="flex-1" 
                        onClick={this.onSearch} aria-label="Search">
                        <SearchIcon />
                    </IconButton>
                </div>

                {/* 프로필 및 설정 */}
                <div className="flex-2">
                </div>
            </div>
      );
    }
}

export default TopBar;