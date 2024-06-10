import React, { useEffect, useState } from 'react'
import './header.css'
import logo from '../../assets/fefef.jpeg'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { CgProfile } from "react-icons/cg";
import burger from '../../assets/burger.png'


const Header = () => {
  const {login ,setLogin} = useContext(AppContext)
  const [linksActive,setLinksActive]=useState(false)

const logOut =(e)=>{
  // e.preventDefault();
  setLinksActive(!linksActive)
  sessionStorage.clear();
  setLogin(false);
}

  useEffect(()=>{
    if (sessionStorage.getItem("token")) {
    
      setLogin(true);
    }
  },[])
  return (
   <div className="header">
    <div className="container">
        <img src={logo} alt="" onClick={()=>setLinksActive(!linksActive)} />
        <img src={burger} className='burger' alt="" onClick={()=>setLinksActive(!linksActive)} />
        <div className={linksActive ? "links-active links" : "links"}>
<Link onClick={()=>setLinksActive(!linksActive)} to="/">Home</Link>
<Link onClick={()=>setLinksActive(!linksActive)} to="/">Contact</Link>
<Link onClick={()=>setLinksActive(!linksActive)} to="/">About Us</Link>
<Link onClick={()=>setLinksActive(!linksActive)} to="/packages">Packages</Link>
{login ? <Link onClick={()=>setLinksActive(!linksActive)} className='pro' to="/profile">  <CgProfile />
</Link>: null}
{login ? <Link  onClick={logOut} to="/login" class="btn"><i class="animation"></i>Log Out<i class="animation"></i>
    </Link>: <Link onClick={()=>setLinksActive(!linksActive)} to="/login" class="btn"><i class="animation"></i>Login<i class="animation"></i>
    </Link>}

        </div>
    </div>
   </div>
  )
}

export default Header