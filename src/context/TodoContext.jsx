import React, { createContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Initial state
const initialState = {
  todos: [],
  filter: 'all'
};

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'REMOVE_TODO':
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

// Create Context
const TodoContext = createContext();

// TodoProvider component
function TodoProvider({ children }) {
  const [storedTodos, setStoredTodos] = useLocalStorage('todos', []);
  const [state, dispatch] = useReducer(todoReducer, { ...initialState, todos: storedTodos });

  useEffect(() => {
    setStoredTodos(state.todos);
  }, [state.todos, setStoredTodos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
