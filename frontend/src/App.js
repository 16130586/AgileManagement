import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import Navigation from './containers/NavigationContainer'
import Workplace from './containers/WorkplaceContainer'
import { connect } from 'react-redux'
import { navigateTo, clearNavigateTo, validateToken } from './actions/global'
import { getToken } from './common/localStorage'

function App(props) {
  useEffect(() => {
    if (props.common.forceRedirectTo != null) {
      props.history.push(props.common.forceRedirectTo)
      props.clearNavigateTo()
    }
  }, [props.common.forceRedirectTo])

  useEffect(() => {
    if (!props.common.isAppLoad) {
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX25hbWUiOiJubnQwOTAyMTk5OCIsImV4cCI6MTU5Mjc5MTczM30.Hww3JrNNCD8n66hf7Kg13tgT74T6IsxUCmdflTHV6kU'//getToken()
      if (token) {
          props.validateToken(token)
      }
    }
  }, [props.common.appLoad])
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
    common: state.Common
  }
}
const mapDispatchToProps = dispatch => {
  return {
    navigateTo: (url) => dispatch(navigateTo(url)),
    clearNavigateTo: () => dispatch(clearNavigateTo()),
    validateToken : (token) => dispatch(validateToken(token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
