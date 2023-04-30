import {useState} from 'react';
import { useNavigate,Link} from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import './signin.css';


axios.defaults.baseURL = "https://phantomdairy-api.onrender.com";
//axios.defaults.baseURL = "http://localhost:5000";

function SignIn() {



  const [notuser,setnotuser] = useState(false)
  const [wrongpass,setwrongpass] = useState(false)
  const [wrong,setwrong] = useState(false)

  const navigate = useNavigate();
  const[typedata,settypedata] = useState({
      username:"",
      password:"",
})

function HandelChange(event){
  const{name,value}= event.target
  settypedata(prevdata=>{
      return{
          ...prevdata,
          [name]:value
      }
  })
}

function HandelClick(event){
  event.preventDefault();
  const uname = typedata.username
  const pwd = typedata.password

  axios.post('/auth',{
      username:uname,
      password:pwd,
  })
  .then((response) => {
      localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));
    
      if(response.status===201){
          navigate('/')
      }
    }, (error) => {
      console.log(error);
      const statuscode = error.response.status
      if(statuscode===404){
          setnotuser(true)
      }else if(statuscode===401){
          setwrongpass(true)
      }else{
          setwrong(true)
      }
  });

}


  return (
    // <div className="signin-container">
    //   <div className="signin-form-container">
    //     <h1 className="signin-title">Sign In</h1>
    //     <form className="signin-form">
    //       <input type="text" placeholder="Username" className="signin-input" />
    //       <input type="password" placeholder="Password" className="signin-input" />
    //       <button type="submit" className="signin-btn">Sign In</button>
    //     </form>
    //     {/* <p className="signin-forgot-password"><Link to="/forgot-password">Forgot Password?</Link></p>
    //     <p className="signin-register">Don't have an account? <Link to="/signup">Sign Up</Link></p> */}
    //   </div>
    // </div>
    <div className="sign-form-container">
      <div className="inputcard-sign">
        <div className="blur-background"></div>
        <form>
          <h1 className='sign-heading'>Sign in</h1>
          <label htmlFor="title">Username:</label>
          {notuser ? <span className='state'>username not found create new account</span>:null}
          <input 
            type="text" 
            id="utitle" 
            name="username"
            onChange={HandelChange}
            value={typedata.username}
            required
          />

          <label htmlFor="title">Password:</label>
          <input 
            type="password" 
            id="ptitle" 
            name="password"
            onChange={HandelChange}
            value={typedata.password}
            required 
          />
          {wrongpass ? <span className='state'>wrong password</span>:null}
          <button type="submit" onClick={HandelClick}>SignIn</button>
        </form>
        {wrong ? <span className='state'>somthing went wrong</span> : null}
        <div className='caption'>
          Don't have an account?<Link to='/signup' >sign up</Link>
        </div>
        <br></br>
      </div>
      
    </div>
  );
}

export default SignIn;
