import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./signup.css"



function SignUp(){

  const [taken,settaken] = useState(false)
    const [retype,setretype] = useState(false)
    const [allf,setallf] = useState(false)
    const [wrong,setwrong] = useState(false)

    const navigate = useNavigate();
    const[userdata,setuserdata] = useState({
        username:"",
        password:"",
        reenter:"",
        email:""
})

    function HandelChange(event){
        const{name,value}= event.target
        setuserdata(prevdata=>{
            return{
                ...prevdata,
                [name]:value
            }
        })
    }



    function Handleclick(event){
        event.preventDefault();
        const pwd = userdata.password
        const uname = userdata.username
        const email = userdata.email
        const rname = userdata.reenter
        if(pwd!==rname)
        {
            setretype(true)
        }else{
                setretype(false)
                axios.post('/users', {
                    username: uname,
                    password: pwd,
                    email:email
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
                    if(statuscode===409){
                        settaken(true)
                    }else if(statuscode===400){
                        setallf(true)
                    }else{
                        setwrong(true)
                    }
                  });
        }
    }
  
    return(
      <>
      <br></br>
        <div className="signupform-container">
      <div className="inputcard-sign">
        <div className="blur-background"></div>
        <form>
          <h1 className='sign-heading'>Sign Up</h1>
          {taken ? <span className="state">username already taken</span> : null}
          <label htmlFor="title">Username:</label>
          <input 
            type="text" 
            id="sutitle" 
            name="username"
            value={userdata.username}
            onChange={HandelChange}
            required
          />

          <label htmlFor="title">Email:</label>
          <input 
            type="email" 
            id="setitle" 
            name="email"
            onChange={HandelChange}
            required
          />

          <label htmlFor="title">Password:</label>
          <input 
            type="password" 
            id="sptitle" 
            name="password"
            onChange={HandelChange}
            required
          />

          {retype ? <span className="state">Re-entred password is wrong</span> : null}

          <label htmlFor="title">Re-enter password:</label>
          <input 
            type="password" 
            id="srptitle" 
            name="reenter"
            onChange={HandelChange}
            required
          />

          {allf ? <span className="state">please fill all fields </span> : null}
          {wrong ? <span className="state">something went wrong</span> : null}

          <button onClick={Handleclick} type="submit">SignUp</button>
        </form>
        <div className='caption'>
          If you have already account?<a href='/signin'>sign in</a>
        </div>
        <br></br>
      </div>
      
    </div>
    </>
    )
}

export default SignUp;