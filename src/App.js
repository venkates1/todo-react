import React, { useEffect, useState } from "react";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";
// import Todo from "./Todo";
import FlipMove from "react-flip-move";
import { MdDelete } from "react-icons/md";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  // console.log(todos);
  console.log(input);

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addToDo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    if (input) {
      setTodos([input, ...todos]);
    } else {
      return;
    }
    setInput("");
  };

  return (
    <div className="app">
      <h1 className="font-bold text-3xl text-green-800 ">TODO APP</h1>
      <div className="input__container">
        <form>
          <FormControl>
            <InputLabel>Write a Todo</InputLabel>
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
          </FormControl>

          <button
            type="submit"
            onClick={addToDo}
            disabled={!input}
            className="focus:outline-none ring ring-offset-2 ring-red-600 px-5 py-1 bg-red-400 rounded ml-5 hover:bg-red-500"
          >
            ADD
          </button>
        </form>
      </div>
      <ul className="unordered__list">
        <FlipMove
          enterAnimation="accordionVertical"
          leaveAnimation="accordionVertical"
        >
          {todos.map((todo, index) => {
            return (
              <li className="list__item">
                {todo.todo}
                <span className="close__icon ">
                  <MdDelete
                    onClick={(event) =>
                      db.collection("todos").doc(todo.id).delete()
                    }
                  />
                </span>
              </li>
            );
          })}
        </FlipMove>
      </ul>
    </div>
  );
}

export default App;
