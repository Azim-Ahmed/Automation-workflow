import dagre from "dagre";
import _ from "lodash";
import { isNode } from "react-flow-renderer";

const nodeWidth = 250;
const nodeHeight = 80;

const getLayoutedElements = (_elements) => {
  const elements = _.cloneDeep(_elements);
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB" });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, {
        width: el.width || nodeWidth,
        height: el.height || nodeHeight,
      });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = "top";
      el.sourcePosition = "bottom";
      el.position = {
        x:
          nodeWithPosition.x -
          (el.width || nodeWidth) / 2 +
          Math.random() / 1000,
        y: nodeWithPosition.y - (el.height || nodeHeight) / 2,
      };
    }
    return el;
  });
};

export { getLayoutedElements };
