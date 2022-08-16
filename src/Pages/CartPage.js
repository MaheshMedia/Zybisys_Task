import { Button, Card, Col, Image, Row, Space } from 'antd'
import React from 'react'
import { Anime } from './Anime'
import { Header } from './Header'

export const CartPage = ({ cartData, setCartData }) => {


    const removeCartItem = (id) => {
        let filteredData = cartData.filter((item) => {
            return item.mal_id !== id
        })
        setCartData(filteredData)
        localStorage.setItem("cartData", JSON.stringify(filteredData))
    }

    return (
        <div>
            <Header cartData={cartData} />
            {
                cartData.length > 0 ? (
                    cartData.map((cartItem) => {
                        return (
                            <Row justify='left'>
                                <Card >
                                    <Row justify='center' gutter={[10, 20]}>
                                        <Col span={24}><b>{cartItem.title}</b> </Col>
                                        <Col span={24}><Image src={cartItem.images.jpg.small_image_url}></Image></Col>
                                        <Col span={24}><Button type='danger' onClick={() => {
                                            removeCartItem(cartItem.mal_id)
                                        }}>Remove</Button></Col>
                                        <Col xl={{span:24}} xs={{span:12}} >
                                            <h4>{cartItem.synopsis}</h4>
                                        </Col>


                                    </Row>


                                </Card>
                            </Row>
                        )
                    })
                ) : (
                    <>No Items found</>
                )

            }
        </div>
    )
}
