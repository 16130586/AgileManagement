import React, { Fragment} from 'react'
import LegenPaginationList from '../../customize/LegendPaginationList'

let WorkOn = function (props) {
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
export default WorkOn;