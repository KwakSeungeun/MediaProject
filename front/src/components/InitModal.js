import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
// import SHA512  from 'crypt o-js/sha512';
import axios from 'axios';
import config from '../config/config';
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';

class InitModal extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedLogin : true, 
      open: true
    };
  }

  onLogin = ()=>{
    this.setState({selectedLogin : true});
  }

  onSignup = ()=>{
    this.setState({selectedLogin : false});
  }

  render() {
    return (
      <div className = "root-container">
        <Dialog
              open={this.state.open}
              disableBackdropClick = {true}
              fullWidth = {true}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              {/* 상단 선택 */}
              <div className="row-container"  style={{marginTop: "16px"}}>
                  <Button onClick={this.onLogin} variant="outlined" className="flex-1"> 
                      <Person />LOGIN
                  </Button>
                  <Button onClick={this.onSignup} variant="outlined" className="flex-1" style={{marginLeft: "8px"}}>
                      <PersonAdd />SIGN UP
                  </Button>
              </div>
              <DialogContent>
                  {/* 로그인 또는 회원가입 */}
                  {
                    this.state.selectedLogin?
                    (<LoginBox/>):(<SignUpBox/>)
                  }
              </DialogContent>
        </Dialog>
      </div>
    );
  }
}

class LoginBox extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: 'aaaaaaaas',
      pw: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
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

    render() {
      return(
        <div className = "inner-container">
            <form>
                <TextField
                    fullWidth={true}
                    label="아이디"
                    type="email"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('id')}/>
                <TextField
                    fullWidth={true}
                    label="비밀번호"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('pw')}/>       
            </form>     
            <Button className = "align-right" onClick={this.onLogin}>Login</Button>
        </div>
      )
    }  
  }

class SignUpBox extends Component {
  constructor(props){
    super(props);
    this.state={
      user : {
        name: '',
        email: '',
        pw: ''
      },
      checkpw: '',
      isErr : true,
      errMsg : '일치하지 않습니다.'
    };
  }
  
  handleChange = name => async(event) => {
    if (name === 'checkpw'){
      await this.setState({[name]: event.target.value})
    } else {
      await this.setState({
        user:{
          ...this.state.user,
          [name]: event.target.value
        }
      });
    }
    console.log("user: ", this.state)
    if(this.state.checkpw !== this.state.user.pw){
      this.setState({isErr : true});
    } else {
      console.log("check : ", this.state.checkpw);
      this.setState({isErr : false});
    }
  }

  onSubmit = async() => {
    if(this.state.user.email==='' || this.state.user.name==='' ||this.state.user.pw===''||this.state.checkpw===''){
      alert('빈칸을 모두 채워 주세요!');
      return;
    }
    if(this.state.isErr){
      alert('비밀번호를 한번 더 확인해주세요');
    }
  }

  render() {
    return(
      <div className = "inner-container">
            <form>
                <TextField
                  fullWidth={true}
                  label="이름"
                  type="text"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange('name')}/>   
                <TextField
                    fullWidth={true}
                    label="아이디"
                    type="email"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('email')}/>
                <TextField
                  fullWidth={true}
                  label="비밀번호"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange('pw')}/>     
                <TextField
                    fullWidth={true}
                    label="비밀번호확인"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('checkpw')}/>
                {
                  this.state.isErr ? <p>{this.state.errMsg}</p> : <p>일치합니다.</p>
                }
            </form>     
            <Button className = "align-right" onClick={this.onLogin}>Login</Button>
        </div>
    );
  }
}
export default InitModal;