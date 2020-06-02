import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ViewedComponent from '../../../components/workplace/your-work/Viewed'
import { fetchViewedItem } from '../../../actions/work-space/index'
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

let ViewedContainer = function (props) {

    let {isAvaiable, data, pageSize, fetchMore} = props
    useEffect(() => {
        if(isAvaiable && data.length === 0){
                fetchMore(0 , pageSize)
        }
    }, [isAvaiable, data,pageSize,fetchMore]); // it's seemed as componentDidMount
    return (
        <ViewedComponent
            ItemLayout={props.ItemLayout}
            getItemLegend={props.getItemLegend}
            data={props.data}
            stillLoadMore={props.isAvaiable}
            fetchMore={props.fetchMore}
            isAvaiable={props.isAvaiable}
            page={props.page}
            pageSize={props.pageSize}
        />
    )
}
const mapStateToProps = state => {
    return {
        page: state.WorkSpace_YourWork_Viewed.page,
        pageSize: state.WorkSpace_YourWork_Viewed.pageSize,
        isAvaiable: state.WorkSpace_YourWork_Viewed.isAvaiable,
        data: state.WorkSpace_YourWork_Viewed.data,
        ItemLayout,
        getItemLegend

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMore: (page, pageSize) => dispatch(fetchViewedItem(page, pageSize))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewedContainer);