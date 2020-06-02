import React, { Fragment, useEffect } from 'react'
import LegenPaginationList from '../../customize/LegendPaginationList'

let Viewed = function (props) {
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


export default Viewed