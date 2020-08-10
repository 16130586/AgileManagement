import React , {useState, useEffect} from 'react'
import ProjectComponent from '../../components/workplace/Project'
import { connect } from 'react-redux'
import {deleteProject, createProject, fetchProjectGrid, searchProject} from '../../actions/project'
import {navigateTo, pageContextualNavigation} from '../../actions/global'

let sort = [
    { field: 'name', dir: 'asc' }
]
let ProjectContaner = function(props){
    let [_sort , _setSort] = useState(sort)
    useEffect(() => {
        props.getNavigation('GLOBAL', null)
    }, [])
    useState(() => {
        props.fetchMoreProjectGrid()
    }, [])

    return (
        <ProjectComponent
        data={props.data} 
        sort={_sort} 
        setSort={(newSort) => {
            _setSort(newSort)
        }}
        deleteProject={props.deleteProject}
        navigateTo = {props.navigateTo}
        createProject={props.createProject}
        searchProject={props.searchProject}
        />
    )
}

const mapStateToProps = state => {
    return {
        GlobalRouter: state.GlobalRouter,
        data : state.WorkSpace_Project.gridData
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        navigateTo: (url) => dispatch(navigateTo(url)),
        deleteProject : (id) => dispatch(deleteProject(id)),
        createProject : (payload) => dispatch(createProject(payload)),
        searchProject : (payload) => dispatch(searchProject(payload)),
        fetchMoreProjectGrid : () => dispatch(fetchProjectGrid()),
        getNavigation : (pageName, data) => dispatch(pageContextualNavigation(pageName,data))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(ProjectContaner)