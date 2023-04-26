import React from "react";
import { useNavigate } from "react-router-dom";
import "./floatingbutton.css"

// const navigate = useNavigate();


function FloatingButton() {

  const navigate = useNavigate();

  function HandelClick(){
    const tkn = localStorage.getItem("refreshToken")
    if(tkn){
      navigate('/inputcontent')
    }else{
      navigate('/signin')
    }
  }


    return (
      <button className="floating-button" onClick={HandelClick}>
        +
      </button>
    );
  }


export default FloatingButton;