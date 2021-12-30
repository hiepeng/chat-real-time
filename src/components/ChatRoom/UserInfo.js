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
            <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
            <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
            <Typography.Text style={{fontSize:"15px", fontWeight:'bold'}} >{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() =>auth.signOut() }>
                Logout
            </Button>
        </WrapperStyled>
    )
}
