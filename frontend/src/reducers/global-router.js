import {Router as RouterTypes} from '../constants/index'
const GlobalRouter = (state = {forceRedirectTo : null} , action)=>{
    console.log(action)
    let nextState = state
    switch(action.type){
        case RouterTypes.Redirect:
            nextState = {forceRedirectTo : action.payload}
            break;
        case RouterTypes.ClearRedirectUrl: 
            nextState = {forceRedirectTo : null}
            break;
    }
    return nextState
}
export default GlobalRouter