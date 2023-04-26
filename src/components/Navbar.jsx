import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import avatar from '../assets/duckavatar.png'
import "./navv.css";
import axios from "axios";

var rtkn = ""

function Navbar() {


  const navigate = useNavigate();
  const[log,setlog] = useState(false)

  useEffect(()=>{
    const tkn = localStorage.getItem("refreshToken");
    if(tkn){
      rtkn=tkn.replace(/"/g,"")
      setlog(true)
      
    }else{
      setlog(false)
    }
  },[log])

  function Handlelogin(){
    navigate('/signin')
  }

  function Handlelogout(){
    axios.post('/deltoken',{
      'token':`${rtkn}`
    })
    .then((response)=>{
      if(response.status === 204){
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
        setlog(false)
        navigate('/')
      }
    },(error)=>{
      const statuscode = error.response.status
      if(statuscode===404){
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
        setlog(false)
        navigate('/')
      }else{
        console.log(error)
      }
    })

  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <a href="/">
          <img src="/favicon.svg" alt="Logo" />
          </a>
        </div>
        <div className="navbar__links">
          <h1>PHANTOM DIARY</h1>
        </div>
        <div className="navbar__avatar">

          {!log ? <button className="login-button" onClick={Handlelogin}>
            Login
          </button>:
          <button className="logout-button" onClick={Handlelogout}>
            Logout
          </button>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
