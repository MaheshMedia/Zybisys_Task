import React from 'react'
import {

    ShoppingCartOutlined,
} from '@ant-design/icons';
import { Badge, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
export const Cart = ({ cartData }) => {
    const navigate = useNavigate()

    return (
        <Space style={{cursor:"pointer"}} onClick={() => { navigate("/cart") }}>
            <ShoppingCartOutlined size={40} />
            wishList <Badge count={cartData.length}></Badge>
        </Space>)
}
