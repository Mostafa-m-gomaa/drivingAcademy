
import './stage.css'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const StageOne = () => {
    const {route ,lang ,login , setLoader ,filesRoute} = useContext(AppContext)
    const param =useParams()
    const [quesIndex,setQuesIndex]=useState(0)
    const [questions,setQuestions]=useState([])
    // const [answers,setAnswers]=useState([])
    
    

    useEffect(()=>{
        fetch(`${route}/exams/startExam/${param.id}`,{
          headers :{
    "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
    }
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          if(data.stage1){
setQuestions(data.stage1)
          
          }
        })
      },[])
      const [seconds, setSeconds] = useState(8);
      const [isActive, setIsActive] = useState(true);

      useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            setSeconds((seconds) => seconds - 1);
          }, 1000);
        } else if (!isActive && seconds !== 0) {
          clearInterval(interval);
        }
    
        if (seconds === 0) {
          clearInterval(interval);
          console.log("time out")
        }
    
        return () => clearInterval(interval);
      }, [isActive, seconds]);

    
      const toggle = () => {
        setIsActive(!isActive);
      };
    
      const reset = () => {
        setSeconds(0);
        setIsActive(false);
      };
  return (
   <div className="stage-questions">
    <div className="container">
       <h1>stage one</h1>
       <div className="question">
        {questions.map((ques,index)=>{ 
            let question
            let answers = []
            if(lang==="en"){
                question = ques.question_en
                answers =ques.options_en
            }
            else if(lang==="ar"){
                question = ques.question_ar
                answers= ques.options_ar
            }
            else if(lang==="hol"){
                question = ques.question_hol
                answers = ques.options_hol
            }
            if(index===quesIndex){
                return(
                    <div className="question-cont">
                          <div className="timer">
      <div className="time">{seconds}s</div>
      <div className="buttons">
        <button onClick={toggle} className={`button ${isActive ? 'active' : 'inactive'}`}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset} className="button">
          Reset
        </button>
      </div>
    </div>
                        <h2>{question} ? </h2>
                        <div className="ques-bottom">
                            <div className="left">
                                <img src={`${filesRoute}/${ques.image}`} alt="" />
                            </div>
                            <div className="right">
                                
                            <div class="radio-group">
                            {answers[0].split(",").map((ans, index) => {
  return (
    <div key={index}>
      <input 
        className="radio-input" 
        name="radio-group" 
        id={`radio${index}`} 
        type="radio" 
      />
      <label className="radio-label" htmlFor={`radio${index}`}>
        <span className="radio-inner-circle"></span>
        {ans}
      </label>
    </div>
  );
})}
                              </div>
                                
                            </div>
                        </div>
                 
                    </div>
                )
            }
        })}
       </div>
    </div>
   </div>
  )
}

export default StageOne