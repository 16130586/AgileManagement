import React, { useState, useEffect, useRef } from "react"
import Icon from '@material-ui/core/Icon';
import { object } from "prop-types";
const DEFAULT_COLLAPSED_WIDTH = "20px"

const floatRightButtonStyle = {
    marginTop: "1.8rem",
    marginLeft: "-.9rem",
    backgroundColor: "rgb(222, 235, 255)",
    borderRadius: "50%",
    width: "1.5rem",
    height: "1.5rem",
}
function getRelatedIcon(expanded) {
    return expanded ? "keyboard_arrow_left" : "keyboard_arrow_right"
}

export default function ExpandingComponent(props) {
    const containerRef = useRef(null);
    // because of asigning className, maybe that className definded component's width
    // i only can actually get the width after it's rendering
    let [isExpanded, setExpandingState] = useState(true)
    let [isHiddenToggleButton, setIsHiddenToggleButton] = useState(true)
    let [initWidth, setInitWidth] = useState(-1)
    let [currentWidth, setCurrentWidth] = useState(-1)

    let handleToggleExpandedButton = () => {
        let newExpandedState = !isExpanded
        setExpandingState(newExpandedState)

        // because of updating current state is asyn task so i can't use value of isExpanded
        // if don't careful it will lead you to missing first UI's collapsed state
        if (newExpandedState) {
            setCurrentWidth(initWidth)
        } else {
            setCurrentWidth(DEFAULT_COLLAPSED_WIDTH)
        }
    }
    let handleMouseOver = () => {
        setIsHiddenToggleButton(!isHiddenToggleButton)
    }
    let hanleButtonOnFocus = () => {
        setIsHiddenToggleButton(false)
    }
    useEffect(() => {
        const width = containerRef.current ? containerRef.current.offsetWidth : 0;
        if (width) {
            // width is only in format /[0-9]+/
            // but style only accepts /[0-9]+/  +px
            setInitWidth(width.toString().concat('px'))
        }
    }, []);

    let children = props.children
    let buttonStyle = props.button && props.button.style
    if (buttonStyle) {
        Object.keys(buttonStyle).foreach(key => {
            if (key.startWith("margin") || key.startWith("padding")) {
                delete buttonStyle[key]
            }
        })
    }
    return (
        <React.Fragment>
            <div ref={containerRef}
                className={props.className}
                style={props.style ? { ...props.style, width: currentWidth } : { width: currentWidth }}
            >
                {children && isExpanded && children}
                <div className="inline-block"
                    style={floatRightButtonStyle}
                >
                    <Icon className={props.button && props.button.className}
                        style={buttonStyle}
                        onClick={handleToggleExpandedButton}>{getRelatedIcon(isExpanded)}</Icon>
                </div>
            </div>

        </React.Fragment>
    )
}