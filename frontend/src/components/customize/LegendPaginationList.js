import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes, { elementType, element } from 'prop-types'
let defaultOutterStyle = {
    marginTop: ".57rem",
    flex: "1 1 0 %",
    padding: ".57rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: ".215rem",
    textDecoration: "none",
    color: "rgb(23, 43, 77)"
}
let defaultTitleContainerStyle = {
    flex: " 6 1 0%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: "0px .217rem"
}
let defaultTitleStyle = {
    fontStyle: " inherit",
    color: "rgb(23, 43, 77)",
    fontWeight: 600,
    letterSpacing: "-0.003em",
    flexGrow: "1",
    fontSize: "1em",
    lineHeight: "1.42rem",
    margin: "0px"
}
let DefaultItem = function (props) {
    return (
        <Fragment>
            <Link to={props.linkTo ? props.linkTo : "#"}
                className={props.className}
                style={props.style ? props.style : defaultOutterStyle}>
                <span style={defaultTitleContainerStyle}>
                    <span style={defaultTitleStyle}>{props.title}</span>
                </span>
            </Link>
        </Fragment>
    )
}
let DefaultLoadMoreBtn = function (props) {
    return (
        <Fragment>
            <div style={{width: "100%" , textAlign: "center" , marginTop : "2rem"}}>
                <button onClick={props.onClick} className="btn">LoadMore</button>
            </div>
        </Fragment>
    )
}
let defaultLegendStyle = {
    color: "rgb(107, 119, 140) !important",
    marginTop: ".571rem !important"
}

let LegendPaginationList = function (props) {
    let getItemLegend = function (data) {
        return "NONE LEGEND"
    }
    getItemLegend = props.getItemLegend ? props.getItemLegend : getItemLegend
    let LoadMoreComponent = null
    if (props.data) {
        LoadMoreComponent = props.LoadMoreComponent || DefaultLoadMoreBtn
        let build =   props.data.map((element, index) => {
            let LegendComponent = null
            let ItemComponent = props.ItemComponent || DefaultItem
            let currentLegendTitle = getItemLegend(element) || "NONE LEGEND"
            if (index == 0) {
                LegendComponent = function(){return (<h6 style={defaultLegendStyle}>{currentLegendTitle}</h6>)}
            }
            else if (index < props.data.length) {
                let previousLegenTitle = getItemLegend(props.data[index-1]) || "NONE LEGEND"
                if (currentLegendTitle != previousLegenTitle) {
                    LegendComponent = function(){return (<h6 style={defaultLegendStyle}>{currentLegendTitle}</h6>)}
                }
                
            }
            return (
                <Fragment>
                   { LegendComponent && <LegendComponent/>}
                    <ItemComponent {...element} />
                </Fragment>
            )
        })
        return (
            <Fragment>
                {
                    build
                }
                {
                    (props.stillLoadMore && LoadMoreComponent != null)  ?  <LoadMoreComponent onClick={props.loadMoreAction || function(){console.log("No provided onclick!")}} /> : null
                }
            </Fragment>
        )
    }
    return null

}
LegendPaginationList.propTypes = {
    ItemComponent: PropTypes.elementType,
    LoadMoreComponent: PropTypes.elementType,
    loadMoreAction: PropTypes.func,
    getItemLegend: PropTypes.func,
    stillLoadMore: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default LegendPaginationList