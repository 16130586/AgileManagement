import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'react-router-redux';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import createHistory from 'history/createBrowserHistory'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {createStore,applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import {createEpicMiddleware} from 'redux-observable';
import rootReducer from './reducers/index'
import rootEpic from './epics/index';


const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer , applyMiddleware(epicMiddleware))
epicMiddleware.run(rootEpic);
let history = createHistory()
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
