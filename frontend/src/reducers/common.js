import React from 'react'
import {
    Auth as AuthEventTypes,
    ASYNC as AsyncEventTypes,
    Router as RouterTypes,
    UI as UIEventTypes
} from '../constants/index'
import { saveToken, getToken, clearToken } from '../common/localStorage'

import People from '../components/navigation/contextual-items/People';
import DashBoard from '../components/navigation/contextual-items/DashBoard';
import Filter from '../components/navigation/contextual-items/Filter';
import FilterSelections from '../components/navigation/contextual-items/FilterSelections';
import Projects from '../components/navigation/contextual-items/Project';
import YourWork from '../components/navigation/contextual-items/YourWork';

import RoadMap from '../components/navigation/contextual-items/project/RoadMap';
import Backlog from '../components/navigation/contextual-items/project/Backlog';
import Boards from '../components/navigation/contextual-items/project/Boards';
import Settings from '../components/navigation/contextual-items/project/Settings';
import WorkFlow from "../components/navigation/contextual-items/project/Workflow";

let globalNavigationItemsConfig = [YourWork, Projects, DashBoard, People, Filter]
Filter.prototype.component = FilterSelections

let projectNavigationItemsConfig = [Projects,RoadMap, Backlog, Boards, WorkFlow, Settings]

const initState = {
    isAppLoad: false,
    user: null,
    forceRedirectTo: null,
    token: getToken(),
    navItems: globalNavigationItemsConfig
}
const Common = (state = initState, action) => {
    let nextState = state
    switch (action.type) {
        case AuthEventTypes.LOGIN_SUCCESS:
            saveToken(action.payload)
            nextState = {
                ...state,
                isAppLoad: false,
                token: action.payload,
                forceRedirectTo: "/"
            }
            break;
        case AsyncEventTypes.FULL_FILLED.ABOUT_ME:
            nextState = {...nextState, user: action.payload}
            break;
        case AuthEventTypes.SIGN_UP_SUCCESS:
            nextState = { ...state, forceRedirectTo: '/login' }
            break;
        case AuthEventTypes.TOKEN_VALID:
            nextState = { ...state, user: action.payload, isAppLoad: true }
            break;
        case AuthEventTypes.TOKEN_IN_VALID:
            clearToken()
            nextState = { ...state, forceRedirectTo: '/login', isAppLoad: true }
            break;
        case AsyncEventTypes.REQUEST.CREATE_PROJECT_SUCCESS:
            nextState = { ...state, forceRedirectTo: `/project/${action.payload.id}/roadmap`, isAppLoad: true }
            break;
        case RouterTypes.REDIRECT:
            nextState = { ...state, forceRedirectTo: action.payload }
            break;
        case RouterTypes.CLEAR_REDIRECT_URL:
            nextState = { ...state, forceRedirectTo: null }
            break;

        case UIEventTypes.CHANGE_CONTEXTUAL_NAVIGATION_BAR:
            //payload as pageName, 1 or m pages use 1 contextual navigation
            switch (action.payload.pageName) {
                case 'ROADMAP':
                case 'BACKLOG':
                case 'BOARDS':
                case 'WORKFLOW':
                case 'SETTINGS':
                    let projectItemsWithData = []
                    for (let i = 0; i < projectNavigationItemsConfig.length; i++) {
                        let Item = projectNavigationItemsConfig[i]
                        let newItemWithData = (props) => <Item {...props} data={action.payload.data} />
                        projectItemsWithData.push(newItemWithData)
                    }
                    nextState = { ...state, navItems: projectItemsWithData }
                    break;
                default:
                    let globalItemsWithData = []
                    for (let i = 0; i < globalNavigationItemsConfig.length; i++) {
                        let Item = globalNavigationItemsConfig[i]
                        let newItemWithData = function (props) { return <Item {...props} data={action.payload.data} /> }
                        if (globalNavigationItemsConfig[i].prototype && globalNavigationItemsConfig[i].prototype.component)
                            newItemWithData.prototype.component = globalNavigationItemsConfig[i].prototype.component
                        globalItemsWithData.push(newItemWithData)
                    }
                    nextState = { ...state, navItems: globalItemsWithData }
                    break;
            }
    }
    console.log(action)
    console.log(nextState)
    return nextState
}
export default Common