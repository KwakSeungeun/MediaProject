import React, { Component } from 'react';
import '../index.css'
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon  from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button'
import logo from '../img/logo2.png';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
        console.log("로그아웃!");
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
                    <IconButton style={{margin: "0px 0px 10px 0px"}} className="flex-1" 
                        onClick={this.onSearch} aria-label="Search">
                        <SearchIcon />
                    </IconButton>
                </div>

                {/* 프로필 및 설정 */}
                <div className="flex-2">
                {
                    this.props.initModalOpen == false ?
                    <button onClick={this.onLogout}>로그아웃</button>
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