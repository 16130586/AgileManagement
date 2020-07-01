import React, { Fragment, useState, useEffect } from 'react';
import LoginComponent from '../components/LoginComponent'
import { connect } from 'react-redux'
import { login, navigateTo } from '../actions/global'
const LoginContainer = function (props) {
    useEffect(() => {
        if (props.Common.user) { 
            navigateTo('/') 
        }
    } , [props.Common.user])
    let [userName, setUserName] = useState(props.userName);
    let [password, setPassword] = useState(props.password);
    let dataChange = function (event) {
        let key = event.target.name
        let value = event.target.value
        if ('email' == key) {
            setUserName(value)
        }
        if ('password' == key) {
            setPassword(value)
        }
    }
    return (
        <Fragment>
            <LoginComponent
                dataChange={dataChange}
                errorMsg={props.errorMessage}
                userName={userName}
                password={password}
                submit={props.login} />
        </Fragment>
    )
}
const mapStateToProps = state => {
    return {
        errorMessage: state.Login.errorMessage,
        userName: state.Login.userName,
        password: state.Login.password,
        Common : state.Common
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: (userName, password) => dispatch(login(userName, password)),
        navigateTo: (url) => dispatch(navigateTo(url))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);