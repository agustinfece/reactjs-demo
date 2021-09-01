# Construyendo una app con ReactJS

1) Instalar la dependencia para manejar la navegacion:

```js
yarn add react-router-dom
```

El objetivo es tener dos rutas para componentes distintos:
- HomePage: componente para desplegar la pantalla de inicio
- TODO: componente para desplegar la lista de tareas pendientes

2) Crear una nueva carpeta src/screens

3) Crear el componente src/screens/HomePage.js como sigue:

```js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () =>  
  <div>
    <Link to="/to-do">Go to TO-DO</Link>
  </div>

export default HomePage
```

Se utiliza el componente Link, ofrecido por nuestra nueva dependencia.
El mismo se encarga de dirigir a otra ruta especificada en la prop "to".

4) Crear el componente src/screens/TODO.js como sigue:

```js
import React from 'react';
import { Link } from 'react-router-dom';

const TODO = () =>  
  <div>
    <Link to="/home">Go to HomePage</Link>
  </div>

export default TODO
```

5) Editar el archivo src/App.js de la siguiente manera:

Comenzar importando lo siguiente de nuestra nueva dependencia:

```js
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
```

- BrowserRoute se encarga de configurar el enrutado.
- Route define las rutas y que componente se renderiza en ellas.
- Redirect se utiliza para redireccionar las demas rutas no especificadas.

Importar los componentes creados hace un instante:

```js
import HomePage from './screens/HomePage';
import TODO from './screens/TODO';
```

Solo hace falta utilizar lo que hemos importado, modificando nuestro componente App:

```js
function App() {
  return (
    <BrowserRouter>
      <Route path="/home" component={HomePage} exact/>
      <Route path="/to-do" component={TODO} exact/>
      <Route path="/" render={() => <Redirect to="/home"/>} />
    </BrowserRouter>
  );
}

export default App;
```

Hemos conseguido una SPA que cuenta con dos rutas: /home y /to-do, mapeando cada ruta a su componente.
La ultima ruta hace match con toda ruta ingresada manualmente y redirige a HomePage.

Siguiente paso: feature/backend-integration
