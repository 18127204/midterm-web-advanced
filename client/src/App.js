import React from 'react';
import './index.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Login from './pages/Login/Login';

const App = ()=> {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='*' component={Login}/>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
