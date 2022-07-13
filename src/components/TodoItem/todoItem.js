import Button from '../Button/button'
import classes from './todoitem.module.css'

const TodoItem = ({index, todo, onToggle, onRemove}) => {
    return (
        <div key={index} className={classes.todo} style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
            {todo.text}
            <div>
              <Button text={todo.isCompleted ? String.fromCharCode(9100) : String.fromCharCode(10003)} onClick={onToggle} />
              <Button text='X' onClick={onRemove} />
            </div>
          </div>
    )
}
export default TodoItem