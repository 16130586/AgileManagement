import React, { Fragment, useState, useEffect, createRef, useRef } from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { Bar } from "react-chartjs-2"

let MyBreadCrumbs = function (props) {
    let projectId = props.project ? props.project.id : 0
    let projectCode = props.project ? props.project.code : ''
    let projectName = props.project ? props.project.name : ''
    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "1.5rem" }}>
            <Link color="inherit" href="/projects">
                Projects
            </Link>
            <Link color="inherit" href={`/project/${projectId}/settings/details`}>
                {projectCode == null ? projectName : projectCode}
            </Link>
            <Link color="inherit" href="#">
                Charts
            </Link>
            <Typography color="textPrimary">Velocity</Typography>
        </Breadcrumbs>
    )
}
let Velocity = function (props) {

    let [feedData, setFeedData] = useState(null)
    useEffect(() => {
        let labels = []
        let actualStoryPointSets = []
        let expectedStoryPointSets = []
        let backgroundColors = []
        if (props.feedData != null && props.feedData.length > 0) {
            props.feedData.forEach(data => {
                labels.push(data.sprintName)
                actualStoryPointSets.push(data.totalStoryPoint)
                expectedStoryPointSets.push(data.totalExpectStoryPoint)
                backgroundColors.push("#c45850")
            })
            setFeedData({
                labels: labels,
                backgroundColors: backgroundColors,
                actualPoints: actualStoryPointSets,
                expectedPoints: expectedStoryPointSets
            })
        }
    }, [props.feedData])
    return (
        <div className="pd-2">
            <MyBreadCrumbs project={props.project} />
            {feedData != null &&
                <div className="mt-2">
                    <Bar
                        data={{
                            labels: feedData.labels,
                            datasets: [
                                {
                                    label: "Expected story points",
                                    backgroundColor: "#c45850",
                                    data: feedData.expectedPoints
                                },
                                {
                                    label: "Actual story points",
                                    backgroundColor: "rgba(155,231,91)",
                                    data: feedData.actualPoints
                                },
                            ]
                        }}
                        options={{
                            legend: { display: false },
                            title: {
                                display: true,
                                text: "Velocity chart"
                            },
                            steps: 5
                        }}
                    />
                </div>
            }
            {
                (feedData == null || feedData.length == 0) &&
                <div className="mt-5" style={{ width: "100%", textAlign: "center" }}>
                    <Typography>Project's velocity chart only existed when you are done atleast 1 sprint </Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        className="mt-2"
                        onClick={() => props.navigateTo(`/project/${props.projectId}/backlog`)}
                    >
                        Start sprint
                    </Button>
                </div>
            }
        </div>
    )
}

export default Velocity