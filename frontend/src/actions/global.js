import {Router as RouterEventTypes, Auth as AuthEventTypes } from '../constants/index'
export const navigateTo = (url) => ({type : RouterEventTypes.REDIRECT, payload: url})
export const clearNavigateTo = () => ({type : RouterEventTypes.CLEAR_REDIRECT_URL, payload: null})
export const validateToken = (token) => ({type : AuthEventTypes.VALIDATE_TOKEN , payload : token})
export const tokenValid = (user) => ({type : AuthEventTypes.TOKEN_VALID , payload : user})
export const tokenInValid = () => ({type : AuthEventTypes.TOKEN_IN_VALID , payload : null})
