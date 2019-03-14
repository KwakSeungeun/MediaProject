import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SHA512  from 'crypto-js/sha512';

class LoginModal extends Component {
  state = {
    open: true,
    id: '',
    pw: '',
  };

  onLogin = () => {
    console.log('ID : ',this.state.id, '\nPW : ',this.state.pw);
    // 로그인 성공시
    if(true){
        this.setState({ open: false });
    }
  };

  onSignup = () => {
      //TODO : OPEN NEW SIGN UP MODAL
      console.log('ID : ',this.state.id, '\nPW : ',SHA512(this.state.pw));
}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
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
          <DialogTitle>{"Cloud Service 로그인 및 회원가입"}</DialogTitle>
          <DialogContent>
              <form>
                <TextField
                    fullWidth={true}
                    label="아이디"
                    type="email"
                    margin="normal"
                    variant="outlined"
                    value={this.state.id}
                    onChange={this.handleChange('id')}/>
                <TextField
                    fullWidth={true}
                    label="비밀번호"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={this.state.pw}
                    onChange={this.handleChange('pw')}/>   
              </form>          
          </DialogContent>
          <DialogActions className="two-container">
            <Button 
                className="two-contents" 
                onClick={this.onLogin} 
                variant='outlined'
                color="primary">로그인</Button>
            <Button 
                className="two-contents" 
                onClick={this.onSignup} 
                variant='outlined'
                color="primary">회원가입</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default LoginModal;
