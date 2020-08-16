import React from 'react';
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import InsertChartIcon from '@material-ui/icons/InsertChart'
import ShowChartIcon from '@material-ui/icons/ShowChart'
function ChartSelections(props) {
    return (
        <ul className="contextual-navigation__items">
            <div>
                <Link
                    to={`/project/${props.data.projectId}/charts/burndown`}
                    className={"contextual-navigation__item ".concat(props.className)}
                    style={{ display: "block", textDecoration: "none" }}>
                    <div style={{ display: "flex", textDecoration: "none", alignItems: "center" }}>
                        <ShowChartIcon /> <span className="ml-2">Burndown chart</span>
                    </div>
                </Link>
                <Link
                    to={`/project/${props.data.projectId}/charts/velocity`}
                    className={"contextual-navigation__item ".concat(props.className)}
                    style={{ display: "block", textDecoration: "none" }}>
                    <div style={{ display: "flex", textDecoration: "none", alignItems: "center" }}>
                        <InsertChartIcon /> <span className="ml-2">Velocity chart</span>
                    </div>
                </Link>
            </div>
        </ul>
    )
}
ChartSelections.propTypes = {
    changeContext: PropTypes.func.isRequired
}
export default ChartSelections;