import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'antd/dist/antd.css';
import { Anime } from './Pages/Anime';
import { AnimeDetails } from './Pages/AnimeDetails';
import axios from 'axios';
import { useEffect, useState } from "react"
import { Row, Spin } from 'antd';
import { CartPage } from './Pages/CartPage';

function App() {
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
  }, [currentPage, cartData.length]);


  return (
    <>
      {loading ? (<Row justify='center'>  <Spin /></Row>) : (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Anime animeData={animeData} cartData={cartData} setCartData={setCartData} setanimeData={setanimeData} currentPage={currentPage} setCurrentPage={setCurrentPage} loading={loading} />} />
            <Route exact path="/:animeId" element={<AnimeDetails animeData={animeData} cartData={cartData} />} />
            <Route exact path="/cart" element={<CartPage cartData={cartData} setCartData={setCartData} />} />
          </Routes>
        </BrowserRouter>

      )}
    </>


  );
}

export default App;
