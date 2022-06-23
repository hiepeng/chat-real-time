import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UserAddOutlined } from "@ant-design/icons/lib/icons";
import { Button, Avatar, Tooltip, Input, Form, Alert } from "antd";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../firebase/services";
import useFirestore from "../../hooks/useFirestore";
import { storage } from "../firebase/config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

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
  font-size: 20px;
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
  font-size: 12px;
`;

const WrapperStyled = styled.div`
  height: 100vh;
  @media only screen and (max-width: 600px) {
    height: calc(100vh - 140px);
  }
`;

const TagLoad = styled.p`
  margin: auto;
  padding: 0 10px;
`;

export default function ChatWindow() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);
  const messageListRef = useRef(null);
  const imagesListRef = ref(storage, "file/");
  const [imageUrls, setImageUrls] = useState([]);
  const saveFile = (event) => {
    setFile(event.target.files[0]);
  };

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
    // console.log(linkImageURL)

    const upFile = (event) => {
      if (!inputValue && !file) {
        alert("hay nhap tin nhan");
      } else if (inputValue && !file) {
        addDocument("messages", {
          text: inputValue,
          uid,
          photoURL,
          roomId: selectedRoom.id,
          displayName,
          linkImage: "",
        });
        form.resetFields("");
        setInputValue("");

        if (inputRef?.current) {
          setTimeout(() => {
            inputRef.current.focus();
          });
        }
      } else {
        const storageRef = ref(storage, `/file/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPercent(percent);
          },
          (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setImageUrls((prev) => [...prev, url]);
              addDocument("messages", {
                text: inputValue,
                uid,
                photoURL,
                roomId: selectedRoom.id,
                displayName,
                linkImage: url,
              });
              form.resetFields("");
              setInputValue("");
              setFile(null);

              if (inputRef?.current) {
                setTimeout(() => {
                  inputRef.current.focus();
                });
              }
              console.log("3");
            });
          }
        );
        setFile(null);
        document.getElementById("idSendFile").value = "";
      }
    };

    upFile();
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

  useEffect(() => {
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <HeaderInfo className="Header__info">
              <HeaderTitle className="header__title">
                {selectedRoom.name}
              </HeaderTitle>
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
                  linkImage={mes.linkImage}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <label
                htmlFor="idSendFile"
                style={{
                  background: "linear-gradient( #bdc3c7, #2c3e50)",
                  height: "100%",
                  padding: "0px 10px",
                  marginLeft: "2px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "3px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                send file
              </label>
              <input
                style={{ display: "none" }}
                id="idSendFile"
                type="file"
                onChange={saveFile}
              />

              <TagLoad>{percent}</TagLoad>
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
