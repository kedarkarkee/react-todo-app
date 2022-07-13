import { useState } from 'react';

import classes from './App.module.css';

function App() {
  const [todos, setTodos] = useState([
    { text: "Learn about React", isCompleted: false },
    { text: "Meet friend for lunch", isCompleted: false },
    { text: "Build really cool todo app", isCompleted: false }
  ]);

  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const toggleTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };


  return (
    <div className={classes.app}>
      <h2 className={classes.title}>TODO App</h2>
      <div className={classes.todoList}>
        {
          todos.length === 0 ? 
          <div className={classes.todo}>
            No Todo Items
            </div>
          :
        todos.map((todo, index) => (
          <div key={index} className={classes.todo} style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
            {todo.text}
            <div>
              <button onClick={() => toggleTodo(index)}>{todo.isCompleted ? String.fromCharCode(9100) : String.fromCharCode(10003)}</button>
              <button onClick={() => removeTodo(index)}>X</button>
            </div>
          </div>
        ))
        }

      </div>
      <div className={classes.Form}>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='New Todo Item'
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        <button type='submit'>ADD</button>
        </form>
      </div>
    </div>
  );
}

export default App;
