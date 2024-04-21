import React from 'react'
import './header.css'
import logo from '../../assets/fefef.jpeg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
   <div className="header">
    <div className="container">
        <img src={logo} alt="" />
        <div className="links">
<Link to="/">Home</Link>
<Link to="/login">Login</Link>
<Link to="/">Contact</Link>
<Link to="/">About Us</Link>
<Link to="/">Packages</Link>
        </div>
    </div>
   </div>
  )
}

export default Header