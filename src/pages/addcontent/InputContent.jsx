import {useState} from "react";
import Navbar from "../../components/Navbar"
import "./inputcontent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function InputContent() {

  const navigate = useNavigate();

  const[contentdata,setcontentdata] = useState({
    title:"",
    content:"",
  })
  
  
  function HandelChange(event){
    const{name,value}= event.target
    setcontentdata(prevdata=>{
        return{
            ...prevdata,
            [name]:value
        }
    })
  }

  function Handleclick(event){
    event.preventDefault();
    const title = contentdata.title
    const content = contentdata.content

    let accessToken = localStorage.getItem("accessToken")//.replace(/"/g,"");
    let refreshToken = localStorage.getItem("refreshToken")//.replace(/"/g,"");

    if(accessToken){
      accessToken = accessToken.replace(/"/g,"")
    }else{
      navigate('/signin')
    }

    if(refreshToken){
      refreshToken = refreshToken.replace(/"/g,"")
    }else{
      navigate('/signin')
    }

    
            axios.post('/content', {
                title: title,
                content: content
              }, { headers: {
                'Authorization': `Bearer ${accessToken}` 
              }})
              .then((response) => {
                if(response.status===201){
                    navigate('/')
                }
              }, (error) => {
                const statuscode = error.response.status
                if(statuscode===403){
                  axios.post('/token',{
                    'token':`${refreshToken}`
                  })
                  .then((response)=>{
                    localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
                    const actkn = response.data.accessToken
                    if(response.status===201){
                        axios.post('/content',{
                          title:title,
                          content:content
                        },{
                          headers:{
                            'Authorization': `Bearer ${actkn}`
                          }
                        })
                        .then((response)=>{
                          if(response.status===201){
                            navigate('/')
                          }
                        },(error)=>{
                          console.log(error)
                        })
                    }
                    },(error) => {
                      const statuscode = error.response.status
                      if(statuscode == 400){
                        navigate('/signin')
                      }
                      console.log(error)
                      })
                  }else{
                    console.log(error)
                  }
              });
    
}

  return (
    <>
    <Navbar/>
    <div className="form-container">
      <div className="inputcard">
        <div className="blur-background"></div>
        <form>
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title"
            onChange={HandelChange}
            value={contentdata.title}
            required
          />

          <label htmlFor="content">Content</label>
          <textarea 
            id="content" 
            name="content" 
            rows={7} 
            onChange={HandelChange}
            value={contentdata.content}
            required
          ></textarea>

          <button type="submit" onClick={Handleclick}>Submit</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default InputContent;
