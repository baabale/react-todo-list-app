import React, { useRef, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import useInput from '../hooks/useInput';

function TodoForm() {
  const { dispatch } = useContext(TodoContext);
  const inputRef = useRef();
  const [value, handleChange, reset] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_TODO',
      payload: { id: Date.now(), text: value, completed: false }
    });
    reset();
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex items-center bg-white shadow-md rounded-lg p-4">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Add a new todo"
        className="border rounded-lg p-2 flex-grow outline-none focus:border-blue-500"
      />
      <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 ml-2 hover:bg-blue-600 transition duration-150">
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
