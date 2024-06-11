import React from 'react'
import backGround from '../../../assets/e8f38769-8bf6-4926-98a6-043a3a53006e.jpeg'
import logo from '../../../assets/fefef.jpeg'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import './landing.css'
const Landing = () => {
  const { t, i18n } = useTranslation();


  return (
    <div className="landing">
        <img src={backGround} alt=""  className='backGround'/>
        <div className="container">
            <img src={logo} alt=""
            data-aos="fade-down"
            data-aos-duration="1500"
            />
<div className="txt" data-aos="fade-up"
     data-aos-duration="3000">
<h1>Theorie haast</h1>
 <p>{t('landing')}</p>
<Link to="/login" className='btn'>{t('start')}</Link>
 </div> 
       </div>
    </div>
  )
}

export default Landing