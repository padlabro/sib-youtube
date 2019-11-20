import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Auth, Home } from './pages';
import './styles.scss';

const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Auth} />
      <Route
        path="/"
        render={() => (localStorage.getItem('token') ? <Home /> : <Redirect to="/login" />)}
      />
    </Switch>
  );
};

export default App;
