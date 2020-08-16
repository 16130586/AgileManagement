import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import OnlyIconItem from '../customize/OnlyIconItem'
function GroupMenu(props) {
    let isRender = props.items !== null && props.items !== undefined && props.items.length > 0
    let listMenuItem = null
    let menuItems = []
    console.log(props.items)
    if (isRender) {
        // menuItems = props.items.map((e, index) =>
        //     <li key={index} className="list-item cursor-pointer--hover">
        //         <OnlyIconItem className="pd-1" style={{ color: "rgb(222, 235, 255)" }}
        //             iconName={e.iconName} handleClick={() => e.handleClick(e)} />
        //     </li>
        // )
        listMenuItem = <ul className={props.className} style={props.style} >{menuItems}</ul>
        for (let i = 0; i < props.items.length; i++) {
            if (props.items[i].componentType == null || props.items[i].componentType == undefined) {
                menuItems[i] = <li key={i} className="list-item cursor-pointer--hover">
                    <OnlyIconItem className="pd-1" style={{ color: "rgb(222, 235, 255)" }}
                        iconName={props.items[i].iconName} handleClick={() => props.items[i].handleClick(props.items[i])} />
                </li>
            }
            else {
                let Element = props.items[i].componentType
                menuItems[i] = <Element />
            }
        }
    }
    return (
        <React.Fragment>
            {listMenuItem}
        </React.Fragment>
    )
}

export default function GlobalNavigation(props) {
    const topMenu = props.items.filter(e => "TOP" === e.type.toUpperCase())
    const bottomMenu = props.items.filter(e => "BOTTOM" === e.type.toUpperCase())
    return (
        <Fragment>
            <GroupMenu className="list--menu" items={topMenu} actions={props.actions} />
            <GroupMenu className="list--menu" style={{ position: "absolute", bottom: "0px" }} items={bottomMenu} actions={props.actions} />
        </Fragment>
    )
}

GlobalNavigation.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(["TOP", "BOTTOM"]),
        iconName: PropTypes.string.isRequired,
        handleClick: PropTypes.func.isRequired
    }))
}

