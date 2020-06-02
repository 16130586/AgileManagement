import React, { Fragment, useEffect } from 'react'
import LegenPaginationList from '../../customize/LegendPaginationList'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {fetchAssignedItem} from '../../../actions/work-space/index'

let AssignedToMe = function (props) {
    return (
        <Fragment>
            <LegenPaginationList ItemComponent={props.ItemLayout}
                getItemLegend={props.getItemLegend}
                data={props.data}
                stillLoadMore={props.isAvaiable}
                loadMoreAction={() => props.fetchMore(props.page , props.pageSize)} />
        </Fragment>
    )
}
export default AssignedToMe