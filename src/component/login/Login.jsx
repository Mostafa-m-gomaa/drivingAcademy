import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import loginImg from "../../assets/login.png";
import logoImg from "../../assets/theLogo.png";
import "react-toastify/dist/ReactToastify.css";
import submit from "../../assets/submit.png";
import shape from "../../assets/undraw_electric_car_b7hl.png";

const Login = () => {
  const history = useNavigate();
  const { route ,setLoader ,setLogin ,login} = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
 
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [signPasswordConfirm, setSignPasswordConfirm] = useState("");
  const [signName, setSignName] = useState("");
  const [country, setCountry] = useState("");

  // useEffect(() => {
  //   const handleOnlineStatusChange = () => {
  //     setIsOnline(navigator.onLine);
  //   };

  //   window.addEventListener('online', handleOnlineStatusChange);
  //   window.addEventListener('offline', handleOnlineStatusChange);

  //   return () => {
  //     window.removeEventListener('online', handleOnlineStatusChange);
  //     window.removeEventListener('offline', handleOnlineStatusChange);
  //   };
  // }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoader(true)
  
    
    try {
      const response = await fetch(`${route}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:email ,password:password}),
      })
      .then(res=>res.json())
      console.log(response)
       setLoader(false)
      if (response.token) {
        sessionStorage.setItem("login",true)
        sessionStorage.setItem("token",response.token)
        sessionStorage.setItem("userName",response.data.name)
        sessionStorage.setItem("id",response.data.id)
        sessionStorage.setItem("email",response.data.email)
      
        history("/")
        setLogin(true)
      } 

      
      else {
     toast.error(response.message)
       }
    } catch (error) {
      console.error("dd");
    
    }
  };
  const handleSign = async (event) => {
    event.preventDefault();
    setLoader(true)
  
    
    try {
      const response = await fetch(`${route}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:signEmail ,password:signPassword,name:signName,country:country , passwordConfirm:signPasswordConfirm }),
      })
      .then(res=>res.json())
      console.log(response)
       setLoader(false)
      if (response.token) {
  
  toast.success("Account created successfully Please login to continue")    
  
      } 

      
      else {
     toast.error(response.error)
       }
    } catch (error) {
      console.error("dd");
    
    }
  };

  useEffect(()=>{
    if (sessionStorage.getItem("token")) {
   history("/")
   toast.error("please logout first")
    }
  },[])

  return (
    <div className="login">
 <div className="container">
<div className="left">
<div className="wrapper">
        <div className="card-switch">
            <label className="switch">
               <input type="checkbox" className="toggle" />
               <span className="slider"></span>
               <span className="card-side"></span>
               <div className="flip-card__inner">
                  <div className="flip-card__front">
                     <div className="title">Log in</div>
                     <form className="flip-card__form" onSubmit={handleLogin} >
                        <input className="flip-card__input" name="email" placeholder="Email" type="email" onChange={(e)=>setEmail(e.target.value)} />
                        <input className="flip-card__input" name="password" placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
                        <button className="flip-card__btn">Let`s go!</button>
                     </form>
                  </div>
                  <div className="flip-card__back">
                     <div className="title">Sign up</div>
                     <form className="flip-card__form" onSubmit={handleSign} >
                        <input className="flip-card__input" placeholder="Name" onChange={(e)=>setSignName(e.target.value)} type="name" />
                        <input className="flip-card__input" name="email" placeholder="Email" onChange={(e)=>setSignEmail(e.target.value)} type="email" />
                        <input className="flip-card__input" name="password" placeholder="Password" onChange={(e)=>setSignPassword(e.target.value)} type="password" />
                        <input className="flip-card__input" name="password" placeholder="Confirm Password" onChange={(e)=>setSignPasswordConfirm(e.target.value)} type="password" />
                        <input className="flip-card__input" name="Country" placeholder="Country" type="text" onChange={(e)=>setCountry(e.target.value)} />
                        <button className="flip-card__btn">Confirm!</button>
                     </form>
                  </div>
               </div>
            </label>
        </div>   
   </div>
</div>
   <div className="another">
 <h1 data-aos="zoom-in-left"
   data-aos-duration="1500"
 >welcome at theoriee</h1>
   </div>
 </div>
    </div>
  );
};

export default Login;
