import { useReducer, useRef } from 'react';

import classes from './App.module.css';
import Button from './components/Button/button';
import TodoItem from './components/TodoItem/todoItem';
import { initialTodos, todoActions, todoReducer } from './reducer/todo';

function App() {
const [todos, dispatch] = useReducer(todoReducer, initialTodos)

  const inputValue = useRef('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!inputValue.current.value) return;
    todoModifier.addTodo(inputValue.current.value);
    inputValue.current.value = ''
  };

  const todoModifier = {
    addTodo: text => {
      dispatch({type: todoActions.ADD, newTodo: {text, isCompleted: false}})
    },
    toggleTodo: index => {
      dispatch({type: todoActions.TOGGLE, index: index})
    },
    removeTodo: index => {
      dispatch({type: todoActions.DELETE, index})
    }
  }

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
              <TodoItem key={index} index={index} todo={todo} onToggle={() => todoModifier.toggleTodo(index)} onRemove={() => todoModifier.removeTodo(index)} />
            ))
        }

      </div>
      <div className={classes.Form}>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputValue}
            type="text"
            placeholder='New Todo Item'
          />
          <Button text='ADD' onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
}

export default App;
