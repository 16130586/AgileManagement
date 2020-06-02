import {of as rxjsOf , from } from 'rxjs';
import { mergeMap , delay , map} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../../../constants/index'
import { fullFilledAssignedItem, fullFilledTotalAssignToMe } from '../../../../actions/work-space/index'




let remoteData = [
    { row: 1, totalRow: 10, title: "ONE 1 ", lastTouch: "2020-05-10" , status : 1},
    { row: 2, totalRow: 10, title: "TWO 2", lastTouch: "2020-05-3" , status : 1},
    { row: 3, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , status : 1},
    { row: 4, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , status : 1},
    { row: 5, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , status : 1},
    { row: 6, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , status : 1},
    { row: 7, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , status : 0},
    { row: 8, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , status : 0},
    { row: 9, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , status : 0},
    { row: 10, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , status : 0}
]

const fakeAjax = (page, pageSize) =>
rxjsOf({
        data: remoteData.slice(page * pageSize, page * pageSize + pageSize)
    }).pipe(delay(1000))

export const fetchWorkOnEpic = action$ =>
    action$.pipe(
        ofType(AsyncTypes.LOAD_MORE.ASSIGNED_TO_ME),
        mergeMap(action =>fakeAjax(action.payload.page, action.payload.pageSize)),
        map(response => fullFilledAssignedItem(response.data))
    );


export const fetchTotalAssignToMeEpic = action$ => 
        action$.pipe(
            ofType(AsyncTypes.LOAD_MORE.TOTAL_ASSIGN_TO_ME),
            mergeMap(action =>rxjsOf({data : remoteData.length}).pipe(delay(1000))),
            map(response => fullFilledTotalAssignToMe(response.data))
        )