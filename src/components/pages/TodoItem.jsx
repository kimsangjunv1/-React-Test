import React from "react";

function TodoItem(props) {
  //   console.log(props);
  return (
    <div className="item">
      <div>{props.item}</div>
      <button>x</button>
    </div>
  );
}

export default TodoItem;
