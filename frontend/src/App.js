import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import Navigation from './containers/NavigationContainer'
import Workplace from './containers/WorkplaceContainer'
import Login from './containers/LoginContainer'
import SignUp from './containers/SignUpContainer'
import { connect } from 'react-redux'
import { navigateTo, clearNavigateTo, validateToken } from './actions/global'
import { getToken } from './common/localStorage'

function App(props) {
  let currentPath = props.history.location.pathname
  useEffect(() => {
    if (props.common.forceRedirectTo != null) {
      props.history.push(props.common.forceRedirectTo)
      props.clearNavigateTo()
    }
  }, [props.common.forceRedirectTo])

  useEffect(() => {

    if (!props.common.isAppLoad) {
      const token = getToken()
      if (token) {
        props.validateToken(token)
      } else if('/sign-up' != currentPath){
        props.navigateTo('/login')
      }
    }
  }, [props.common.appLoad])
  return (
    <div className="main">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp}/>
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
  console.log(state)
  return {
    common: state.Common,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    navigateTo: (url) => dispatch(navigateTo(url)),
    clearNavigateTo: () => dispatch(clearNavigateTo()),
    validateToken: (token) => dispatch(validateToken(token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
