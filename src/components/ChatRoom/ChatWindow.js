import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UserAddOutlined } from "@ant-design/icons/lib/icons";
import { Button, Avatar, Tooltip, Input, Form } from "antd";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid pink;

  .Header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: black;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FromStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0px;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0px;
  }
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

export default function ChatWindow() {
  const { selectedRoom, members } = useContext(AppContext);

  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className="Header__info">
          <p className="header__title">{selectedRoom.name}</p>
          <span className="header__description">
            {selectedRoom.description}
          </span>
        </div>
        <ButtonGroupStyled>
          <Button type="text" icon={<UserAddOutlined />}>
            Mời
          </Button>
          <Avatar.Group size="small" maxCount={2}>
            {members.map((member) => (
              <Tooltip title={member.displayName} key={member.id}>
                <Avatar src={member.photoURL}>
                  {member.photoURL
                    ? ""
                    : member.displayName.charAt(0)?.toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>

      <ContentStyled>
        <MessageListStyled>
          <Message
            text="test"
            photoURL="null"
            displayName="Hiep"
            createdAt={213213123123}
          />
          <Message
            text="fdsafdsa"
            photoURL="null"
            displayName="Hiep"
            createdAt={213213123123}
          />
          <Message
            text="fasdfdsaf"
            photoURL="null"
            displayName="Hiep"
            createdAt={213213123123}
          />
          <Message
            text="fdsafdsafdsa"
            photoURL="null"
            displayName="Hiep"
            createdAt={213213123123}
          />
        </MessageListStyled>
        <FromStyled>
          <Form.Item>
            <Input
              placeholder="Nhập tin nhắn..."
              bordered={false}
              autoComplete="off"
            />
          </Form.Item>
          <Button>Gửi</Button>
        </FromStyled>
      </ContentStyled>
    </WrapperStyled>
  );
}
