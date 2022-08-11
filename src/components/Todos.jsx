import React from "react";
import { Reorder } from "framer-motion";
import crossIcon from "../assets/icon-cross.svg";

const titleStyle = "text-sm text-gray-200";
const titleStyleComplete = "text-sm line-through text-gray-400";

const Todos = ({ item, taskVariant, updateTodo, deleteTodo }) => {
  return (
    <Reorder.Item
      variants={taskVariant}
      initial="init"
      animate="visible"
      exit="init"
      layout
      value={item}
      className="flex items-center justify-between p-4 w-full 
                       border-b-[1px] border-b-gray-400"
    >
      <div className="flex items-center w-full cursor-pointer">
        <input
          onClick={() => updateTodo(item)}
          className="todo-check w-6 h-6 rounded-full bg-transparent border-gray-500 mr-4 focus:text-primary focus:ring-offset-0 focus:ring-0 text-xs cursor-pointer"
          type="checkbox"
          checked={item.isCompleted}
        />
        <p className={!item.isCompleted ? titleStyle : titleStyleComplete}>
          {item.title}
        </p>
      </div>
      <img
        onClick={() => deleteTodo(item.id)}
        className="cursor-pointer"
        src={crossIcon}
        alt="cross icon"
      />
    </Reorder.Item>
  );
};

export default Todos;
