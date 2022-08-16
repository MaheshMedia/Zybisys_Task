import { Card, Col, Image, Row, Spin } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from './Header'


export const AnimeDetails = ({ animeData, cartData }) => {

    const location = useLocation()

    const [anime, setAnime] = useState(null)

    useEffect(() => {
        let anime = animeData.filter((anime) => {
            return anime.mal_id === location.state
        })
        console.log(anime)
        setAnime(anime[0])

    }, [location])

    console.log(anime)


    return (
        <>
            {
                anime == null ? (
                    <Spin />
                ) : (
                    <div>
                        <Header cartData={cartData} />

                        <Card>
                            <Row justify='center'>
                                <Col  xl={{span:6}} xs={{span:12}}>
                                    <Image src={anime.images.jpg.large_image_url}></Image>
                                </Col>
                                <Col xl={{span:8}} xs={{span:12}}>
                                    <h2><b>{anime.title}</b></h2>
                                    <h4><b>{moment(anime.aired.from).format("DD/MM/YYYY")} to {moment(anime.aired.to).format("DD/MM/YYYY")} </b></h4>
                                    <h5>{anime.synopsis}</h5>
                                    <h4><b>Trailer: </b>{anime.trailer.embed_url}</h4>
                                    <h4><b>Episodes:</b> {anime.episodes}</h4>
                                </Col>

                            </Row>
                        </Card>

                    </div>


                )
            }

        </>)

}
