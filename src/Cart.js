import React, { useEffect, memo } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import './Detail.scss';
// table에 중괄호를 써야 변수/함수 가져오기. 안쓰면 export default된거 가져온다는 뜻

function Cart(props){
  return (
      <div>
        <Table responsive>
          <thead>
            <tr>
                <th width="60px">번호</th>
                <th>품번</th>
                <th>이미지</th>
                <td>상품명</td>
                <th>수량</th>
                <th>변경</th>
            </tr>
          </thead>
          <tbody>
            {
              props.state.map((a, i)=>{
                return (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <th>{a.id}</th>
                    <td><img src={'https://codingapple1.github.io/shop/shoes'+(a.id)+'.jpg'} width="50px" /></td>
                    <td>{a.name}</td>
                    <td>{a.quan}</td> 
                                                                              {/* dispatch로 수정요청을 보낼때 데이터도 보낼 수있음 
                                                                                  보낸 자료는 액션 파라미터에 저장돼있음*/}
                    <td><button className="btn btn-secondary" onClick={()=>{props.dispatch({type:'수량증가', payload : a.id})}}>+</button>&nbsp;
                        <button className="btn btn-secondary" onClick={()=>{props.dispatch({type:'수량감소', payload : a.id})}}>-&nbsp;</button>
                    </td>
                  </tr>
                        )
                    })
            }
          </tbody>
        </Table>
            {   
                props.alert열렸니 === true
                ? (<div className = "my-alert2">
                    <p>지금 구매하시면 신규 할인 20%</p><br/>
                    <button className="btn btn-secondary" onClick={()=>{props.dispatch({type:'닫기'})}}>닫기</button>
                </div>)
                : null
            }   
        {/* <Parent 이름="존박" 나이="20"></Parent> */}
      </div>
  )
}

function state를props화(state){
  console.log(state)
  return {
    state : state.reducer, //stete안에 있는 모든 데이터를 state라는 이름의 props로 바꿔주세용
                           //이러면 state라고 쓰는 순간 안의 모든 데이터가 출력이 됨
    alert열렸니 : state.reducer2            }
}

//memo()를 사용해서 불필요한 재 랜더링 막기 (이름이랑 나이중에 이름만 전송해도 나이까지 재랜더링되는 문제)
// 1.'react'에서 import{memo}
// 2. memo()로 컴포넌트 감싸기 
function Parent(props){
  return (
    <div>
      <Child1 이름 = {props.이름}></Child1> 
      <Child2 나이 = {props.나이}></Child2>
    </div>
  )
}

function Child1(){
  useEffect(()=>{console.log('랜더링됨1')});
  return <div>1111</div>
}
let Child2 = memo(function(){
  useEffect(()=>{console.log('랜더링됨2')});
  return <div>2222</div>
});








export default connect(state를props화)(Cart)

//export default Cart;