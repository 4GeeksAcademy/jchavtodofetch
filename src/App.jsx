import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: "Complete", done: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (task) => {
    if (!task) return;
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

  const changeTodoState = (id, state) => {
    const newTodoList = todos.map((item) => {
      if (item.id === id) {
        return { ...item, done: state };
      }
        return item;
    });
    
    setTodos(newTodoList);
  };

  return (
    <div className="list">
      <h1>To Do List</h1>

      <form className="new-todo" onSubmit={(e) => e.preventDefault()}>
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
      </form>

      <ul className="todo-list">
        {todos.map((item) => {
          return (
            <li key={item.id} style={{opacity: item.done ? ".4" : "1"}} className={`todo-item ${item.done ? "done" : ""}`}>
              <input
                type="checkbox"
                value={item.done}
                onChange={(e) => changeTodoState(item.id, e.target.checked)}
              />
              <span className="todo-text">{item.task}</span>
              <button onClick={() => deleteTodo(item.id)} className="delete">
                🗑
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
