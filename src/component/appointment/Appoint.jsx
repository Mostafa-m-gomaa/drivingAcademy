import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../App'
import './appoint.css'
import { toast } from 'react-toastify'

const Appoint = () => {
    const [name,setName]=useState("")
    const [lastName,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [birthDay,setBirthDay]=useState("")
    const [testLocation,setTestLocation]=useState("")
    const [message,setMessage]=useState("")
    const {route ,setLoader}=useContext(AppContext)

    const appoint = async (event) => {
        event.preventDefault();
        setLoader(true)
      
        
        try {
          const response = await fetch(`${route}/appointments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization :`Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({firstName : name ,lastName ,email ,phone ,birthday: birthDay ,testLocation ,note : message , price : "100"}),
          })
          .then(res=>res.json())
          console.log(response)
           setLoader(false)
           if(response.status ==="success"){
            window.location.href = response.session.url
           }
           else if(response.status ==="error"){
             toast.error(response.message)
           }
        } catch (error) {
          console.error("dd");
        
        }
      };


  return (
    <div className="appoint">
        <div className="container">
        <form className="form" onSubmit={appoint}>
    <p className="title">Appointment </p>
 
        <div className="flex">
        <label>
            <input onChange={(e)=>setName(e.target.value)} required="" placeholder="" type="text" className="input" />
            <span>Firstname</span>
        </label>

        <label>
            <input required="" onChange={(e)=>setLastName(e.target.value)} placeholder="" type="text" className="input" />
            <span>Lastname</span>
        </label>
    </div>  
            
    <label>
        <input required="" onChange={(e)=>setEmail(e.target.value)} placeholder=""  className="input" />
        <span>Email</span>
    </label> 
    <label>
        <input required="" placeholder="" onChange={(e)=>setPhone(e.target.value)} className="input" />
        <span>Phone</span>
    </label> 
    <label>
        <input required="" placeholder="" onChange={(e)=>setBirthDay(e.target.value)} type='date'  className="input" />
        <span>Birth Day</span>
    </label> 
    <label>
        <input required="" placeholder="" onChange={(e)=>setTestLocation(e.target.value)} className="input" />
        <span>Test Location</span>
    </label> 
    <label>
        <input required="" placeholder=""  className="input" onChange={(e)=>setMessage(e.target.value)} />
        <span>Message</span>
    </label> 

        
 
    <button className="submit">Submit</button>
   
</form>
        </div>
    </div>
  )
}

export default Appoint