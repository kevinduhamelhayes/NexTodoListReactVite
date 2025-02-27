import React, { useState, useEffect, useRef } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  
  // Focus en el input al montar el componente
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación simple
    if (value.trim() === "") {
      setError("La tarea no puede estar vacía");
      return;
    }
    
    // Limpiar error si hay valor
    setError("");
    
    // Actualizar la tarea
    editTodo(value, task.id);
  };

  return (
    <form onSubmit={handleSubmit} className="EditTodoForm">
      <input
        type="text"
        value={value}
        ref={inputRef}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Actualizar tarea"
        className={error ? "input-error" : ""}
      />
      {error && <p className="error-message">{error}</p>}
      <div className="buttons">
        <button type="submit" className="edit-btn">Actualizar</button>
        <button 
          type="button" 
          className="cancel-btn"
          onClick={() => editTodo(task.task, task.id)}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

