# Construyendo una app con ReactJS

1) En este paso, unicamente modificaremos el archivo src/screens/TODO.js

Comenzaremos importando dos hooks de react que van a utilizarese:

```js
import React, { useState, useEffect } from 'react';
```

Para poder llevar adelante los proximos pasos, cambiaremos la sintaxis del componente. 
En lugar de tener esta forma:

```js
const TODO = () => (
  ...
)
```

Escribiremos algo que es equivalente:

```js
const TODO = () => {
  return (
    ...
  )
}
```

2) Utilizaremos el primero de los hooks, `useState`, para manejar un estado donde se guardara la lista de tareas

```js
const [tasks, setTasks] = useState([])
```

De ahora en adelante: 
- `tasks` contendra la lista de tareas.
- `setTasks` se utilizara para cambiar el valor de la lista.
- La lista se inicializa vacia.

3) Definiremos una funcion que obtiene las tareas de backend

```js
const getTasks = async () => { 
  await fetch('http://localhost:8000/todos')
  .then(response => response.json())
  .then(data => setTasks(data))
}
```

Al recibir los datos del backend, actualiza la lista con `setState`.

4) Definiremos una funcion que solicita al backend crear una tarea

```js
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
```

Recibe una tarea (que sera un objeto JS) y la envia en una request a backend.
Se hace una llamada a `getTasks`, para obtener la lista actualizada con el nuevo elemento.

5) Definiremos una funcion que solicita al backend actualizar el estado de una tarea

```js
const putTask = async (taskId, status) => {
  await fetch(`http://localhost:8000/todos/${taskId}/${status}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
  })
  getTasks()
}
```

Recibe el identificador de la tarea a actualizar y el nuevo estado.
Se vuelve a llamar a `getTasks`, para obtener la lista con el nuevo elemento actualizado.

6) Utilizaremos el segundo hook, `useEffect`, para solicitar al componente que al montarse se obtenga la lista de tareas

```js
useEffect(() => {
  getTasks()
}, [])
```

7) Utilicemos lo que introduce el usuario. 

Se recibira un evento cuando el usuario presione la tecla enter o presione el boton.
Manejaremos ese evento como sigue:

```js
const onSubmitHandler = (event) => {
  event.preventDefault()
  const formData = new FormData(event.currentTarget);
  const formObject = Object.fromEntries(formData.entries())
  postTask({name: formObject['task-name'], status: 'PENDING'})
}
```

De esta manera, ese evento dispara una accion de crear una tarea. 
Al crearse, es inicializada como una tarea pendiente, tal como se indica en su estado.

8) Solo resta indicar como se mostraran estas tareas:

```js
const formatDate = (date) => new Date(date).toLocaleString()

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
```

La primera funcion se utiliza para formatear la fecha de creacion de la tarea.

La segunda mapea cada tarea a un JSX.
Para esto, se podria crear un nuevo componente llamado Task y pasar los datos de la tarea mediante props.
Para mayor simplicidad, este paso queda en manos del lector.

9) Luego de realizadas las modificaciones, el componente TODO retorna lo siguiente:

```js
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
```

Hemos conseguido que el usuario pueda ver tareas, crearlas y actualizarlas.

Siguiente paso: feature/styles
