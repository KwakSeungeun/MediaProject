import React, { Component } from 'react';
import '../index.css'
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon  from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button'
import logo from '../img/logo2.png';
import profile from '../img/profile.jpg';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { stat } from 'fs';

class TopBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            searchText : "",
        };
    }

    goHome = () =>{
        console.log("CLICK LOGO");
    }

    onSearch = ()=>{
        console.log("CLICK SEARCH BUTTON");
    };

    onLogout = ()=>{
        localStorage.clear();
        this.props.setUser(null);
        this.props.setInitModalOpen(true);
    }
    
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
                    <IconButton style={{margin: "0px 0px 3px 0px"}} className="flex-1" 
                        onClick={this.onSearch} aria-label="Search">
                        <SearchIcon />
                    </IconButton>
                </div>

                {/* 프로필 및 설정 */}
                <div className="flex-3">
                {
                    this.props.initModalOpen == false ?
                    <div className="row-container"> 
                        <img style={{width : "55px", height: "auto"}} className="circleBorder" src={profile}></img>
                        <p style={{fontSize : "16px", marginRight:"16px", marginLeft: "16px"}}><b style={{color : "#F4983E"}}>{this.props.userInfo.name}</b>
                            &nbsp;님 <br></br> 반갑습니다 :)</p>
                        <button onClick={this.onLogout}>로그아웃</button>
                    </div>
                    :null 
                }
                </div>
            </div>
      );
    }
}
const mapDispatchProps = (dispatch) => {
    return {
      setUser : (userInfo) => { dispatch(actions.setUser(userInfo))},
      setInitModalOpen : (open) => { dispatch(actions.setInitModalOpen(open)) }
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo : state.user,
        initModalOpen : state.initModal
    }
}

TopBar = connect(mapStateToProps, mapDispatchProps)(TopBar)

export default TopBar;