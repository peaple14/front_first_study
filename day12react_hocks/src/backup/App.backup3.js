import React, { useState } from 'react';
import './App.css';

const MyComponent = () => {
  const [value, setValue] = useState("");
  const [todoList, setTodoList] = useState([
    {no:1, title:"치맥 하기", done:false},
    {no:2, title:"방 청소 하기", done:false},
    {no:3, title:"명상 하기", done:true},
    {no:4, title:"착한 일 하기", done:false}
  ]);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

   const onClickHandler = (e) => {
    // 할일 목록에 새 항목을 추가.
  }

  const onClickDelBtn = (e)=>{
    //아이템 삭제 버튼

  }

   let list = todoList.map((item) => {
    return (<li key={item.no}>
      <input type='checkbox'/>
      <label>{item.title}</label>
      <button onClick={onClickDelBtn}>삭제</button>
    </li>);
  });

  return (
    <div>
      <header className="App-header">
        <h1>Todo List App</h1>
      </header>
      <main>
        <h2>Welcome</h2>
        <input value={value} onChange={onChangeHandler}></input>
        <button onClick={onClickHandler}>확인</button>
        <hr/>
        <ul>{list}</ul>
      </main>
      <footer>(c)Comstudy21. since 2023.</footer>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <MyComponent />
    </div>
  );
}

export default App;