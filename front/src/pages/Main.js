import React, { Component } from 'react';
import './Main.css'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import InitModal from '../components/InitModal';

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

export default Main;
