import React, { useState } from 'react'
import FeedbackIcon from '@material-ui/icons/Feedback';

let Index = function (props) {
    let [currentTab, setCurrentTab] = useState(Object.keys(props.tabs)[0])
    let TabComponent = props.tabs[currentTab]
    return (
        <div className="body">
            <div className="header">
                <div className="header__title">
                    Your work
                </div>
                <div className="header__list-btns">
                    <button className="your-work__header__list-btns__feedback">
                        <FeedbackIcon />
                        <span className="ml-1">Give feedback</span>
                    </button>
                </div>
            </div>
            <div className="content">
                <div className="tab-header">
                    <div className="tab-header_item"
                        onClick={() => setCurrentTab('0')}>
                        <span>Worked on</span>
                        {'0' === currentTab &&
                            <span className="tab-header__selected"></span>
                        }
                    </div>
                    <div className="tab-header_item"
                        onClick={() => setCurrentTab('1')}>
                        <span>Viewed</span>
                        {'1' === currentTab &&
                            <span className="tab-header__selected"></span>
                        }
                    </div>
                    <div className="tab-header_item"
                        onClick={() => setCurrentTab('2')}>
                        <span>Assigned to me
                                <span className="bubble-text ml-1">{props.totalAssignToMe}</span>
                        </span>
                        {'2' === currentTab &&
                            <span className="tab-header__selected"></span>
                        }
                    </div>
                    <div className="tab-header_item"
                        onClick={() => setCurrentTab('3')}>
                        <span>Starred</span>
                        {'3' === currentTab &&
                            <span className="tab-header__selected"></span>
                        }
                    </div>
                </div>
                <span class="tab-spliter"></span>
                <div className="tab-data">
                    {TabComponent && <TabComponent props={{ ...props }} />}
                </div>
            </div>
        </div>
    )
}
export default Index