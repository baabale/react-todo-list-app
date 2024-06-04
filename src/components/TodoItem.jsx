import React, { useContext, useCallback, useState, useRef } from "react";
import { TodoContext } from "../context/TodoContext";

function TodoItem({ todo }) {
  const inputRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const { dispatch } = useContext(TodoContext);

  const handleToggle = useCallback(() => {
    dispatch({ type: "TOGGLE_TODO", payload: todo.id });
  }, [dispatch, todo.id]);

  const handleEdit = useCallback(() => {
    dispatch({ type: "EDIT_TODO", payload: { id: todo.id, text: todo.text } });
    setEditMode(false);
  }, [dispatch, todo.id, todo.text]);

  const handleRemove = useCallback(() => {
    dispatch({ type: "REMOVE_TODO", payload: todo.id });
  }, [dispatch, todo.id]);

  const handleEditButtonClick = () => {
    setEditMode(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleInputChange = (e) => {
    dispatch({
      type: "EDIT_TODO",
      payload: { id: todo.id, text: e.target.value },
    });
  };

  return (
    <li className="flex items-center justify-between p-4 border-b last:border-none bg-white hover:bg-gray-100 transition duration-150">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="w-4 h-4 cursor-pointer mr-2"
      />
      {editMode ? (
        <input
          ref={inputRef}
          type="text"
          value={todo.text}
          onChange={handleInputChange}
          onBlur={() => setEditMode(false)}
          onKeyPress={(e) => e.key === "Enter" && setEditMode(false)}
          className="flex-grow cursor-pointer"
        />
      ) : (
        <span
          className={`flex-grow ${todo.completed ? "line-through" : ""}`}
          onDoubleClick={handleEditButtonClick}
        >
          {todo.text}
        </span>
      )}
      <button onClick={editMode ? handleEdit : handleEditButtonClick} className="text-blue-500 ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {editMode ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          )}
        </svg>
      </button>
      <button onClick={handleRemove} className="text-red-500 ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </li>
  );
}

export default TodoItem;
