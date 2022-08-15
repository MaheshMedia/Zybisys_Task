import React from 'react'
import {

    ShoppingCartOutlined,
} from '@ant-design/icons';
import { Badge, Space } from 'antd';
export const Cart = ({cartData}) => {


    const handleWishList = () => {

    }

    return (
        <Space onClick={handleWishList()}>
            <ShoppingCartOutlined size={40} />
            wishList <Badge count={cartData.length}></Badge>
        </Space>)
}
