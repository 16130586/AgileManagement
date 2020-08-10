import { Auth as AuthEventTypes} from '../constants/index'
const init = {
    userName : null,
    password : null,
    errorMessage : null
}
const Login = function (state = init, action) {
    let nextState = state;
    switch(action.type){
        case AuthEventTypes.LOGIN_SUCCESS:
            nextState = {userName : null , password : null , errorMessage : null};
            break;
        case AuthEventTypes.LOGIN_FAILED:
            nextState = {...state , errorMessage : "Your credentials are in-correct!"}
            break;
        default: 
            break;
    }
    return nextState
}
export default Login