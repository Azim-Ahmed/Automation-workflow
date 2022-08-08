import { AddButton } from "../AddButton/AddButton";
import "./NodeAddButton.scss";

const NodeAddButton = (props) => {
  return (
    <div className="NodeAddButton">
      <AddButton {...props} />
    </div>
  );
};

export default NodeAddButton;
