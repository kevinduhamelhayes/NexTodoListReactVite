import {useState} from 'react'
export const EditTodoForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!value) return
        editTodo(value, task.id)
    }
  return (
    <form onSubmit={handleSubmit} className='TodoForm' >
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className='todo-input'placeholder='update task' />
      <button type='submit' className='todo-btn'>Update</button>
    </form>
  )
}

