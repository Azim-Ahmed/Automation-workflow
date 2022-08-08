import React from "react";
import _ from "lodash";
import Layout from "./Automation";
import { getIncomers, getOutgoers } from "react-flow-renderer";
import { initialElements } from "./Data/Elements1";
import { getUpdatedElementsAfterNodeAddition } from "./Utils/WorkflowElementUtils";
import "antd/dist/antd.css";
import "./index.scss";

const App = () => {
  const [elements, setElements] = React.useState([]);

  const onAddNodeCallback = ({ id, type }) => {
    setElements((elements) =>
      getUpdatedElementsAfterNodeAddition({
        elements,
        targetEdgeId: id,
        type,
        onDeleteNodeCallback,
        onNodeClickCallback,
        onAddNodeCallback,
      })
    );
  };

  const onDeleteNodeCallback = (id) => {
    setElements((elements) => {
      const clonedElements = _.cloneDeep(elements);
      const incomingEdges = clonedElements.filter((x) => x.target === id);
      const outgoingEdges = clonedElements.filter((x) => x.source === id);
      const updatedIncomingEdges = incomingEdges.map((x) => ({
        ...x,
        target: outgoingEdges[0].target,
      }));
      const filteredElements = clonedElements.filter(
        (x) =>
          x.id !== id &&
          x.target !== incomingEdges[0].target &&
          x.source !== outgoingEdges[0].source
      );
      filteredElements.push(...updatedIncomingEdges);
      return filteredElements;
    });
  };

  const onNodeClickCallback = (id) => {
    setElements((elements) => {
      const currentNode = elements.find((x) => x.id === id);
      const nodes = elements.filter((x) => x.position);
      const edges = elements.filter((x) => !x.position);
      console.error({
        incomers: getIncomers(currentNode, nodes, edges),
        outgoers: getOutgoers(currentNode, nodes, edges),
      });
      return elements;
    });
    alert(`You clicked the "${id}" node`);
  };

  React.useEffect(() => {
    const nodes = initialElements
      .filter((x) => !x.target)
      .map((x) => ({
        ...x,
        data: { ...x.data, onDeleteNodeCallback, onNodeClickCallback },
      }));
    const edges = initialElements
      .filter((x) => x.target)
      .map((x) => ({ ...x, data: { ...x.data, onAddNodeCallback } }));
    setElements([...nodes, ...edges]);
  }, []);

  return (
    <div className="App">
      <Layout elements={elements} />
    </div>
  );
};

export default App;
