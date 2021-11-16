import React from 'react';
import './index.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import ClassRoom from './pages/Classroom/ClassRoom';
import ViewProfile from './pages/ViewProfile/ViewProfile';
import Register from './pages/Register/Register';

const App = ()=> {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/register' component= {Register}/>
          <Route path='*' component={Login}/>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
