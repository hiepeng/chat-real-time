import { Avatar, Button, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { auth } from '../firebase/config';

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
    return (
        <WrapperStyled>
            <div>
            <Avatar>A</Avatar>
            <Typography.Text>ABC</Typography.Text>
            </div>
            <Button ghost onClick={() =>auth.signOut() }>
                Logout
            </Button>
        </WrapperStyled>
    )
}
