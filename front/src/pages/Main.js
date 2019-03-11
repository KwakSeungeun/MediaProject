import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class Main extends Component {
  state = {
    open: true,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (text) => {
    console.log("TEST : ",text);
  };
  
  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          disableBackdropClick = {true}
          fullWidth = {true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Cloud Service"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              로그인 및 회원가입
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Main;
