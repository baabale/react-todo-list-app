import React, { useContext, useMemo } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

function TodoList() {
  const { state } = useContext(TodoContext);
  const filteredTodos = useMemo(() => {
    if (state.searchTerm.length > 0) {
      return state.todos.filter((todo) =>
        todo.text.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }
    switch (state.filter) {
      case "completed":
        return state.todos.filter((todo) => todo.completed);
      case "active":
        return state.todos.filter((todo) => !todo.completed);
      default:
        return state.todos;
    }
  }, [state.todos, state.filter, state.searchTerm]);

  return (
    <ul className="list-none p-0 bg-white shadow-lg rounded-lg">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
