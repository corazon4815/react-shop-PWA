import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams } from 'react-router-dom';
import { Table,Nav} from 'react-bootstrap';
//import styled from 'styled-conponents';
                    //css를 미리 입혀놓은 컴포넌트 근데 설치해도 없다고나와서 주석처리함
import './Detail.scss';
import {재고context} from './App.js';
import {CSSTransition} from "react-transition-group";
import { connect } from 'react-redux';

//  let 박스 = styled.div`
//    padding : 20px;
//  `;

function Detail(props){

  //1. componentDidMount() : 컴포넌트 첫 등장후 실행할 코드 
  //2. componentWillUnmount() : 다른페이지로 넘어간다든지 등의 사유로 컴포넌트가 사라지기 전 실행할 코드
  //3. useEffect() : componentDidMount와 같음 (첫등장해서 로딩이 끝난후 = mount가 끝났을때)
                                            //(컴포넌트가 재랜더링되고난 후 때 = update되고 난 후)

    //useEffect : **** 맨처음 Detail이 로드될때만 실행하고 싶으면 []를 넣어주면됨
                            //특정 state가 변경될때만 실행해주세요->느낌
    //setTimeout : 타이머가 만료된 후 지정된 코드를 실행함
    useEffect(()=>{
    let 타이머 = setTimeout(()=>{ alert변경(false) }, 2000);  
    return ()=>{clearTimeout(타이머)}
    //setTimeout가 끝나지않았는데 페이지가 바뀌면 버그가 날수도있기때문에 
    //return(=componentWillUnmount)으로 컴포넌트가
    //종료되기전에 뭘 실행할지 적음 
  },[]);
  
  
  let history = useHistory();
  let [alert, alert변경] = useState(true);
  let [inputData, inputData변경] = useState('');
  let 재고 = useContext(재고context); //범위를 App.js에 만들었기때문에 export하고 import해야함
  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);
  let { id } = useParams(); //  /:id자리에 사용자가 입력한 값이 저장됨

  let [watched, watched변경]= useState([]);

  //최근 본상품으로 상품 저장
  useEffect(()=>{
    let arr = localStorage.getItem('watched'); //arr에 ""쳐진애(json) 또는 null이 나옴
    console.log("첫번째"+arr); //첫번째["1","3"]
    if( arr ==null ) {arr=[]} else {arr = JSON.parse(arr)}
     //null이면 빈배열을 넣어주고 null이 아니면 따옴표를 없애줌
    console.log("두번째"+arr); //두번째1,3
    arr.push(id);
    arr = [...new Set(arr)]; //중복 제거 
    console.log("세번째"+arr); //세번째1,3
    localStorage.setItem('watched',JSON.stringify(arr));
    console.log(localStorage.getItem('watched')); // ["1","3"]
    watched변경([...arr]);
    console.log({watched});
    
  },[]);

    return (
      <div className="container">
        {/* <박스></박스> */}

        {/* { inputData } 리액트에선 input에 값을 입력할때마다 Detail이 재 랜더링(컴포넌트)업데이트됨 */}
        {/* <input onChange={(e)=>{inputData변경(e.target.value) }} /> */}

        {
          alert === true
          ? (<div className="my-alert2">
              <p>재고가 얼마 남지 않았습니다.</p>
            </div>)
          : null    
        }

        <div className="row">
          <div className="col-md-4">
            <img src={'https://codingapple1.github.io/shop/shoes'+(id)+'.jpg'} width="100%" />
          </div>
          <div className="col-md-4 mt-4">
            <h4 className="pt-5">{props.shoes[id-1].title}</h4>
            <p>{props.shoes[id-1].content}</p>
            <p>{props.shoes[id-1].price}W</p>
            
            {/* <Info 재고={props.재고}/>  */}
            {/* 자식의 자식에게 props전송하는법 */}

            <button className="btn btn-secondary" onClick={()=>{
              //주문클릭시 재고 빼기
              props.재고변경([9,10,11])
              props.dispatch({type : '항목추가', payload : {id: id, name : props.shoes[id-1].title , quan:1}});
              history.push('/cart')

            }}>주문하기</button>&nbsp;&nbsp;&nbsp;
            <button className="btn btn-info" onClick={()=>{
              history.push('/')
            }}>뒤로가기</button>

          </div>
          <div className="col-md-4">
            <p width="100%" >최근 본 상품</p>
            <Watched watched={watched} shoes={props.shoes}></Watched>    
          </div>
          
        </div>

        <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link eventKey="link-0" onClick={()=>{스위치변경(false); 누른탭변경(0)}} >상품설명</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={()=>{스위치변경(false); 누른탭변경(1)}} >배송정보</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* 탭을 부드럽게 변환시키기 true일때만 에니메이션동작함*/}
        <CSSTransition in={스위치} classNames="wow" timeout={500}> 
          <TapContent 누른탭 = {누른탭} 스위치변경 = {스위치변경}/>  
        </CSSTransition> 

      </div> 
    )
}

function TapContent(props){

  useEffect(()=>{
    props.스위치변경(true);
  });

  if(props.누른탭 === 0) {
    return <div>0번째 내용입니다</div>
  } else if (props.누른탭 === 1){
    return <div>1번째 내용입니다</div>
  } else if (props.누른탭 ===2 ){
    return <div>2번째 내용입니다</div>
  }
}

function Info(props){
  return (
    <p> 재고 : {props.재고[0]} </p>
  )
}



function state를props화(state){
  console.log(state)
  return {
    state : state.reducer, //stete안에 있는 모든 데이터를 state라는 이름의 props로 바꿔주세용
                           //이러면 state라고 쓰는 순간 안의 모든 데이터가 출력이 됨
    alert열렸니 : state.reducer2            }
}

function Watched(props){
  return (
      <div>
        <Table responsive>
          <thead>
            <tr>
                <th>이미지</th>
                <td>상품명</td>
            </tr>
          </thead>
          <tbody>
            {
              props.watched.map((a, i)=>{
                return (
                  <tr key={i}>
                    <td><img src={'https://codingapple1.github.io/shop/shoes'+(a)+'.jpg'} width="50px" /></td>
                    <td>{a}</td>
                  </tr>
                        )
                    })
            }
          </tbody>
        </Table>
      </div>
  )
}

export default connect(state를props화)(Detail)


//export default Detail;