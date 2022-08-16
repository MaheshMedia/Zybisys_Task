import { Avatar, Button, Card, Checkbox, Col, Divider, Image, List, message, Pagination, Radio, Rate, Row, Skeleton, Space, Spin, Typography } from "antd";
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react"
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


export const Anime = ({ animeData, cartData, setCartData, setanimeData, currentPage, setCurrentPage, loading }) => {

    const addToCart = (anime) => {
        let cartData = JSON.parse(localStorage.getItem("cartData") || "[]")

        let filteredData = cartData.filter((cartItem) => {
            return cartItem.mal_id === anime.mal_id
        })
        if (filteredData.length > 0) {
            message.error("sorry item already addedd")
        }
        else {
            cartData.push(anime)
            localStorage.setItem("cartData", JSON.stringify(cartData))
            message.success("Item addedd to the cart")
            setCartData(cartData)
        }


    }

    let navigate = useNavigate();

    console.log(loading)
    return (
        <>
            <Header animeData={animeData} setanimeData={setanimeData} cartData={cartData} />
            <Row>
                <Col span={4}>
                    <Sidebar />
                </Col>
                <Col span={20}>
                    <Row gutter={[10, 10]}>

                        {

                            !loading ? (
                                animeData.map((anime) => {
                                    return <Col xl={{ span: 6 }} xs={{ span: 12 }} >

                                        <Card className="card"  >
                                            <Space direction="vertical" style={{ width: "100%" }}>
                                                <h4>{anime.title}</h4>
                                                <Image onClick={() => {
                                                    navigate(`/${anime.mal_id}`, {
                                                        state: anime.mal_id
                                                    })
                                                }} height={200} src={anime.images.jpg.image_url}></Image>                                               
                                                   <h5>{anime.rating}</h5> 
                                        

                                                <Row align="middle">
                                                    <Button type="primary" onClick={() => {
                                                        addToCart(anime)
                                                    }}>Add to Cart</Button>

                                                </Row>
                                            </Space>

                                        </Card>


                                    </Col>
                                })) : (
                                <Spin />
                            )
                        }

                    </Row>

                    <Row justify="center" align="middle">
                        <Space>
                            <Button size="large" onClick={() => {
                                setCurrentPage(currentPage - 1)
                            }}>Prev</Button>
                            <Button size="large" onClick={() => {
                                setCurrentPage(currentPage + 1)
                            }} >Next</Button>
                        </Space>

                    </Row>
                </Col>
            </Row>

        </>


    )
}


