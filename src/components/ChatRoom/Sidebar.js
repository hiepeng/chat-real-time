import { Row, Col } from "antd";
import React from "react";
import RoomList from "./RoomList";
import UserInfo from "./UserInfo";
import styled from "styled-components";

const SidebarStyled = styled.div`
  background: #eee;
  color: white;
  height: 100vh;
  border-right: 3px solid #eee;
  @media only screen and (max-width: 600px) {
    height: 100%;
  }
`;

const Rooms = styled.div`
@media only screen and (max-width: 600px) {
  max-height: 300px;
  overflow-y: auto;
}
`;




export default function Sidebar() {
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}>
          {" "}
          <UserInfo />{" "}
        </Col>

        <Col span={24}>
          {" "}
          <Rooms>
          <RoomList />{" "}
          </Rooms>
        </Col>
      </Row>
    </SidebarStyled>
  );
}
