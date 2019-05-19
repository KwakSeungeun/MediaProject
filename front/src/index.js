import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './pages/Main'
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider  } from 'react-redux';
import cloudApp from './reducers';

//store : state 값 저장, keeping track of state, single, immutable object.... > action을 받아서 > action에서 명시한 방법대로 > reducer가 state를 업데이트하고 return.
const store = createStore(cloudApp);

ReactDOM.render( //Provider : connect()를 이용해서 Root Component 밑의 Component들이 Store에 쉽게 연결되게 해줌. connect의 파라미터로
//mapStateToProps와 mapDispatchProps를 전달하여 하위 props를 지정한다.
    <Provider store={store}> 
        <Main />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
