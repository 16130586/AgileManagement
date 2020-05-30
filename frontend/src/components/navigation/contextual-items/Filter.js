import React from 'react';
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import FilterListIcon from '@material-ui/icons/FilterList';


function Filter(props) {
    return (
        <Link to="/dashboard" onClick={props.onClick} className={props.className} style={{ display: "block", textDecoration: "none" }}>
            <div style={{ display: "flex", textDecoration: "none", alignItems: "center" }}>
                <FilterListIcon /> <span className="ml-2">Filter</span>
            </div>
        </Link>
    )
}

Filter.propTypes = {
    changeContext: PropTypes.func.isRequired
}
export default Filter;