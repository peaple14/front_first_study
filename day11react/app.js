import './App.css';

// 사용자 정의 콤퍼넌트 선언
// 함수 형식으로 만든다.
function Hello() {
    // 자바스크립트 문법 state, function 선언 등.
    return (<>
      <h3>Hello</h3>
    </>);
}

//OkButton component
function OkButton(){
    return(<>
    <button>Ok</button>
    </>)
}

const CancelBtn = () => <button>Cancel</button>

function BtnGroup(){
    return(<>
    <OkButton></OkButton>
    <CancelBtn></CancelBtn>
    </>)
}



// ES6 문법의 화살표 함수로 콤퍼넌트 생성
const World = () => <h3>World</h3>;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List App</h1>
      </header>
      <div>
        <Hello />
        <World />
        <BtnGroup />
      </div>
    </div>
  );
}

export default App;