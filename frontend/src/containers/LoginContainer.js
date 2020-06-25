import React, { Fragment, useState } from 'react';
import LoginComponent from '../components/LoginComponent'
import { connect } from 'react-redux'
import { login } from '../actions/global'
const LoginContainer = function(props){
    let [userName, setUserName] = useState(props.userName);
    let [password , setPassword] = useState(props.password);
    let dataChange = function(event){
        let key = event.target.name
        let value = event.target.value
        if('email' == key){
            setUserName(value)
        }
        if('password' == key){
            setPassword(value)
        }
    }
    return (
        <Fragment>
            <LoginComponent 
            dataChange={dataChange} 
            errorMsg= {props.errorMessage}
            userName={userName} 
            password={password}
            submit={props.login}/>
        </Fragment>
    )
}
const mapStateToProps = state => {
    return {
      errorMessage: state.Login.errorMessage,
      userName : state.Login.userName,
      password: state.Login.password
    }
  }
const mapDispatchToProps = dispatch => {
    return {
        login: (userName , password) => dispatch(login(userName , password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);