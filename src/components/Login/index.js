import React from 'react';
import {Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom'

const {Title} = Typography

const fbProvider = new firebase.auth.FacebookAuthProvider();

export default function Login() {

    const navigate = useNavigate();

    const handleFbLogin = async () =>{
        const data = await auth.signInWithPopup(fbProvider);
        console.log({data});
    };
    
    auth.onAuthStateChanged((user) => {
        console.log({ user });
        if(user) {
            navigate('/')
        }
    });

    return (
        <div>
            <Row justify='center' style={{height: 800}}>
                <Col span ={8}>
                <Title style={{textAlign:'center'}} level={3}>
                    Chat Internal
                </Title>
                <Button style={{width:'100%', marginBottom: 5}}>
                    Login Google
                </Button>
                <Button style={{width:'100%'}} onClick={handleFbLogin}>
                    Login Facebook
                </Button>
                </Col>

            </Row>
            
        </div>
    )
}