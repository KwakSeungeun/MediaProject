// store에 저장되어 있는 객체 변경
export const SET_USER = 'SET_USER';

export function setUser(value){
    console.log("ACTION : ",value);
    return{
        type: SET_USER,
        user: value
    }
}