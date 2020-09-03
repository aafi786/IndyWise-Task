import React from 'react';
import Home from './components/Home';
import Profile from './components/Profile';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile/:id" component={Profile} />
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
