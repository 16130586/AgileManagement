export const JWT_KEY = 'jwt'
export const localStorage = window.localStorage
export const saveToken = function(token){
    localStorage.setItem(JWT_KEY , token)
}
export const getToken = function(){
    return localStorage.getItem(JWT_KEY)
}
