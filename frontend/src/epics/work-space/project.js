import { of as rxjsOf } from 'rxjs';
import { mergeMap, delay, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../constants/index'
import { fullFilledDeleteProject, fullFilledProjectGrid } from '../../actions/project'
let remoteData = [{
    "id": 1,
    "name": "name 1",
    "key": "ABCDF",
    "lead": "That dep chai",
    "projectIconUrl": "https://realng.atlassian.net/secure/projectavatar?pid=10009&avatarId=10404",
    "ProductID": 1,
    "ProductName": "Chai",
    "SupplierID": 1,
    "CategoryID": 1,
    "QuantityPerUnit": "10 boxes x 20 bags",
    "UnitPrice": 18.0000,
    "UnitsInStock": 39,
    "UnitsOnOrder": 0,
    "ReorderLevel": 10,
    "Discontinued": false,
    "Category": {
        "CategoryID": 1,
        "CategoryName": "Beverages",
        "Description": "Soft drinks, coffees, teas, beers, and ales"
    }
}, {
    "id": 2,
    "name": "name 2",
    "key": "DASDX",
    "lead": "OMG HEas",
    "projectIconUrl": "https://realng.atlassian.net/secure/projectavatar?pid=10015&avatarId=10415",
    "ProductID": 2,
    "ProductName": "Chang",
    "SupplierID": 1,
    "CategoryID": 1,
    "QuantityPerUnit": "24 - 12 oz bottles",
    "UnitPrice": 19.0000,
    "UnitsInStock": 17,
    "UnitsOnOrder": 40,
    "ReorderLevel": 25,
    "Discontinued": false,
    "Category": {
        "CategoryID": 1,
        "CategoryName": "Beverages",
        "Description": "Soft drinks, coffees, teas, beers, and ales"
    }
}]
const projectGridFakeAjax = () =>
    rxjsOf({
        data: remoteData
    }).pipe(delay(1000))
const delelteProjectFakeAjax = (id) =>
    rxjsOf({
        data: id
    }).pipe(delay(1000))

export const fetchProjects = action$ =>
    action$.pipe(
        ofType(AsyncTypes.LOAD_MORE.PROJECT_GRID),
        mergeMap(action => projectGridFakeAjax()),
        map(response => fullFilledProjectGrid(response.data))
    );
export const deleteProject = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.DELETE_PROJECT),
        mergeMap(action => delelteProjectFakeAjax(action.payload)),
        map(response => fullFilledDeleteProject(response.data))
    ); 