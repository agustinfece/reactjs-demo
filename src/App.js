import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import HomePage from './screens/HomePage';
import TODO from './screens/TODO';

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
