import React from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  MiniMap,
} from "react-flow-renderer";
import { nodeTypes } from "./Nodes";
import { edgeTypes } from "./Edges";
import { getLayoutedElements } from "./Utils/WorkflowLayoutUtils";
import "./Automation.css";
/*
* Author:Azim Ahmed
* email:azimaahmed36@gmail.com
*/
export const Automation = (props) => {
  const { elements } = props;
  const [layoutElements, setLayoutElements] = React.useState([]);

  React.useEffect(() => {
    setLayoutElements(getLayoutedElements(elements));
  }, [elements]);

  const layoutNodes = layoutElements.filter((x) => x.position);
  const layoutEdges = layoutElements.filter((x) => !x.position);

  return (
    <div className="AutomationCanvas">
      <ReactFlowProvider>
        <ReactFlow
          nodes={layoutNodes}
          edges={layoutEdges}
          nodesDraggable={false}
          nodesConnectable={false}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnScroll
          defaultPosition={[500, 50]}
          panOnDrag
          preventScrolling
        >
          <Controls showInteractive={false} className="Controls" />
          <MiniMap />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

const Layout = (props) => (
  <ReactFlowProvider>
    <Automation {...props} />
  </ReactFlowProvider>
);

export default Layout;
