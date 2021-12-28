import { Avatar, Button, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { auth } from '../firebase/config';
import {AuthContext} from '../../Context/AuthProvider'

const WrapperStyled = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid white;
    .username{
        color: white;
        margin-left: 5px;
    }
`;

export default function UserInfo() {

  

    const {user:
    {
        displayName,
        photoURL
    }} = React.useContext(AuthContext);

    return (
        <WrapperStyled>
            <div>
            <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
            <Typography.Text>{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() =>auth.signOut() }>
                Logout
            </Button>
        </WrapperStyled>
    )
}
