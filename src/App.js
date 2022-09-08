import React, { useState, useEffect, useRef } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import "./App.css";

function App() {
  const getTodo = () => {
    //- returns task from Local Storage or empty list

    const list = JSON.parse(localStorage.getItem("todo"));

    if (list) {
      return list;
    } else {
      return [];
    }
  };

  const inputTask = useRef(); //- reference using useRef hook

  const [task, setTask] = useState(""); //- task to be added

  const [todo, setTodo] = useState(getTodo); //- todo list

  const setInputTask = (e) => {
    //- on input change it sets the task
    setTask(e.target.value);
  };

  const addTodo = () => {
    //- add the task to todo
    if (task !== "") {
      const newTask = {
        value: task,
        id: todo.length + 1,
      };

      setTodo([...todo, newTask]);
      console.log(localStorage.getItem("todo"));
      setTask("");
      inputTask.current.value = "";
    }
  };

  const removeTask = (id) => {
    //- remove task of given id

    const newTodo = todo.filter((todo) => {
      if (todo.id !== id) {
        return todo;
      }
    });

    setTodo(newTodo);
  };

  useEffect(() => {
    //- changes made to todo will be saved in Local Storage
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="app">
      <h1 className="text-center app__name">TODO APPLICATION</h1>
      <br></br>
      <div className="app__body1">
        <input
          className="app__input"
          placeholder="Add New Task ..."
          type="text"
          ref={inputTask}
          onChange={setInputTask}
        ></input>

        <IconButton onClick={addTodo} className="app__button">
          <KeyboardDoubleArrowDownIcon />
        </IconButton>
      </div>

      {todo.map((task) => {
        return (
          <div className="app__todo">
            <div className="app_todo">
              <div className="flex justify-center align-center">
                <p className="app_todo_p">
                  {task.id}. {task.value}
                </p>
              </div>
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                onClick={() => removeTask(task.id)}
                className="app__button"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
