import { Row, Col } from "antd";
import React from "react";
import RoomList from "./RoomList";
import UserInfo from "./UserInfo";
import styled from "styled-components";

const SidebarStyled = styled.div`
  background: pink;
  color: white;
  height: 100vh;
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
          <RoomList />{" "}
        </Col>

      </Row>
    </SidebarStyled>
  );
}
