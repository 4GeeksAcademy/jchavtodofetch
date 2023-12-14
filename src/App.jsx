import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async (task) => {
    if (!task) return;
    const todoReference = collection(db,"todos");
    await addDoc(todoReference, {
      task: task,
      done: false,
    }).then((docRef) => {
      const newTodoList = [
        ...todos,
      { id: docRef.id, task: task, done: false },
    ];
    setTodos(newTodoList);
  })
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id))
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

  useEffect(() => {
    const todosReference = collection(db, "todos")

    const getData = async () => {
      const data = await getDocs(todosReference);
      const todos = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todos)
    };
    getData()
  }, []);

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
            <li key={item.id} id={item.id} style={{opacity: item.done ? ".4" : "1"}} className={`todo-item ${item.done ? "done" : ""}`}>
              <input
                type="checkbox"
                value={item.done}
                onChange={(e) => changeTodoState(item.id, e.target.checked)}
              />
              <span className="todo-text">{item.task} </span>
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
