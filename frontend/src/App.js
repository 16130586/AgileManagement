import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './containers/NavigationContainer'
import Workplace from './containers/WorkplaceContainer'
function App() {
  return (
    <div className="main">
      <Switch>
        <Route path="/">
          <Fragment>
            <Navigation className="main-navigation" />
            <Workplace className="main-workplace" />
          </Fragment>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
