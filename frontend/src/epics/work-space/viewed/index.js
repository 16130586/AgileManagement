import {of as rxjsOf} from 'rxjs';
import { mergeMap , delay , map} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../../constants/index'
import { fullFilledViewedItem } from '../../../actions/work-space/index'


let remoteData = [
    { row: 1, totalRow: 10, title: "ONE 1 ", lastTouch: "2020-05-10" , issueType : 'story'},
    { row: 2, totalRow: 10, title: "TWO 2", lastTouch: "2020-05-3" , issueType : 'story'},
    { row: 3, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , issueType : 'story'},
    { row: 4, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , issueType : 'story'},
    { row: 5, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , issueType : 'story'},
    { row: 6, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , issueType : 'story'},
    { row: 7, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , issueType : 'bug'},
    { row: 8, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , issueType : 'bug'},
    { row: 9, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , issueType : 'task'},
    { row: 10, totalRow: 10, title: "THREE 3", lastTouch: "2020-01-10" , issueType : 'test'}
]

const fakeAjax = (page, pageSize) =>
rxjsOf({
        data: remoteData.slice(page * pageSize, page * pageSize + pageSize)
    }).pipe(delay(1000))

const fetchWorkOnEpic = action$ =>
    action$.pipe(
        ofType(AsyncTypes.LOAD_MORE.MORE_VIEWED),
        mergeMap(action =>fakeAjax(action.payload.page, action.payload.pageSize)),
        map(response => fullFilledViewedItem(response.data))
    );

export default fetchWorkOnEpic