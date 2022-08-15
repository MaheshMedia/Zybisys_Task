import { Avatar, Button, Card, Checkbox, Col, Divider, Image, List, message, Pagination, Radio, Rate, Row, Skeleton, Space, Spin, Typography } from "antd";
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react"
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const Anime = () => {

    const [animeData, setanimeData] = useState([]);
    const [cartData, setCartData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const fetchData = () => {
        axios.get("https://api.jikan.moe/v4/anime?" + new URLSearchParams({
            page: currentPage
        })).then((response) => {
            console.log(response.data.data);
            setanimeData(response.data.data)
            setLoading(false)
        }).catch((error) => {

            console.log(error)

        })
    }



    const getCartData = () => {
        return JSON.parse(localStorage.getItem("cartData"))

    }

    useEffect(() => {
        fetchData();
        setCartData(getCartData)
    }, [currentPage,cartData.length]);


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


    console.log(loading)
    return (
        <>
            <Header animeData={animeData} setanimeData={setanimeData} cartData={cartData} />
            <Row>
                <Col span={4}>
                    <Sidebar />
                </Col>
                <Col span={20}>
                    <div >
                        <Row >

                            {

                                !loading ? (
                                    animeData.map((anime) => {
                                        return <Col xl={{ span: 6 }} xs={{ span: 12 }} >
                                            <Card className="card" onClick={() => {

                                            }} >
                                                <Space direction="vertical">
                                                    <h4>{anime.title}</h4>
                                                    <Image height={200} src={anime.images.jpg.image_url}></Image>

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

                        <Row>
                            <h5 onClick={() => {
                                setCurrentPage(currentPage - 1)
                            }}>prev</h5>
                            <h5 onClick={() => {
                                setCurrentPage(currentPage + 1)
                            }} >Next</h5>
                        </Row>

                    </div>
                </Col>
            </Row>

        </>


    )
}


