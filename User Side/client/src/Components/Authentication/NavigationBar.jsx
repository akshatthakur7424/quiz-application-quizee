import React , { useEffect } from 'react'
import "./stylesheets/NavigationBar.css"
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {

  const navigate = useNavigate();

  useEffect(()=>{
    const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('userToken='));  // checking for token cookie in the browser
    if(tokenCookie){
      const login = document.getElementById("log-in").style;
      const signup = document.getElementById("sign-up").style;
      login.display = "none";
      signup.display = "none";
    }
    else{
      const logout = document.getElementById("log-out").style;
      logout.display = "none"
    }

  },[])


  function reloadPage() {
    window.location.reload();
  }
  // function to delete token
  const deleteToken = () => {
    document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    reloadPage();
  }



  return (
    <div className='navbar'>

    <div className="logo">
      <a><h1>Quizee</h1></a>
    </div>

    <div className="navItems">
    <ul>
        
        <button className='signup' id='sign-up' onClick={()=>navigate("/")}>Sign up</button>
       <button className='login' id='log-in' onClick={()=>navigate("/login")}>Log In</button>
       <button className='logout' id='log-out' onClick={deleteToken}>Log Out</button>
      </ul>
    </div>

      
    </div>
  )
}
