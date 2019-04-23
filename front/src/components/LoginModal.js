import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SHA512  from 'crypto-js/sha512';
import axios from 'axios';
import config from '../config/config';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class LoginModal extends Component {
  constructor(props){ // component가 새로 만들어 질때 사용 -> props값이 바뀌어도 모름
    super(props);

    this.state = {
      open: true,
      id: '',
      pw: '',
    };
  }

  componentWillReceiveProps(nextProps){ // props가 바뀌기 전에 호출 nextProps : 바뀔 props값
    this.setState({open: nextProps.open});
  }

  onLogin = async() => {
    console.log('ID : ',this.state.id, '\nPW : ',this.state.pw);
    if(this.state.id==='' || this.state.pw===''){
      alert('빈칸을 모두 채워 주세요!');
      return;
    }
    // 로그인 성공시
    await axios.post(`${config.serverUri}/auth/login`, {
      email : this.state.id,
      pw : this.state.pw // crypto 사용한 개선 필요
    }).then(res =>{
      if(res.status===200 && res.data.success){
        // web storage에 token 저장하면 자동로그인 가능
        // redux사용해서 User정보 넣기
        this.setState({ 
          open : false,
          id : '',
          pw: '' 
        });
        alert("로그인 성공!");
      }
    }).catch(err => {
      console.log("ERR:", err.response);
      if(err.response.status===500 && !err.response.data.success){
        alert('아이디 또는 비밀번호가 틀렸습니다.');
        this.setState({ pw: '' });
      }
    })
  };

  onClose = ()=>{
    this.setState({open: false});
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
          disableBackdropClick = {true}
          fullWidth = {true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <div className="dialog-title-contianer">
          <DialogTitle className='dialog-title'>{"Cloud Service 로그인 및 회원가입"}</DialogTitle>
          <IconButton className='dialog-close' aria-label="Close" onClick={this.onClose}>
            <CloseIcon />
          </IconButton>
        </div>
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
          <DialogActions>
            <Button 
                onClick={this.onLogin} 
                variant='outlined'
                color="primary">로그인</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default LoginModal;
