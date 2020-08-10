import React from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import "../../../App.css"

function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram =
        $(go.Diagram,
            {
                'undoManager.isEnabled': true,  // must be set to allow for model change listening
                // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                // 'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
                model: $(go.GraphLinksModel,
                    {
                        linkKeyProperty: 'key',  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                        // positive keys for nodes
                        makeUniqueKeyFunction: (m, data) => {
                            let k = data.key || 1;
                            while (m.findNodeDataForKey(k)) k++;
                            data.key = k;
                            return k;
                        },
                        // negative keys for links
                        makeUniqueLinkKeyFunction: (m, data) => {
                            let k = data.key || -1;
                            while (m.findLinkDataForKey(k)) k--;
                            data.key = k;
                            return k;
                        }
                    })
            });

    // define a simple Node template
    diagram.nodeTemplate =
        $(go.Node, 'Auto',  // the Shape will go around the TextBlock
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, 'RoundedRectangle',
                { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
                // Shape.fill is bound to Node.data.color
                new go.Binding('fill', 'color')),
            $(go.TextBlock,
                { margin: 8, editable: true },  // some room around the text
                new go.Binding('text').makeTwoWay()
            ),
        );

    return diagram;
}

function WorkFlowChart(props) {
    const nodeDataArray = props.workFlow.nodeDataArray;
    const linkDataArray = props.workFlow.linkDataArray;

    const updateWorkFlowItem = {
        workFlowId: props.workFlow.id,
        data: null
    }

    function handleModelChange(changes) {
        console.log(changes)
        if ( changes.removedNodeKeys != undefined && changes.removedNodeKeys.length == 1 && changes.modifiedNodeData == undefined) {
            if (changes.removedLinkKeys != undefined) {
                props.removeWorkFlowLink(props.workFlow.id, changes.removedLinkKeys)
            }
            props.removeWorkFlowItem(props.workFlow.id, changes.removedNodeKeys[0])
        } else if (changes.removedLinkKeys != undefined && changes.removedLinkKeys.length == 1 && changes.modifiedNodeData == undefined) {
            props.removeWorkFlowLink(props.workFlow.id, changes.removedLinkKeys)
        } else if ( changes.modifiedNodeData != undefined && changes.modifiedNodeData.length == 1) {
            updateWorkFlowItem.data = changes.modifiedNodeData[0]
            props.updateWorkFlowItem(updateWorkFlowItem);
        }
        props.updateDiagram(props.workFlow);
    }

    return (
        <div style={{height: "100%"}}>
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName='diagram-component'
                nodeDataArray={nodeDataArray}
                linkDataArray={linkDataArray}
                onModelChange={handleModelChange}
            />
        </div>
    );
}

export default WorkFlowChart;