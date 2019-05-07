// action 객체를 처리하는 함수들
import { SET_USER } from '../actions';
import { combineReducers } from 'redux';

const loggedUser = (state = null, action) =>{
    switch(action.type){
        case SET_USER:
            return Object.assign({}, state, {
                email : state.email,
                pw : state.pw,
                name : state.name
            });
        default:
            return state;
    }
}

const cloudApp = combineReducers({loggedUser});

export default cloudApp;