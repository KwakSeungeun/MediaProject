// store에 저장되어 있는 객체 변경
//how does a reducer know when to produce the next state?
//redux 원칙 : only way to change the state is by sending a signal to the store.This signal is an action. 
//“Dispatching an action” is the process of sending out a signal.

export const SET_USER = 'SET_USER'; //The reducer will use that string to determine how to calculate the next state.
export const SET_DIR = 'SET_DIR'; // 상수로 설정해줌으로써 중복, 오타 문제 등 어려운 디버깅 문제 피할 수 있다.

export function setUser(value){
    return{
        type: SET_USER, // type : describing how the state should be changed.
        user: value
    }
}

export function setDir(value){
    return {
        type: SET_DIR,
        dir: value
    }
}