import React from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";

function App() {
  return (
    <TodoProvider>
      <div className="max-w-lg mx-auto mt-8">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
        <TodoForm />
        <TodoFilter />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
