import { useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom"

import classes from './App.module.css';
import Button from "./components/Button/button";
import TodoItem from './components/TodoItem/todoItem';

const getTodoFromServer = async(count) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos")
    const data = await response.json()
    return data.slice(0,count).map(d => {
        return {text: d.title, isCompleted: d.completed}
    })
}

function AppOnline() {
    const [todos,setTodos] = useState([])
    const [todoCount, setTodoCount] = useState(3)

    const inputValue = useRef(3)

    useEffect(()=>{
     getTodoFromServer(todoCount).then(data => {
        setTodos([...data])
     })
    },[todoCount])

    const toggleTodo = index => {
        const newTodo = [...todos]
        newTodo[index].isCompleted = !newTodo[index].isCompleted
        setTodos(newTodo)
    }

    const deleteTodo = index => {
        const newTodo = [...todos]
        newTodo.splice(index,1)
        setTodos(newTodo)
    }

    const changeTodos = () => {
        const count = inputValue.current.value || 0
        if(count > 0){
           setTodoCount(count)
        }
    }


  return (
    <div className={classes.app}>
      <h2 className={classes.title}>TODO App Online</h2>
      <div className={classes.Links}>
      <Link className={classes.Link} to="/">Local</Link>
      </div>
      <div className={classes.todoList}>
        {
          todos.length === 0 ?
            <div className={classes.todo}>
              No Todo Items
            </div>
            :
            todos.map((todo, index) => (
              <TodoItem key={index} index={index} todo={todo} onToggle={() => toggleTodo(index)} onRemove={() => deleteTodo(index)} />
            ))
        }

      </div>
      <div className={classes.Form}>
          <input
            ref={inputValue}
            type="number"
            placeholder='Enter count of posts'
          />
          <Button text='Update' onClick={() => changeTodos()} />
      </div>
    </div>
  );
}

export default AppOnline;
