// store에 저장되어 있는 객체 변경
export const SET_USER = 'SET_USER';
export const SET_DIR = 'SET_DIR';

export function setUser(value){
    return{
        type: SET_USER,
        user: value
    }
}

export function setDir(value){
    return {
        type: SET_DIR,
        dir: value
    }
}