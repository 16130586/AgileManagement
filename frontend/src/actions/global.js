import {Router as RouterEventTypes }from '../constants/index'
export const navigateTo = (url) => ({type : RouterEventTypes.Redirect, payload: url})
export const clearNavigateTo = () => ({type : RouterEventTypes.ClearRedirectUrl, payload: null})