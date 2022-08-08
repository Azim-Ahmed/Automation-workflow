import { BaseNode, EmptyBaseNode } from "./Base";
import { Handle, Position } from "react-flow-renderer";
import "./Style.scss";

const handleNodeClick = (props) => {
  const { data, id } = props;
  data.onNodeClickCallback(id);
};

const onCloseIconClick = (event, props) => {
  event.stopPropagation();
  const { data, id } = props;
  data.onDeleteNodeCallback(id);
};

export const Source = (props) => (
  <div className="NodeWrapper">
    <BaseNode
      {...props}
      onNodeClick={() => handleNodeClick(props)}
      onCloseIconClick={(event) => onCloseIconClick(event, props)}
    />
    <Handle type="source" position={Position.Bottom} className="NodePort" />
  </div>
);

export const Action = (props) => (
  <div className="NodeWrapper">
    <Handle type="target" position={Position.Top} className="NodePort" />
    <BaseNode
      {...props}
      onNodeClick={() => handleNodeClick(props)}
      onCloseIconClick={(event) => onCloseIconClick(event, props)}
    />
    <Handle type="source" position={Position.Bottom} className="NodePort" />
  </div>
);

export const Condition = (props) => (
  <div className="NodeWrapper">
    <Handle type="target" position={Position.Top} className="NodePort" />
    <BaseNode
      {...props}
      additionalClassName="ConditionNode"
      onNodeClick={() => handleNodeClick(props)}
      onCloseIconClick={(event) => onCloseIconClick(event, props)}
    />
    <Handle
      id="condition_0"
      type="source"
      position={Position.Bottom}
      className="NodePort"
    />
    <Handle
      id="condition_1"
      type="source"
      position={Position.Bottom}
      className="NodePort"
    />
  </div>
);

export const End = (props) => (
  <div className="NodeWrapper">
    <Handle type="target" position={Position.Top} className="NodePort" />
    <BaseNode {...props} disabled={true} />
  </div>
);

export const Empty = (props) => (
  <div className="NodeWrapper">
    <Handle
      type="target"
      position={Position.Top}
      className="NodePort"
      // style={{ opacity: 0 }}
    />
    <EmptyBaseNode {...props} disabled={true} />
    <Handle
      type="source"
      position={Position.Bottom}
      className="NodePort"
      style={{ opacity: 0 }}
    />
  </div>
);
