import React, { useEffect, useState } from 'react'
import './header.css'
import logo from '../../assets/fefef.jpeg'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { CgProfile } from "react-icons/cg";
import burger from '../../assets/burger.png'
import { useTranslation } from 'react-i18next';


const Header = () => {
  const {login ,setLogin ,setLang , lang} = useContext(AppContext)
  const [linksActive,setLinksActive]=useState(false)
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };



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
<Link onClick={()=>setLinksActive(!linksActive)} to="/">{t('home')}</Link>
<Link onClick={()=>setLinksActive(!linksActive)} to="/contact">{t('contact')}</Link>
<Link onClick={()=>setLinksActive(!linksActive)} to="/appoint">{t('appointment')}</Link>
<Link onClick={()=>setLinksActive(!linksActive)} to="/packages">{t('packages')}</Link>
{/* <select name="" id="" onChange={(e)=>{
  setLang(e.target.value) ,
  sessionStorage.setItem("lang" , e.target.value)
}}>
  <option value="">Change Lang</option>
  <option value="en">English</option>
  <option value="ar">Arabic</option>
  <option value="hol">Dutch</option>
</select> */}
<div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {lang === "ar" ? "Arabic" : null}
        {lang === "en" ? "English" : null}
        {lang === "hol" ? "Dutch" : null}
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu" style={{
          listStyle : "none"
        }}>
          <li className="dropdown-item" onClick={(e)=>{
  setLang("en") ,
  sessionStorage.setItem("lang" ,"en") ,
  setIsOpen(!isOpen)
}}>English</li>
          <li className="dropdown-item" onClick={(e)=>{
  setLang("ar") ,
  sessionStorage.setItem("lang" , "ar") ,
  setIsOpen(!isOpen)
}}>Arabic</li>
          <li className="dropdown-item"
          onClick={(e)=>{
            setLang("hol") ,
            sessionStorage.setItem("lang" , "hol") ,
            setIsOpen(!isOpen)
          }}
          >Dutch</li>
      
        </ul>
      )}
    </div>


{login ? <Link onClick={()=>setLinksActive(!linksActive)} className='pro' to="/profile">  <CgProfile />
</Link>: null}
{login ? <Link  onClick={logOut} to="/login" class="btn"><i class="animation"></i>Log Out<i class="animation"></i>
    </Link>: <Link onClick={()=>setLinksActive(!linksActive)} to="/login" class="btn"><i class="animation"></i>{t('login')}<i class="animation"></i>
    </Link>}

        </div>
    </div>
   </div>
  )
}

export default Header



