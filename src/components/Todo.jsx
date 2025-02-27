import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTrash, 
  faPenToSquare, 
  faCheckCircle,
  faCircle 
} from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className={`Todo ${task.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <p className="task-text">{task.task}</p>
        <div className="timestamp">
          Creada: {task.date || "Hoy"}
        </div>
      </div>
      
      <div className="todo-actions">
        <FontAwesomeIcon 
          className="complete-icon"
          icon={task.completed ? faCheckCircle : faCircle}
          onClick={() => toggleComplete(task.id)}
        />
        <FontAwesomeIcon 
          className="edit-icon"
          icon={faPenToSquare} 
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon 
          className="delete-icon"
          icon={faTrash} 
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};