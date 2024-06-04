import React, { createContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Actions
const TODO_ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  EDIT_TODO: 'EDIT_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM'
};

// Initial state
const initialState = {
  todos: [],
  filter: 'all',
  searchTerm: ''
};

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        )
      }
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
    case TODO_ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
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
