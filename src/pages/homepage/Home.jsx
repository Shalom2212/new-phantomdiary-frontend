import './spinner.css'
import Navbar from '../../components/Navbar'
import Cards from './Cards'
import FloatingButton from './FloatingButton'
import axios from 'axios';
import {useEffect,useState } from 'react';
import React from 'react';

// const url = "http://localhost:5000/content";

function Home(){

    const[allContent,setContent] = useState([])
    const [loading, setLoading] = useState(false);
    const getDomainInfo = async () => {
        try {
            setLoading(true); // Set loading before sending API request
            const res = await axios.get('/content');
            setContent(res.data); // Response received
            setLoading(false); // Stop loading
        } catch (error) {
            setLoading(false); // Stop loading in case of error
            console.error(error);
        }
    };

    useEffect(()=>{
        getDomainInfo()
      },[])

    const cards = allContent.map((item)=>{
        return(
          <Cards
            key = {item._id}
            item = {item}
          />
          
        )
      })

    return(
        <>
            <Navbar/>
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
             ):(
            <div>
                {cards}
            </div>
            )}
            <FloatingButton/>
        </>
    )
}

export default Home;