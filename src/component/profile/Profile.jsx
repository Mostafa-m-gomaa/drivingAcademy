import React, { useEffect } from 'react'
import './profile.css'
import profile from '../../assets/user.png'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify'


const Profile = () => {
    const {route ,lang ,login , setLoader} = useContext(AppContext)
    const [subscriptions,setSubscriptions]=useState([])
    const { t, i18n } = useTranslation();
    const [password ,setPassword]=useState("")
    const [newPassword ,setNewPassword]=useState("")
    const [confirmPassword ,setConfirmPassword]=useState("")
    useEffect(()=>{
        fetch(`${route}/subscriptions/mySubscriptions`,{
          headers :{
    "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
    }
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          if(data.data){
            setSubscriptions(data.data)
          }
        })
      },[])

      const changePassword = async (event) => {
        event.preventDefault();
        setLoader(true)
      
        
        try {
          const response = await fetch(`${route}/users/changeMyPassword`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization :`Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({currentPassword:password ,password:newPassword ,passwordConfirm:confirmPassword}),
          })
          .then(res=>res.json())
          console.log(response)
           setLoader(false)
           if(response.token){
     toast.success("Password Changed Successfully")
            }
          else if(response.status ==="fail"){
     toast.success(response.message)
            }
        } catch (error) {
          console.error("dd");
        
        }
      };
  return (
   <div className="profile-page">
    <div className="container">
    <article class="card">
  <div class="card-img">
    <div class="card-imgs pv delete"><img src={profile} alt="" /></div>
  </div>

  <div class="project-info">
    <div class="flex">
      <div class="project-title">{sessionStorage.getItem("userName")}</div>
      <span class="tag">type</span>
    </div>
    <span class="lighter"
      >{sessionStorage.getItem("email")}</span>
    
  </div>
</article>
<div className="my-pack">
    <h1>{t('myPack')}</h1>
    <div className="packs">
        {subscriptions.map(pack=>{
            let title 
                       if(lang==="en"){
                        title = pack.package.title_en  
                     
                        }
                        else if(lang==="ar"){
                            title = pack.package.title_ar
                     
                        }
                        else if(lang==="hol"){
                            title = pack.package.title_hol
                         
                        }
        return <div className="pack">
            <h3>{title}</h3>
          
            
            <p>End date : {pack.expiresAt}</p>
            <Link to={`/exams/${pack.package._id}`}>{t('exams')}</Link>
        </div>
        })}
    </div>
</div>
<div class="form-container">
      <div class="logo-container">
       Change Password
      </div>

      <form class="form" onSubmit={changePassword}>
        <div class="form-group">
          <label for="email">Current Password</label>
          <input type="text" required="" onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="email">New Password</label>
          <input type="text" required="" onChange={(e)=>setNewPassword(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="email">Confirm Password</label>
          <input type="text" required="" onChange={(e)=>setConfirmPassword(e.target.value)} />
        </div>

        <button class="form-submit-btn" type="submit">Change</button>
      </form>

  
    </div>

    </div>
   </div>
  )
}

export default Profile