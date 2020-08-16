import React from 'react';
import PropTypes from 'prop-types'
function FilterSelections(props) {
    return (
        <div>
            <a href="#" style={{ display: "block" }}>Filter 1</a>
            <a href="#" style={{ display: "block" }}>Filter 2</a>
        </div>
    )
}
FilterSelections.propTypes = {
    changeContext : PropTypes.func.isRequired
}
export default FilterSelections;