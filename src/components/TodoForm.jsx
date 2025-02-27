import React, { useState, useRef, useEffect } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  
  // Focus en el input al montar el componente
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación
    if (value.trim() === "") {
      setError("Por favor ingresa una tarea");
      return;
    }
    
    // Limpiar error si hay valor
    setError("");
    
    // Añadir tarea y reiniciar campo
    addTodo(value);
    setValue("");
    
    // Volver a enfocar el input
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <div className="input-container">
        <input
          type="text"
          value={value}
          ref={inputRef}
          onChange={(e) => {
            setValue(e.target.value);
            if (e.target.value.trim() !== "") {
              setError("");
            }
          }}
          placeholder="¿Qué necesitas hacer hoy?"
          className={error ? "todo-input input-error" : "todo-input"}
        />
        <button type="submit" className="todo-btn">Añadir</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

