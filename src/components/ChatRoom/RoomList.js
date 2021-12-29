import { PlusSquareOutlined } from "@ant-design/icons/lib/icons";
import { Button, Collapse, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: #19007c;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: #19007c;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } = React.useContext(AppContext);
  console.log({ rooms });

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="List Room Chat">
        {rooms.map((room) => (
          <LinkStyled key={room.id} onClick={() => setSelectedRoomId }>{room.name}</LinkStyled>
        ))}
        <Button
          type="text"
          icon={<PlusSquareOutlined />}
          className="add-room"
          onClick={handleAddRoom}
        >
          ADD Room
        </Button>
      </PanelStyled>
    </Collapse>
  );
}
