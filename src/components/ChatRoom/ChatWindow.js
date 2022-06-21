import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UserAddOutlined } from "@ant-design/icons/lib/icons";
import { Button, Avatar, Tooltip, Input, Form, Alert } from "antd";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../firebase/services";
import useFirestore from "../../hooks/useFirestore";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid pink;
  

    .Header__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: black;
    }

    .Header__title {
      margin: 300;
      font-weight: bold;
    }

    .Header__description {
      font-size: 12px;
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

const FormStyled = styled(Form)`
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

const HeaderTitle = styled.p`
      font-size:20px;
      font-weight: bold;
      margin-bottom: 0px;
      
`;

const HeaderInfo = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      color: black;
`;

const HeaderDescription = styled.span`
  font-size:12px;
`;

const WrapperStyled = styled.div`
  height: 100vh;
@media only screen and (max-width: 600px) {
  height: calc(100vh - 140px);
}
`;



export default function ChatWindow() {


  const inputRef = useRef(null);

  const messageListRef = useRef(null);
  
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);

  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState("");

  const [form] = Form.useForm();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
   
  };
  
  const handleOnSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });

   

    form.resetFields('');

    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
   
  };

  const condition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore("messages", condition);

  console.log({ messages });


  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <HeaderInfo className="Header__info">
              <HeaderTitle className="header__title">{selectedRoom.name}</HeaderTitle>
              <HeaderDescription className="header__description">
                {selectedRoom.description}
              </HeaderDescription>
            </HeaderInfo>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setIsInviteMemberVisible(true)}
              >
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
            <MessageListStyled ref={messageListRef}>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="messages">
                <Input
                  ref={inputRef}
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder="Nhập tin nhắn..."
                  bordered={false}
                  autoComplete="off"
                />
              </Form.Item>
              <Button type="primary" onClick={handleOnSubmit}>
                Gửi
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Bạn hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </WrapperStyled>
  );
}
