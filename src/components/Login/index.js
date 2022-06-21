import React from "react";
import { Row, Col, Button, Typography } from "antd";
import firebase, { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { addDocument, generateKeywords } from "../firebase/services";
import styled from "styled-components";

const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();

export default function Login() {
  const navigate = useNavigate();

  const handleFbLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName),
      });
    }
  };

  auth.onAuthStateChanged((user) => {
    console.log({ user });
    if (user) {
      navigate("/");
    }
  });

  const LoginImage = styled.div`
    display: flex;
    justify-items: center;
    margin-top: 10px;
    img {
      margin: 0 auto;
    }

    @media only screen and (max-width: 600px) {
      img{
        height: auto;
        width: 100%;
        
      }
    }

  `;


  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={20}>
          <Title style={{ textAlign: "center" }} level={3}>
            Chat ở đây rất bí mật
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Login Google nhưng mà không bấm được
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFbLogin}>
            Login Facebook
          </Button>
          <LoginImage> <img src="image/login2.jpg" alt="nguoidep" /> </LoginImage>
        </Col>
      </Row>
    </div>
  );
}
