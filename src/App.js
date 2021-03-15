import React, {useContext, useState, lazy, useEffect, Suspense} from 'react';
import { Navbar,Nav,NavDropdown,Button,Jumbotron} from 'react-bootstrap';
import './App.css';
import Data from './data.js' //    ./ 가 현재 경로라는 뜻임 
//import Detail from './Detail.js'
import Detail from './Detail.js';
import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import Cart from './Cart.js';
import { connect } from 'react-redux';



//let Detail = lazy(()=> import('./Detail.js')); //<Detail>을 보여줄때만 import Detail.js해옴. lazy는 import가장아래위치

export let 재고context = React.createContext();
//let 재고context = React.createContext();

function App(props) {

  let [alert, alert변경] = useState(false);
  let [more, more변경] = useState(true)
  let [shoes, shoes변경] = useState(Data);
  // let [alert, alert변경] = useState(false);
  // let [more, more변경] = useState(true);
  let [재고, 재고변경] = useState([10,11,12]);




  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">MY SHOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className="link" as={Link} to="/">Home</Nav.Link>
            <Nav.Link className="link" as={Link} to="/Detail/1">Detail</Nav.Link>
            <Nav.Link className="link" as={Link} to="/cart">Cart</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    <Switch>
    {/* 중복이여도 맨 윗쪽에 있는거만 보여주세요 (택1느낌)*/} 
      
      {/* 라우팅 컴포넌트로 깔끔하게 하는법 <Route path="/어쩌구" component={Modal}></Route> */}
      <Route exact path="/">
        {/* <div>메인페이지</div> */}
        <Jumbotron className="background">
          <h1>Season open</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="light">Learn more</Button>
            </p>
        </Jumbotron>
        
        {
          alert === true
          ? (<div className="my-alert2">
              <Modal/> 
            </div>)
          : null    
        }

        <div className="container">
          
          {/* <재고context.Provider value={재고}>  */}
          <재고context.Provider>
                                {/* 공유하고싶은 데이터 */}

          <div className="row">
            {
              props.item.map((a,i)=>{
                return <Card item={props.item[i]} i={i} key={i}/>  //shoes[i]를 a로적어도 됨 
                                                //i를 자식에 전송하는법 1. i={i}
              })
            }
          </div>

          </재고context.Provider>

          {/* then 성공했을때
          catch 실패했을때 */}
          {
          more === true
          ?
          <More item={props.item} more변경={more변경} alert변경={alert변경} dispatch= {props.dispatch}/>
          : null    
        }
        </div>
      </Route>
      
      
      <Route path="/detail/:id">
        <재고context.Provider value={재고}>
          {/* <div>DETAIL</div> */}
            <Suspense fallback={<div>로딩중이에요</div>}>
              {/* <Detail 재고={재고} item={props.item} 재고변경={재고변경} /> */}
            <Detail 재고변경={재고변경} />
            </Suspense>
        </재고context.Provider>
      </Route>

      {/* 
      1. Cart.js만들기 (export default)
      2. 부트스트랩 table 넣기(import)
      3. App.js에 (import) 하고 Route 추가 
      4. 
      */}
      <Route path="/cart">
        <Cart></Cart>
      </Route>

      <Route path="/:ifgdg"> 
      {/* /:id ->모든문자열을 뜻함 */}
      <div>/슬러시뒤에 문자열이 있으면 이거보여줘</div>
      </Route> 

    </Switch>        
      
    
      
  
    </div>

  );
}

// component제작법 1. funtion컴포넌트이름(){} 2.return(<div></div)
function Card(props){


  let 재고 = useContext(재고context);
                        //범위를 넣어줌
  let history = useHistory();
  
  return (
    <div className="col-md-4" onClick={()=>{ history.push('/detail/'+(props.item.id+1)) }}> {/**md : 모바일에선 새로로 정렬*/}
        <img src={ 'https://codingapple1.github.io/shop/shoes'+(props.i+1)+'.jpg' } width="100%" />
        <h4>{props.item.title}</h4>
        <p>{props.item.content} & {props.item.price}</p>
        <Test></Test>
    </div>
    
  )
}

function Modal(){
  return (
    <div>
      <p>상품을 로딩중입니다.</p>
    </div>
  )
}

function More(props){

  return (
    <button className="btn btn-primary" onClick={()=>{
      props.alert변경(true);
      //로딩중이라는 ui

      //post 요청 
      //axios.post('https://codingapple1.github.io/shop/data2.json', { id : 'test', pw : 1234})
      //.then((result)=>{  })
      //.catch(()=>{ })

      axios.get('https://codingapple1.github.io/shop/data2.json') // object가 아닌 json형식임(키값에 ""가 있음) 
      .then((result)=>{
        props.alert변경(false);                                           //하지만 axios는 오브젝트로 변환시켜서 가져옴
      //로딩중이라는 ui 안보이게 
        console.log(result.data);                                  //쌩자바스크립트 fetch는 안그렇기때문에 작업이 필요함
        props.dispatch({type : '신발추가', payload : result.data });
        
        //shoes변경([...shoes, ...result.data]);
        props.more변경(false);
      })
      .catch((result)=>{
        props.alert변경(false);
        //로딩중이라는 ui 안보이게 
        props.more변경(false);
        console.log('실패 했어요')
        console.log(result)
      })
    }}>더보기
    </button>
  )
}

function Test(){ //props없이 공유하기 =>useContext 
  let 재고 = useContext(재고context)
  return <p>{재고}</p>

}

function state를props화(state){
  console.log(state)
  return {
    state : state.reducer, //stete안에 있는 모든 데이터를 state라는 이름의 props로 바꿔주세용
                           //이러면 state라고 쓰는 순간 안의 모든 데이터가 출력이 됨
    alert열렸니 : state.reducer2,
    item : state.reducer3
     }
}



export default connect(state를props화)(App)


//export default App;
