import React, { Component } from 'react';
import '../index.css'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import InitModal from '../components/InitModal';
import MainContents from '../components/MainContents';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <div className="top-container"><TopBar></TopBar></div>
        <div className="main-container">
          <div className="side-container"><SideBar></SideBar></div>
          <div className="contents-container">
            <MainContents user={this.props.user} dir={this.props.dir}/>
          </div>
        </div>
        {
          this.props.initModalOpen == true ?
          <InitModal/>
          :null 
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user, //현재 component의 props에 저장
      dir: state.userDir,
      initModalOpen : state.initModal
  };
}

const mapDispatchProps = (dispatch) => {
  return {
    setInitModalOpen : (open) => { dispatch(actions.setInitModalOpen(open)) }
  }
}

Main = connect(mapStateToProps,mapDispatchProps)(Main);

export default Main;
