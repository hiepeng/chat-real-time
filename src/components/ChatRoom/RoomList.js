import { PlusSquareOutlined } from '@ant-design/icons/lib/icons';
import { Button, Collapse, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components';


const {Panel} = Collapse;

const PanelStyled = styled(Panel)`
&&& {
    .ant-collapse-header,
    p{
        color:#19007c ;
    }
    .ant-collapse-content-box{
        padding: 0 40px;
    }
    .add-room{
        color: #19007c;
        padding: 0;
    }
}
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-Bottom: 5px;
    color: white;

`;

export default function RoomList() {
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="List Room Chat">
                <LinkStyled>Room1</LinkStyled>
                <LinkStyled>Room2</LinkStyled>
                <LinkStyled>Room3</LinkStyled>
                <Button type='text' icon={<PlusSquareOutlined />} className='add-room'>Room3</Button>
            </PanelStyled>
        </Collapse>
    )
}