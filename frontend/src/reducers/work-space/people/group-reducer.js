import {ASYNC as AsynTypes} from '../../../constants/index'
import {All_Group_Init } from '../../init/index'
const groupReducer = (state = All_Group_Init, action) => {
    let nextState = state
    switch(action.type){
        case AsynTypes.FULL_FILLED.ALL_GROUP:
            nextState = action.payload.data
            break;
        case AsynTypes.FULL_FILLED.GROUP_ADD_MEMBER:
            nextState.forEach(group => {
                if (group.id == action.payload.group.id) {
                    group.member = [...group.member, action.payload.user]
                }
            })
            break;
        case AsynTypes.FULL_FILLED.GROUP_REMOVE_MEMBER:
            nextState.forEach(group => {
                if (group.id == action.payload.groupId) {
                    group.member.forEach((user, index) => {
                        if (user.id == action.payload.removeId) {
                            group.member = [...group.member.slice(0, index), ...group.member.slice(index + 1)]
                        }
                    })
                }
            })
            break;

        case AsynTypes.FULL_FILLED.CREATE_GROUP:
            nextState = [...nextState, action.payload]
            break;

        case AsynTypes.FULL_FILLED.DELETE_GROUP:
            nextState.forEach((group, index) => {
                if (group.id == action.payload.groupId)
                    nextState = [...nextState.slice(0, index), ...nextState.slice(index+1)]
            })
            break;
        default:
            break;
    }
    return nextState;
}

export default groupReducer;