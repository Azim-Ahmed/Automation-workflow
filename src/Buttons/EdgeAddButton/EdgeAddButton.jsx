import { AddButton } from "../AddButton/AddButton";
import { Menu, Dropdown } from "antd";
import "./EdgeAddButton.scss";

const EdgeAddButton = (props) => {
  const { style, data, id } = props;
  const content = (
    <Menu onClick={(event) => data.onAddNodeCallback({ id, type: event.key })}>
      <Menu.Item key="email">Email</Menu.Item>
      <Menu.Item key="sms">SMS</Menu.Item>
      <Menu.Item key="waitThenCheck">Rule</Menu.Item>
      <Menu.Item key="end">End</Menu.Item>
    </Menu>
  );
  return (
    <div className="EdgeAddButton" style={style}>
      <Dropdown overlay={content} trigger={["click"]}>
        <AddButton {...props} />
      </Dropdown>
    </div>
  );
};

export default EdgeAddButton;
