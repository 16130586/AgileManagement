import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {fetchAssignedItem} from '../../../actions/work-space/index'
import AssignToMeComponent  from '../../../components/workplace/your-work/AssignedToMe'

let ItemLayout = function (props) {
    return (
        <Fragment>
            <Link to={props.linkTo}
                className="work-on-item-container"
            >
                <div>
                    <img class="work-on-item_img" src="https://realng.atlassian.net/secure/viewavatar?size=medium&avatarId=10315&avatarType=issuetype"></img>
                </div>
                <span class="work-on-item_info">
                    <span>A40</span>
                    <small className="work-on-item_project">
                        <span>item name</span>
                        <span style={{ margin: "0px 8px" }}>·</span>
                        <span>Project name</span>
                    </small>
                </span>
                <span class="work-on-item_action">Created</span>
                <div className="work-on-item_author">
                    <div className="work-on-item_author_avatar-container">
                        <div className="work-on-item_author_avatar_img " style={{ backgroundImage: "url(https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg)" }}>
                        </div>
                    </div>
                </div>
            </Link>
        </Fragment>
    )
}

let getItemLegend = function (data) {
    let ret = null
    if(data.status == null) return ret;
    switch(data.status){
        case 0:
            ret = 'TO DO'
            break;
        case 1:
            ret = 'IN PROGRESS'
            break;
    }
    return ret
}
let AssignedToMeContainer = function (props) {
    let {isAvaiable, data, pageSize, fetchMore} = props
    useEffect(() => {
        if(isAvaiable && data.length === 0){
                fetchMore(0 , pageSize)
        }
    }, [isAvaiable, data,pageSize,fetchMore]); // it's seemed as componentDidMount
    return (
        <AssignToMeComponent
            ItemLayout = {props.ItemLayout}
            getItemLegend={props.getItemLegend}
            isAvaiable = {props.isAvaiable}
            fetchMore = {props.fetchMore}
            page ={props.page}
            pageSize = {props.pageSize}
            data = {props.data}
        />
    )
}
const mapStateToProps = state => {
    return {
      page: state.WorkSpace_YourWork_AssignToMe.page,
      pageSize : state.WorkSpace_YourWork_AssignToMe.pageSize,
      isAvaiable : state.WorkSpace_YourWork_AssignToMe.isAvaiable,
      data : state.WorkSpace_YourWork_AssignToMe.data,
      ItemLayout,
      getItemLegend
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        fetchMore : (page,pageSize) => dispatch(fetchAssignedItem(page, pageSize))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AssignedToMeContainer);