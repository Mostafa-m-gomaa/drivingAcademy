import React, { useEffect } from 'react'
import './getPack.css'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';


const GetPack = () => {
     const { t, i18n } = useTranslation();
    const {route ,lang ,login , setLoader} = useContext(AppContext)
    const param =useParams()
    const [exams,setExams]=useState([])

    useEffect(()=>{
        fetch(`${route}/exams?package=${param.id}`,{
          headers :{
    "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
    }}).then(res=>res.json())

    .then(data =>{
        console.log(data)
        if(data.data){
            setExams(data.data)
        }
    
    })
    
        
    },[])
  return (
    <div className="get-pack">
        <div className="container">
           <h1>{t('exams')}</h1>
           <div className="exams">
                {exams.map(exam=>{
                     let title ,description 
                     if(lang==="en"){
                          title = exam.title_en
                          description = exam.desc_en
                     }
                     else if(lang==="ar"){
                          title = exam.title_ar
                          description = exam.desc_ar
                     }
                     else if(lang==="hol"){
                          title = exam.title_hol
                          description = exam.desc_hol
                     }
                     return(
                          <div className="exam">
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <div className="padd">{t('pass')} {exam.passDegree}</div>
                            <Link to={`/stageOne/${exam._id}`} className="btn">{t('startEx')}</Link>
                          </div>
                     )
                })}
           </div>
        </div>
    </div>
  )
}

export default GetPack