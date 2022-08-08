import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { getIncomers, getOutgoers } from "react-flow-renderer";

const position = { x: 0, y: 0 };

const getTitleAndDescription = (type) => {
  switch (type) {
    case "email":
      return { title: "Email", description: "Send email to contacts." };
    case "sms":
      return { title: "Sms", description: "Send sms to contacts." };
    case "waitThenCheck":
      return { title: "New Rule", description: "Check behaviour of the Rule" };
    case "end":
      return { title: "End", description: "Process ends" };
    default:
      return null;
  }
};

const getUpdatedElementsAfterActionNodeAddition = ({
  elements,
  newNodeId,
  targetNodeId,
  onAddNodeCallback,
}) => {
  const clonedElements = _.cloneDeep(elements);
  const newEdge = {
    id: uuidv4(),
    source: newNodeId,
    target: targetNodeId,
    type: "condition",
    data: { onAddNodeCallback },
  };
  clonedElements.push(newEdge);
  return clonedElements;
};

const getUpdatedElementsAfterEndNodeAddition = () => {};

const getUpdatedElementsAfterRuleNodeAdditon = ({
  elements,
  newNodeId,
  targetNodeId,
  onAddNodeCallback,
}) => {
  const clonedElements = _.cloneDeep(elements);
  const emptyNode1Id = uuidv4();
  const emptyNode2Id = uuidv4();
  const mergeNodeId = uuidv4();
  const emptyNode1 = {
    id: emptyNode1Id,
    type: "empty",
    data: {},
    position,
    height: 6,
    // width: 40,
  };
  const emptyNode2 = {
    id: emptyNode2Id,
    type: "empty",
    data: {},
    position,
    height: 6,
    // width: 40,
  };
  const mergeNode = {
    id: mergeNodeId,
    type: "empty",
    data: {},
    position,
    height: 6,
  };
  const ruleNodeToEmptyNodeEdge1 = {
    id: uuidv4(),
    source: newNodeId,
    target: emptyNode1Id,
    type: "condition",
    // animated: true,
    data: { onAddNodeCallback },
  };
  const emptyNode1ToMergeNodeEdge = {
    id: uuidv4(),
    source: emptyNode1Id,
    target: mergeNodeId,
    type: "condition",
    // animated: true,
    data: { onAddNodeCallback, isAddButtonHidden: true },
  };
  const ruleNodeToEmptyNodeEdge2 = {
    id: uuidv4(),
    source: newNodeId,
    target: emptyNode2Id,
    type: "condition",
    // animated: true,

    data: { onAddNodeCallback },
  };
  const emptyNode2ToMergeNodeEdge = {
    id: uuidv4(),
    source: emptyNode2Id,
    target: mergeNodeId,
    type: "condition",
    // animated: true,
    data: { onAddNodeCallback, isAddButtonHidden: true },
  };
  const mergeNodeEdge = {
    id: uuidv4(),
    source: mergeNodeId,
    target: targetNodeId,
    type: "condition",
    data: { onAddNodeCallback },
    mergeNodeOfParentId: newNodeId,
  };
  clonedElements.push(
    ...[
      emptyNode1,
      emptyNode2,
      ruleNodeToEmptyNodeEdge1,
      emptyNode1ToMergeNodeEdge,
      ruleNodeToEmptyNodeEdge2,
      emptyNode2ToMergeNodeEdge,
      mergeNode,
      mergeNodeEdge,
    ]
  );
  console.error({ clonedElements });
  return clonedElements;
};

const getUpdatedElementsAfterNodeAddition = ({
  elements,
  targetEdgeId,
  type,
  onDeleteNodeCallback,
  onNodeClickCallback,
  onAddNodeCallback,
}) => {
  const newNodeId = uuidv4();
  const { title, description } = getTitleAndDescription(type);
  const newNode = {
    id: newNodeId,
    type,
    data: {
      title,
      description,
      onNodeClickCallback,
      onDeleteNodeCallback,
    },
    position,
  };
  const clonedElements = _.cloneDeep(elements);
  const targetEdgeIndex = clonedElements.findIndex(
    (x) => x.id === targetEdgeId
  );
  const targetEdge = elements[targetEdgeIndex];
  const { target: targetNodeId } = targetEdge;
  const updatedTargetEdge = { ...targetEdge, target: newNodeId };
  clonedElements[targetEdgeIndex] = updatedTargetEdge;
  clonedElements.push(newNode);

  switch (type) {
    case "end":
      return getUpdatedElementsAfterEndNodeAddition();
    case "waitThenCheck":
      return getUpdatedElementsAfterRuleNodeAdditon({
        elements: clonedElements,
        newNodeId,
        targetNodeId,
        onAddNodeCallback,
      });
    default:
      return getUpdatedElementsAfterActionNodeAddition({
        elements: clonedElements,
        newNodeId,
        newNode,
        targetNodeId,
        onAddNodeCallback,
      });
  }
};

export { getUpdatedElementsAfterNodeAddition };
