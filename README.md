# Construyendo una app con ReactJS

Este paso es opcional, pero hara que nuestra app luzca mejor esteticamente.

Los estilos se manejan pasando el atributo o la prop `style`.
En cada caso pasaremos un objeto JS, que contendra el estilo deseado.

Crearemos un objeto JS generico `style`, en cuyas claves se encontraran los objetos JS a pasar.

1) Comencemos por estilizar el componente HomePage

Definiremos nuestra constante de estilos como sigue:

```js
const styles = {
  container: {
    padding: 50,
    backgroundColor: 'skyblue',
    height: '100vh',
  },
  title: {
    fontSize: 72,
    fontWeight: '800',
    marginTop: 50
  },
  link: {
    fontSize: 24
  }
}
```

Para utilizarla asi:

```js
const HomePage = () =>  
  <div style={styles.container}>
    <Link to="/to-do" style={styles.link}>Go to TO-DO</Link>
    <div style={styles.title}>Welcome!</div>
  </div>
```

2) Lo mismo haremos con el componente TODO

En este caso, la constante de estilos posee mas datos:

```js
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
```

Ademas, utilizaremos una funcion auxiliar para obtener el color de cada tarea, dependiendo de su estado:

```js
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
```

Para aplicar estos estilos, deberemos usarlos en los elementos que estamos renderizando.

Por un lado, editemos `renderTasks` para aplicar estilos a cada tarea de la lista:

```js
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
```

Por ultimo, editemos los demas elementos que retorna el componente:

```js
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
```

Felicitaciones, has llegado al final de esta guia. 
Espero que te haya resultado util :)
