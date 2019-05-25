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
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import * as actions from '../actions';

class InitModal extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedLogin : true, 
    };
  }
  componentWillMount(){
    // localStorage.clear();
    let user = JSON.parse(localStorage.getItem('user'));
    if(user != null){
      this.props.setUser(user);
      this.props.setInitModalOpen(false);
    }
  }
  changeSelected = (data)=>{
    this.setState({selectedLogin : data});
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
              open={this.props.initModalOpen}
              disableBackdropClick = {true}
              fullWidth = {true}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              {/* 상단 선택 */}
              <div className="row-container"  style={{marginTop: "16px"}}>
                  <Button onClick={this.onLogin} variant={this.state.selectedLogin? "contained": "outlined"} className="flex-1"> 
                      <Person />LOGIN
                  </Button>
                  <Button onClick={this.onSignup} variant={!this.state.selectedLogin? "contained": "outlined"} className="flex-1" style={{marginLeft: "8px"}}>
                      <PersonAdd />SIGN UP
                  </Button>
              </div>
              <Divider style={{marginTop : "16px"}} />
              <DialogContent>
                  {
                    this.state.selectedLogin?
                    (<LoginBox/>)
                    :(<SignUpBox selectedLogin={this.changeSelected}/>)
                  }
              </DialogContent>
        </Dialog>
      </div>
    );
  }
}

//@login
class LoginBox extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: '',
      pw: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onLogin = async () => {
    if(this.state.id==='' || this.state.pw===''){
      alert('빈칸을 모두 채워 주세요!');
      return;
    }
    // 로그인 성공시
      await axios.post(`${config.serverUri}/auth/login`, {
      email : this.state.id,
      pw : this.state.pw // crypto 사용한 개선 필요
    }).then((res) =>{
      if(res.status===200 && res.data.success){
            // web storage에 token 저장하면 자동로그인 가능
            let user = {
              id : this.state.id,
              pw : this.state.pw,
              name : res.data.user_name,
              token : res.data.token,
              os_token : res.data.os_token
            }
            this.setState({ 
              id : '',
              pw: '' 
            });
            this.props.setUser(user);
            this.props.setInitModalOpen(false);
            localStorage.setItem('user', JSON.stringify(user));
      }}).catch(err => {
      if(err.response && err.response.status===500 && !err.response.data.success){
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
            <Button className = "align-right" onClick={this.onLogin} variant="outlined">로그인</Button>
        </div>
      )
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

// connect() : store와 연결해주는 함수
LoginBox = connect(mapStateToProps, mapDispatchProps)(LoginBox); 

//회원가입
class SignUpBox extends Component {
  constructor(props){
    super(props);
    this.state={
      user : {
        name: '',
        email: '', //id
        pw: ''
      },
      checkpw: '',
      isErr : true,
      isValidEmail : false, // 중복확인 결과
      checkEmail : false //중복확인 했는지 여부
    };
  }
  
  //모달에서의 입력 처리
  //item은 항목을 의미
  handleChange = item => async(event) => {
    if (item === 'email'){
      if ([item] !== event.target.value)
        this.setState({isValidEmail : false, checkEmail : false})
    }
    if (item === 'checkpw'){
      await this.setState({[item]: event.target.value})
    } else {
      await this.setState({
        user:{
          ...this.state.user,
          [item]: event.target.value
        }
      });
    }
    //비밀번호 확인
    if(this.state.checkpw !== this.state.user.pw){
      this.setState({isErr : true});
    } else {
      this.setState({isErr : false});
    }
  }

  onCheckEmail = async()=>{
    if(this.state.user.email === '') 
      {
        alert('아이디를 입력하세요') 
        return;
      }
    this.setState({checkEmail : true});
    await axios.post(`${config.serverUri}/auth/check/vaildemail`, {
      email : this.state.user.email
    }).then(async(res) => {
      if(res.data.count === 0) await this.setState({isValidEmail : true});
    }).catch(err => {
      console.log("server err : ", err.response);
    })
  }

  onSubmit = async(e) => {
    if(this.state.user.email==='' || this.state.user.name==='' ||this.state.user.pw===''||this.state.checkpw===''){
      alert('빈칸을 모두 채워 주세요');
      return;
    }
    if(!this.state.isValidEmail){
      alert('중복 확인을 해주세요');
      return;
    }
    if(this.state.isErr){
      alert('비밀번호를 한번 더 확인해주세요');
      return;
    }
    e.preventDefault();
    //서버를 통해서 sequelize로 디비에 추가 & openstack 계정 생성
    axios.post(`${config.serverUri}/auth/register`,this.state.user)
    .then(async(res) => {
      await this.setState({
        user : {
          name: '',
          email: '',
          pw: ''
        },
        checkpw: '',
        isErr : true,
      });
      alert("회원가입 성공! 로그인 해주세요!");
      // 부모가 props로 함수를 보내준 다음 자식은 이 함수를 사용해서 부모의 데이터 update
      // 자식컴포넌트가 부모컴포넌트로 직접적으로 변경이 불가능하기 떄문에 함수 사용
      await this.props.selectedLogin(true); 
    }).catch(err => {
      alert("서버문제");
    });
  }

  render() {
    return(
      <div className = "inner-container">
            <form>
              <div className="row-container" style={{margin: "0px", width: "100%"}}>
                  <TextField
                      fullWidth={true}
                      label="아이디"
                      type="email"
                      margin="normal"
                      variant="outlined"
                      className="flex-6"
                      required={true}
                      onChange={this.handleChange('email')}/>
                  <Button className="flex-1" variant="contained" onClick={this.onCheckEmail}
                  style={{margin : "0 0 0 16px", height: "100%"}}>중복확인</Button>
                </div> 
                {
                  this.state.checkEmail?
                    this.state.isValidEmail?
                    <p style={{color : "blue", fontSize: "14px"}}>사용 가능한 아이디</p> 
                    : <p style={{color : "red", fontSize: "14px"}}>이미 존재하는 아이디</p>
                  :<div/>
                }
                <TextField
                  fullWidth={true}
                  label="이름"
                  type="text"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange('name')}/>  
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
                { this.state.checkpw !== ''?
                    this.state.isErr ? 
                    <p style={{color : "red", fontSize: "14px"}}>일치하지 않습니다.</p> 
                    : <p style={{color : "blue", fontSize: "14px"}}>일치합니다.</p>
                  :<div/>
                }
            </form>     
            <Button className ="align-right" onClick={this.onSubmit} variant="contained">회원가입</Button>
        </div>
    );
  }
}

InitModal = connect(mapStateToProps, mapDispatchProps)(InitModal); 

export default InitModal;
