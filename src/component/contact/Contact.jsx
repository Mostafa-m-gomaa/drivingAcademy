import React, { useState ,useContext } from 'react'
import './contact.css'
import { AppContext } from '../../App'
import { toast } from 'react-toastify'

const Contact = () => {
    const {route ,setLoader} = useContext(AppContext)
    const [name,setName]=useState("")
    const [phone,setPhone]=useState("")
    const [email,setEmail]=useState("")
    const [message,setMessage]=useState("")

    const contactForm = async (event) => {
        event.preventDefault();
        setLoader(true)
      
        
        try {
          const response = await fetch(`${route}/contact`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization :`Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({name:name ,email:email ,phone:phone ,message:message}),
          })
          .then(res=>res.json())
          console.log(response)
           setLoader(false)
           if(response.data){
            toast.success("Message sent successfully we will contact you soon")
           }
        } catch (error) {
          console.error("dd");
        
        }
      };
  return (
    <div className="contact">
        <div className="container">
        <form class="form" onSubmit={contactForm}>
    <div class="title">Contact us</div>
    <input type="text" placeholder="Your Name" class="input" onChange={(e)=>setName(e.target.value)} />
    <input type="text" placeholder="Your Phone" class="input" onChange={(e)=>setPhone(e.target.value)} />
    <input type="text" placeholder="Your email" class="input" onChange={(e)=>setEmail(e.target.value)} />
    <textarea placeholder="Your message" onChange={(e)=>setMessage(e.target.value)}></textarea>
     
    <button>Submit</button>
</form>
        </div>
    </div>
  )
}

export default Contact