import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import road from '../../assets/road.jpg'
import './packs.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';
const Packages = () => {
    const [packages,setPackages]=useState([])
    const {route ,lang ,login , setLoader} = useContext(AppContext)
    const { t, i18n } = useTranslation();
    




    useEffect(()=>{
        fetch(`${route}/packages`,{
          headers :{
    "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
    }
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          if(data.data){
         setPackages(data.data)
          }
        })
      },[])

      const buyPackage = (e,id)=>{
  
        if(!login){
        toast.error("you must login first")
        }
        else{
          setLoader(true)
e.preventDefault()
fetch(`${route}/subscriptions/checkoutSession/${id}`,{
  method:"PUT",
  headers :{
    "Authorization" :`Bearer ${sessionStorage.getItem("token")}`,}
})
.then(res=>res.json())
.then(data=>{
  setLoader(false)
  console.log(data)
  if(data.status ==="success"){
    window.location.href = data.session.url
  }
})
        }

      }
  return (
  <div className="packages">
    {/* <img className='road' src={road} alt="" /> */}
    <div className="container">
       <h1>{t('ourPack')}</h1>
       <div className="packs">
         {packages.map(pack=>{
            let title ,description 
            if(lang==="en"){
            title = pack.title_en  
            description = pack.desc_en  
            }
            else if(lang==="ar"){
                title = pack.title_ar
                description = pack.desc_ar
            }
            else if(lang==="hol"){
                title = pack.title_hol
                description = pack.desc_hol
            }
            return(
              <div className="card_box">
             <span><div className="price">{pack.price} $</div></span>
            <h2>{title}</h2>   
            <p>{description}</p>
            <div className="dur">for {pack.duration} days</div>
            <Link to={`/login`} onClick={(e)=>buyPackage(e,pack._id)} class="button2">{t('buyNow')}</Link>

              
         
              </div>
            )
         })}
       </div>
    </div>
  
  </div>
  )
}

export default Packages