import { useState } from "react";
import "./app.css";

function App() {
  const [todos, setTodos] = useState([{ id: 1, task: "Complete", done: false }]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (task) => {
    const newTodoList = [
      ...todos,
      { id: todos.length + 1, task: task, done: false },
    ];

    setTodos(newTodoList);
  };

  const deleteTodo = (id) => {
    const newTodoList = todos.filter((item) => item.id != id);
    setTodos(newTodoList);
  };



  return (
    <div className="list">
      <h1>To Do List</h1>

      <div className="new-todo">
        <input
          type="text"
          value={newTodo}
          placeholder="Add New Task"
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button
          onClick={() => {
            addTodo(newTodo);
            setNewTodo("");
          }}
        >
          ➕
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((item) => {
          return (
            <li key={item.id} className="todo-item">
              <input type="checkbox" value={item.done} />
              <span className="todo-text">{item.task}</span>
              <button onClick={() => deleteTodo(item.id)} className="delete">🗑</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
