import React, { useRef, useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import useInput from "../hooks/useInput";

function TodoForm() {
  const { dispatch } = useContext(TodoContext);
  const inputRef = useRef();
  const [value, handleChange, reset] = useInput("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value && value.trim()) {
      dispatch({
        type: "ADD_TODO",
        payload: { id: Date.now(), text: value, completed: false },
      });
      reset();
      inputRef.current.focus();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  const toggleMode = () => {
    setSearchMode((prevMode) => !prevMode);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 space-y-4 md:space-y-0 md:space-x-4"
    >
      {searchMode ? (
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search todos"
          className="border rounded-lg p-2 flex-grow outline-none focus:border-blue-500"
        />
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Add a new todo"
          className="border rounded-lg p-2 flex-grow outline-none focus:border-blue-500"
        />
      )}
      {!searchMode && (
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg p-2 flex items-center justify-center hover:bg-blue-600 transition duration-150"
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      )}
      <button
        type="button"
        onClick={toggleMode}
        className="bg-gray-500 text-white rounded-lg p-2 flex items-center justify-center hover:bg-gray-600 transition duration-150"
      >
        {searchMode ? (
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
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
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        )}
      </button>
    </form>
  );
}

export default TodoForm;
