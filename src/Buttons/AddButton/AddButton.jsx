import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export const AddButton = (props) => {
  const { onClick } = props;
  return (
    <Button
      shape="circle"
      size="small"
      icon={<PlusOutlined />}
      onClick={() => onClick(props)}
    />
  );
};
