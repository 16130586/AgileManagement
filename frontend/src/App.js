import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import Navigation from './containers/NavigationContainer'
import Workplace from './containers/WorkplaceContainer'
import { connect } from 'react-redux'
import {navigateTo, clearNavigateTo} from './actions/global'

function App(props) {
  if(props.GlobalRouter.forceRedirectTo != null){
    props.history.push(props.GlobalRouter.forceRedirectTo)
    props.clearNavigateTo()
  }
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

const mapStateToProps = state => {
  return {
      GlobalRouter: state.GlobalRouter
  }
}
const mapDispatchToProps = dispatch => {
  return {
      navigateTo: (url) => dispatch(navigateTo(url)),
      clearNavigateTo : () => dispatch(clearNavigateTo())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
