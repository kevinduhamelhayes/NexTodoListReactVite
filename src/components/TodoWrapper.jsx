import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  
  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);
  
  // Guardar en localStorage cada vez que todos cambia
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (todo.trim() !== "") {
      // Crear fecha actual formateada
      const now = new Date();
      const formattedDate = now.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      
      setTodos([
        ...todos,
        { 
          id: uuidv4(), 
          task: todo, 
          completed: false, 
          isEditing: false,
          date: formattedDate
        },
      ]);
    }
  }

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
  
  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };
  
  // Filtrar tareas según el estado seleccionado
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });
  
  // Contador de tareas
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <div className="todo-stats">
        <p>Total: {todos.length} | Completadas: {completedCount} | Pendientes: {activeCount}</p>
      </div>
      <TodoForm addTodo={addTodo} />
      
      <div className="filters">
        <button 
          className={filter === "all" ? "active" : ""} 
          onClick={() => setFilter("all")}
        >
          Todas
        </button>
        <button 
          className={filter === "active" ? "active" : ""} 
          onClick={() => setFilter("active")}
        >
          Pendientes
        </button>
        <button 
          className={filter === "completed" ? "active" : ""} 
          onClick={() => setFilter("completed")}
        >
          Completadas
        </button>
        <button onClick={clearCompletedTodos}>
          Limpiar Completadas
        </button>
      </div>
      
      {/* display todos */}
      {filteredTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
      
      {filteredTodos.length === 0 && (
        <p className="empty-state">No hay tareas para mostrar</p>
      )}
    </div>
  );
};

