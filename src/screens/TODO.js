import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  button: {
    width: 150,
    height: 50,
    borderRadius: 12,
    fontSize: 24,
  },
  container: {
    padding: 50,
    height: '100vh',
  },
  input: {
    width: 650,
    height: 30,
    marginRight: 10,
    borderRadius: 12,
    padding: 10,
    fontSize: 24,
    outline: 'none',
  },
  itemContainer: {
    borderRadius: 12,
    borderWidth: 0.5,
    border: 'solid',
    padding: 10,
    marginTop: 20,
    fontSize: 24,
    width: 300,
    marginRight: 10
  },
  itemButton: {
    width: 140,
    height: 50,
    borderRadius: 12,
    fontSize: 20,
    marginLeft: 5
  },
  link: {
    fontSize: 24
  },
  tasks: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 72,
    fontWeight: '800',
    marginTop: 50,
    marginBottom: 50,
  },
}

const getStatusColor = (status) => {
  switch (status) {
    case 'PENDING': 
      return 'yellow'
    case 'COMPLETED': 
      return 'green'
    case 'CANCELED':
      return 'red'
    default:
      return 'yellow'
  }
}

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
    getTasks()
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
  }

  // Cambia el formato de la fecha de creacion
  const formatDate = (date) => new Date(date).toLocaleString()
  
  // Renderiza las tareas
  const renderTasks = () => tasks.map(item => 
    <div key={item._id} style={{...styles.itemContainer, backgroundColor: getStatusColor(item.status)}}>
      <p>{item.name}</p>
      <div>
        <p>{formatDate(item.created)}</p>
      </div>
      <button onClick={() => putTask(item._id, 'cancel')} style={styles.itemButton}>Cancel</button>
      <button onClick={() => putTask(item._id, 'complete')} style={styles.itemButton}>Complete</button>
    </div>
  )

  return (
    <div style={styles.container}>
      <Link to="/home" style={styles.link}>Go to HomePage</Link>
      <div style={styles.title}>Here is your TO-DO list!</div>
      <form onSubmit={onSubmitHandler}>
        <input name="task-name" placeholder='Write your task here...' style={styles.input}/>
        <button type="submit" style={styles.button}>Add Task</button>
      </form>
      <div style={styles.tasks}>
        {renderTasks()}
      </div>
    </div>
  )
}

export default TODO