import React , {useState, useEffect} from 'react'
import ProjectComponent from '../../components/workplace/Project'
import { connect } from 'react-redux'
import {navigateTo} from '../../actions/global'
import {deleteProject, fetchProjectGrid} from '../../actions/project'
 
let sort = [
    { field: 'name', dir: 'asc' }
]
let ProjectContaner = function(props){
    let [_sort , _setSort] = useState(sort)
    useState(() => {
        if(!props.isLoadGrid){
            props.fetchMoreProjectGrid()
        }
    }, [props.isLoadGrid])
    return (
        <ProjectComponent
        data={props.data} 
        sort={_sort} 
        setSort={(newSort) => {
            _setSort(newSort)
        }}
        deleteProject={props.deleteProject}
        navigateTo = {props.navigateTo}
        />
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        GlobalRouter: state.GlobalRouter,
        data : state.WorkSpace_Project.gridData,
        isLoadGrid : state.WorkSpace_Project.isLoadGrid
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        navigateTo: (url) => dispatch(navigateTo(url)),
        deleteProject : (id) => dispatch(deleteProject(id)),
        fetchMoreProjectGrid : () => dispatch(fetchProjectGrid())
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(ProjectContaner)