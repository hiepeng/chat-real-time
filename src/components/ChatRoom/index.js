import React from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import {Row, Col } from 'antd';

export default function ChatRoom() {
  return <div>
    <Row>
      <Col sm={6}><Sidebar /></Col>
      <Col xs={24} sm={18}><ChatWindow /></Col>
    </Row>
  </div>;
}
