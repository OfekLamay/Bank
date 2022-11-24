import React from 'react'
import Header from './Header';
import { useNavigate } from "react-router-dom";

export default function Home(props) {

  const navigate = useNavigate()

  const areDetailsValid = () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username === "ADMIN" && password === "ADMIN")
    {
      alert("Welcome admin");
      navigate("/Admin");
      return;
    }
    
    if(props.checkCredentials(username, password))
      navigate(username.replace(" ", "-"))
  }

  return (
    <div>
      <Header title={"Ofek Lamay's Bank"}/>
      <br /><br />
        <div className='flexboxContainer'>
          <input type="text" id='username' className='inputLabel' placeholder='Username' />
          <br /><br />
          <input type="password" id="password" className='inputLabel' placeholder='Password' />
          <br /><br />
          <button onClick={areDetailsValid} className='clickbtn'>Enter</button>
          <br /><br />
          <button onClick={()=>{navigate('register')}} className='smallClickbtn'>Create new user</button>
        </div>
    </div>
  )
}
