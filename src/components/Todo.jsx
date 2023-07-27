
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
export const Todo = ({task, deleteTodo, editTodo, toggleComplete}) => {
  return (
    <div className='Todo'>
      <li className={`todo-item ${task.completed ? 'completed' : ''}`}>{task.tAK}</li>
      <button className='complete-btn' onClick={() => toggleComplete(task.id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
      <button className='trash-btn' onClick={() => deleteTodo(task.id)}><FontAwesomeIcon icon={faTrash} /></button>
    </div>
  )
}