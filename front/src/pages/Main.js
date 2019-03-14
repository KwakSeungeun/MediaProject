import React, { Component } from 'react';
import LoginModal from '../components/LoginModal'
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

class Main extends Component {
  render() {
    return (
      <div>
        <LoginModal/>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">
              Cloud Service              
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          {/* 사이드바 */}
          <div></div>
          {/* 메인 */}
          <div></div>
        </div>
      </div>
    );
  }
}

export default Main;
