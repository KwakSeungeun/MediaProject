// action 객체를 처리하는 함수들
import { SET_USER, SET_DIR, SET_INITMODAL_OPEN, SET_IMAGE_URL } from '../actions';
import { combineReducers } from 'redux';
//reducer : provide the state of the application 
//store에서 상태트리와 action을 reducer에게 넘김.
// initial state, action, /////default parameter 설정해준것.
const initialUserState = {
    id : '',
    pw : '',
    name : '',
    token : '',
    os_token : '',
}
const user = (state = null, action) =>{
    switch(action.type){ //action의 type 따라서 state 바꾼다. 단,,,,,,,,original state immutable, cannot change !! 즉, 복사본을 변경하여 반환
        case SET_USER:
            return Object.assign({}, state, action.user); //빈객체 {}에 state와 action.user를 병합해서 반환함.
        default:
            return state; //action type 맞지 않으면 기존 state 반환
    }
}

const userDir = (state=null, action) => {
    switch(action.type){
        case SET_DIR:
            return Object.assign({}, state, action.dir);
        default:
        return state;
    }
}

const initModal = (state = true, action) =>{
    switch(action.type){
        case SET_INITMODAL_OPEN:
            return action.open;
        default:
            return state
    }
}

const imageTempUrl = (state = null, action) =>{
    switch(action.type){
        case SET_IMAGE_URL:
            return action.url;
        default:
            return state
    }
}

const cloudApp = combineReducers({
    user,
    userDir,
    initModal,
    imageTempUrl
});

export default cloudApp;