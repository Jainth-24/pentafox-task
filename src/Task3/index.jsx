import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; 

const Task3 = () => {
  const [todos, setTodos] = useState([
    { id: uuidv4(), text: "Task 1", completed: false },
    { id: uuidv4(), text: "Task 2", completed: true },
    { id: uuidv4(), text: "Task 3", completed: false },
  ]);

  const [filter, setFilter] = useState("pending");

  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const filteredTodos =
    filter === "pending"
      ? todos.filter((todo) => !todo.completed)
      : todos.filter((todo) => todo.completed);

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setFilter("pending")}
          className={`font-semibold ${
            filter === "pending" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          Pending ({todos.filter((todo) => !todo.completed).length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`font-semibold ${
            filter === "completed" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          Completed ({todos.filter((todo) => todo.completed).length})
        </button>
      </div>

      <div className="p-2 mb-4">
        <input
          type="text"
          placeholder="Add a new task..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              setTodos([
                ...todos,
                {
                  id: uuidv4(), 
                  text: e.target.value.trim(),
                  completed: false,
                },
              ]);
              e.target.value = "";
            }
          }}
        />
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 border-b last:border-none"
          >
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span
                className={`${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
            </label>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task3;
