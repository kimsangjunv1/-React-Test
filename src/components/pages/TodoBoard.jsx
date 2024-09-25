import React from "react";
import TodoItem from "./TodoItem";

function TodoBoard(props) {
  //   console.log("todoBoard", props.todoList);
  return (
    <React.Fragment>
      {props.todoList.map((item) => (
        <TodoItem item={item} />
      ))}
    </React.Fragment>
  );
}

// const TodoBoard = () => {
//   return <div>TodoBoard</div>;
// };

export default TodoBoard;
