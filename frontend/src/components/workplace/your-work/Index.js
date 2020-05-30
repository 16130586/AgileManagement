import React, { useState } from 'react'
import FeedbackIcon from '@material-ui/icons/Feedback';
import WorkOnComponent from './WorkOn'
import ViewedComponent from './Viewed'
import AssignedToMeComponent from './AssignedToMe'
import StarredComponent from './Starred'

let Index = function (props) {
    let tabs = {
        "Worked on": WorkOnComponent,
        "Viewed": ViewedComponent,
        "Assigned to me": AssignedToMeComponent,
        "Starred": StarredComponent
    }
    let [currentTab, setCurrentTab] = useState(Object.keys(tabs)[0])
    let TabComponent = tabs[currentTab]
    return (
        <div className="your-work">
            <div className="your-work__header">
                <div className="your-work__header__title">
                    Your work
                </div>
                <div className="your-work__header__list-btns">
                    <button className="your-work__header__list-btns__feedback">
                        <FeedbackIcon />
                        <span className="ml-1">Give feedback</span>
                    </button>
                </div>
            </div>
            <div className="your-work__body">
                <div className="tab-header">
                    {Object.keys(tabs).map(tabName =>
                        <div className={tabName === currentTab || "tab-header_item"}
                        onClick={() => setCurrentTab(tabName)}>
                            <span>{tabName}</span>
                            {tabName === currentTab &&
                                <span className="tab-header__selected"></span>
                            }
                        </div>)}

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