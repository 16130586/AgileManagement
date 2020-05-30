import React, { Fragment, useEffect } from 'react'
import LegenPaginationList from '../../customize/LegendPaginationList'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {fetchViewedItem} from '../../../actions/work-space/index'
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
    return data != null ? data.issueType : null
}

let Viewed = function (props) {
    useEffect(() => {
        if(props.isAvaiable){
            props.fetchMore(0 , props.pageSize)      
        }    
    } , []); // it's seemed as componentDidMount
    return (
        <Fragment>
            <LegenPaginationList ItemComponent={ItemLayout}
                getItemLegend={getItemLegend}
                data={props.data}
                stillLoadMore={props.isAvaiable}
                loadMoreAction={() => props.fetchMore(props.page , props.pageSize)} />
        </Fragment>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
      page: state.WorkSpace_Viewed.page,
      pageSize : state.WorkSpace_Viewed.pageSize,
      isAvaiable : state.WorkSpace_Viewed.isAvaiable,
      data : state.WorkSpace_Viewed.data
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        fetchMore : (page,pageSize) => dispatch(fetchViewedItem(page, pageSize))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Viewed);