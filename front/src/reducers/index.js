// action 객체를 처리하는 함수들
import { SET_USER, SET_DIR } from '../actions';
import { combineReducers } from 'redux';

const user = (state = null, action) =>{
    switch(action.type){
        case SET_USER:
            return Object.assign({}, state, action.user);
        default:
            return state;
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

const cloudApp = combineReducers({
    user,
    userDir
});

export default cloudApp;