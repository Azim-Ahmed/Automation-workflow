import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
} from "react-flow-renderer";
import EdgeAddButton from "../Buttons/EdgeAddButton/EdgeAddButton";

import "./Style.scss";

const [buttonWidth, buttonHeight] = [100, 40];

export const Condition = (props) => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    arrowHeadType,
    markerEndId,
    data,
  } = props;
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const { isAddButtonHidden } = data;

  return (
    <>
      <path
        id={id}
        d={edgePath}
        markerEnd={markerEnd}
        className="react-flow__edge-path"
      />
      {isAddButtonHidden ? null : (
        <>
          <foreignObject
            width={buttonWidth}
            height={buttonHeight}
            x={edgeCenterX - buttonWidth / 2}
            y={edgeCenterY - buttonHeight / 2}
            requiredExtensions="http://www.w3.org/1999/xhtml"
          >
            <EdgeAddButton
              {...props}
              onClick={() => {}}
              style={{ width: buttonWidth, height: buttonHeight }}
            />
          </foreignObject>
        </>
      )}
    </>
  );
};
