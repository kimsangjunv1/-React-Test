import React, { useState } from "react";

import TodoBoard from "../pages/TodoBoard";

//1. 인풋창이 있고 버튼이 있는 구조
//2. 인풋창에 값을 입력하고 버튼을 클릭하면 아이템이 추가가 된디ㅏ.
//3. 아이템을 삭제버튼을 누르면 삭제가 가능하다.

const Section_01 = () => {
  const [inputValue, setInputValue] = useState(1);
  const [todoList, setTodoList] = useState([]);
  const addItem = () => {
    console.log("입력됨 : ", inputValue);
    // 기존에 있는 아이템은 유지를 하되 새로운 아이템인 input Value를 넣어줌
    setTodoList([...todoList, inputValue]);
  };
  return (
    // 섹션 1 : 메인
    <React.Fragment>
      {/* 콘솔로그를 통해 input에 변화가 감지되면 그 이벤트 값을 콘솔로그로 출력하기 */}
      <h1>오늘의 할일</h1>
      <div className="input_box">
        <input
          type="text"
          value={inputValue}
          // 변화 발생시 setInputValue에 저장
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={addItem}>추가</button>
      </div>

      {/* todoList를 전달한다 TodoBoard로 */}
      <TodoBoard todoList={todoList} />
    </React.Fragment>
  );
};

export default Section_01;
