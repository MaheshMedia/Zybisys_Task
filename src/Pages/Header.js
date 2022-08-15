import { Avatar, Col, Input, Row, Space } from 'antd'
import React from 'react'
import {

    ShoppingCartOutlined,
} from '@ant-design/icons';
import { Cart } from './Cart';
import logo from '../images/logo.jpg'
export const Header = ({ animeData, setanimeData,cartData }) => {


    const handleSearch = (e) => {
        if (e.target.value) {
            let filteredData = animeData.filter((anime) => {
                return anime.title.toLowerCase().includes((e.target.value).toLowerCase())
            })
            if (e.target.value === "") {
                setanimeData(animeData)
            }
            else {
                setanimeData(filteredData)

            }
        }

    }

    return (
        <div className='header'>

            <Row align='middle' justify='space-between'>
                <Col span={6} style={{display:"inline"}} >
                    <Avatar size={40} src={logo}></Avatar> <h2><b>Anime App</b></h2>
                </Col>
                <Col span={6}>
                    <Input className='searchbar' placeholder="search" onChange={(e) => {
                        handleSearch(e)
                    }}></Input>
                </Col>
                <Col span={4} offset={8} >
                    <Cart cartData={cartData}></Cart>

                </Col>
            </Row>
        </div>
    )
}
