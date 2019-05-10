import React, { Component } from 'react';
import '../index.css'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import InitModal from '../components/InitModal';
import { connect } from 'react-redux';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <div className="top-container"><TopBar></TopBar></div>
        <div className="main-container">
          <div className="side-container"><SideBar></SideBar></div>
          <div className="contents-container">Contents-container</div>
        </div>
        <InitModal/>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  console.log("logged user! : ", state.loggedUser);
  return {
      value: state.loggedUser
  };
}

Main = connect(mapStateToProps)(Main);

export default Main;
