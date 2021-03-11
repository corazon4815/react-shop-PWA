import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux'; 

//redux쓰기 
//1. redux설치 후 index파일에 provider import
//2. provider로 app 감싸기 //이러면 다같이 props없이도 state를 공유함 
//3. createStore안에 state저장
//4. provider에 props전송
//5. cart.js가서 state사용하기 ->export default 셋팅
//6. 쓰는곳에서 props로 받기 

let alert초기값 = true;

function reducer2(state = alert초기값, 액션 ){
  if (액션.type === '닫기'){
    state = false;
    return state;
  }else{
    return state;
  }
}


let 초기값 = [
  { id : '5', name : 'Baby shoes', quan : 1},
  { id : '6', name : 'Red Herring', quan : 1}
];


//reducer는 항상 state를 뱉음
function reducer(state = 초기값, 액션){   //default parameter문법. 관습적으로 기본적으로 초기값을 넣어줌 
  if(액션.type === '항목추가') {
    let copy = [...state];
    let found = copy.findIndex((a)=>{ return a.id === 액션.payload.id});
                        //배열을 돌려서 return에 있는 조건에 해당하는 index를
                        //found에 넣어줌 
    console.log(copy);
    console.log(액션.payload.id);
    if(found>=0){
      copy[found].quan++;
      return copy;
    }else {
      copy.push(액션.payload);
      return copy;
    }
  } else if (액션.type === '수량증가'){
    let copy = [...state];
    //  for(let i = 0; i<copy.length; i++){
    //    if(copy[i].id == 액션.payload){
    //      copy[i].quan++;
    //    return copy;
    //    }
    
    //액션.payload ->물건 id값. 해당 id값에 맞는 오브젝트의 수량 증감
    let newCopy = copy.map(function(obj,i) {
      if(obj.id === 액션.payload) {
        obj.quan++;
        }
        return obj;
      });
      return newCopy;
      
  } else if (액션.type === '수량감소'){
      let copy = [...state];
      let newCopy = copy.map(function(obj,i) {
        if(obj.id === 액션.payload) { 
          if(obj.quan > 1)  //수량 1이하일경우 감소불가
          obj.quan--;
        }
        return obj;
      });
      return newCopy;
  } else {
      return state;
  }
}

let store = createStore(combineReducers({reducer, reducer2}));


//</HashRouter> -> 라우팅을 안전하게 할수있게 도와줌(서버에 전송되지않고 페이지가 바뀜)
//BrowserRouter는 서버와 협업해서 보여줌 
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
