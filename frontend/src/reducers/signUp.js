import { Auth as AuthEventTypes} from '../constants/index'
const init = {
    userName : null,
    password : null,
    confirmPassword: null,
    errorMessage : null
}
const SignUp = function (state = init, action) {
    let nextState = state;
    switch(action.type){
        case AuthEventTypes.SIGN_UP_SUCCESS:
            nextState = {userName : null , password : null , errorMessage : null};
            break;
        case AuthEventTypes.SIGN_UP_FAILED:
            nextState = {...state , errorMessage : action.payload}
            break;
    }
    return nextState
}
export default SignUp