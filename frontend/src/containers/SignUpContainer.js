import React, { Fragment, useState } from 'react';
import SignUpComponent from '../components/SignUpComponent'
import { connect } from 'react-redux'
import { signUp } from '../actions/global'
const SignUpContainer = function (props) {
    let [userName, setUserName] = useState(props.userName);
    let [password, setPassword] = useState(props.password);
    let [confirmPassword, setConfirmPassword] = useState(props.confirmPassword)
    let dataChange = function (event) {
        let key = event.target.name
        let value = event.target.value
        if ('email' == key) {
            setUserName(value)
        }
        if ('password' == key) {
            setPassword(value)
        }
        if ('confirm-password' == key) {
            setConfirmPassword(value)
        }
    }
    return (
        <Fragment>
            <SignUpComponent
                dataChange={dataChange}
                errorMsg={props.errorMessage}
                userName={userName}
                password={password}
                confirmPassword={confirmPassword}
                submit={props.signUp} />
        </Fragment>
    )
}
const mapStateToProps = state => {
    return {
        errorMessage: state.SignUp.errorMessage,
        userName: state.SignUp.userName,
        password: state.SignUp.password,
        confirmPassword: state.SignUp.confirmPassword

    }
}
const mapDispatchToProps = dispatch => {
    return {
        signUp: (userName, password, confirmPassword) => dispatch(signUp(userName, password, confirmPassword))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);