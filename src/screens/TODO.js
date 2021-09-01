import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TODO = () => {
  // Estado que representa la lista de tareas
  const [tasks, setTasks] = useState([])

  // Solicita obtener las tareas
  const getTasks = async () => { 
    await fetch('http://localhost:8000/todos')
    .then(response => response.json())
    .then(data => setTasks(data))
  }
  
  // Solicita crear una tarea
  const postTask = async (task) => {
    await fetch('http://localhost:8000/todos', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
  }

  // Solicita actualizar una tarea
  const putTask = async (taskId, status) => {
    await fetch(`http://localhost:8000/todos/${taskId}/${status}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
    })
    getTasks()
  }

  // Se obtienen las tareas al montar el componente
  useEffect(() => {
    getTasks()
  }, [])

  // Con la entrada del usuario se solicita la creacion
  const onSubmitHandler = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries())
    postTask({name: formObject['task-name'], status: 'PENDING'})
    .then(response => response.json())
    .then(newTask => setTasks([...tasks, newTask]))
    getTasks()
  }

  // Cambia el formato de la fecha de creacion
  const formatDate = (date) => new Date(date).toLocaleString()
  
  // Renderiza las tareas
  const renderTasks = () => tasks.map(item => 
    <div key={item._id}>
      <p>{item.name}</p>
      <div>
        <p>{formatDate(item.created)}</p>
      </div>
      <button onClick={() => putTask(item._id, 'cancel')}>Cancel</button>
      <button onClick={() => putTask(item._id, 'complete')}>Complete</button>
    </div>
  )

  return (
    <div>
      <Link to="/home">Go to HomePage</Link>
      <div>Here is your TO-DO list!</div>
      <form onSubmit={onSubmitHandler}>
        <input name="task-name" placeholder='Write your task here...'/>
        <button type="submit">Add Task</button>
      </form>
      {renderTasks()}
    </div>
  )
}

export default TODO