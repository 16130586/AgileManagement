import {of as rxjsOf , from } from 'rxjs';
import { mergeMap , delay , map} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../../../constants/index'
import {fullFilledAllGroup} from '../../../../actions/work-space/index'

// Data test
function createData(name) {
    return {
        name,
        member: [
            { id: 1, nickName: 'Halo', email: 'abc@gmail.com'},
            { id: 2, nickName: 'Cakkun', email: 'xxx@gmail.com'}
        ]
    };
}

const fakeListGroup = [
    createData("group1"),
    createData("group2"),
    createData("group3"),
    createData("group4")
]
//

export const fetchGroup = action$ =>
    action$.pipe(
        ofType(AsyncTypes.LOAD_MORE.ALL_GROUP),
        mergeMap(action => {
            return rxjsOf({data: fakeListGroup})
        }),
        map(response => fullFilledAllGroup(response.data))
    );

