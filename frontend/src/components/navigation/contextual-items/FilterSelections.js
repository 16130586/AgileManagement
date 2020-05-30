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
//<a onClick={() => props.changeContext(ABC)} href="#" style={{ display: "block" }}>Filter 3</a>
FilterSelections.propTypes = {
    changeContext : PropTypes.func.isRequired
}
export default FilterSelections;