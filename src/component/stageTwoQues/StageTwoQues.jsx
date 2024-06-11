
import '../stage1Questions/stage.css'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const StageTwoQues = () => {
    const {route ,lang ,login , setLoader ,filesRoute ,answers, setAnswers , exams} = useContext(AppContext)
    const param =useParams()
    const [quesIndex,setQuesIndex]=useState(0)
    const [stageLength,setStageLength]=useState(0)
    const [questions,setQuestions]=useState([])
    const [showTimer,setShowTimer]=useState(true) 
    const history = useNavigate()
    // const [answers,setAnswers]=useState([])
    const { t, i18n } = useTranslation();

    const handleAnswerSelect = (questionId, answer) => {
      setAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        const answerIndex = updatedAnswers.findIndex((ans) => ans.questionId === questionId);
        if (answerIndex >= 0) {
          updatedAnswers[answerIndex].answer = answer;
        } else {
          updatedAnswers.push({ questionId, answer });
          if(quesIndex === stageLength-1){
history(`/stage3/${param.id}`)

          }else if(quesIndex < stageLength-1){
setQuesIndex(quesIndex+1)
          }
        }
        return updatedAnswers;
     
      });
    };
    
    

//     useEffect(()=>{
//         fetch(`${route}/exams/startExam/${param.id}`,{
//           headers :{
//     "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
//     }
//         })
//         .then(res=>res.json())
//         .then(data=>{
//           console.log(data)
//           if(data.stage2){
// setQuestions(data.stage2)
// setStageLength(data.stage2.length)

          
//  }
//         })
//       },[])
    useEffect(()=>{
        setQuestions(exams.stage2)
setStageLength(exams.stage2.length)
      },[])



      const [seconds, setSeconds] = useState(40);
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
        
          if(quesIndex === stageLength-1){
            history(`/stage3/${param.id}`)
            
                      }else if(quesIndex < stageLength-1){
            setQuesIndex(quesIndex+1)
            setSeconds(40)
                      }
          
      
        }
    
        return () => clearInterval(interval);
      }, [isActive, seconds]);

    
      const toggle = () => {
        setIsActive(false);
        setShowTimer(false)
      };
    
      const reset = () => {
        setSeconds(0);
        setIsActive(false);
      };
  return (
   <div className="stage-questions">
    <div className="container">
       <h1>{t('stTwo')}</h1>
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
       {showTimer ?                    <div className="timer">
      <div className="time">{seconds}s</div>
      <div className="buttons">
        <button onClick={toggle} className={`button ${isActive ? 'active' : 'inactive'}`}>
          {/* {isActive ? 'Pause' : 'Start'} */} Pause
        </button>
      </div>
    </div> : null}
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
        onChange={() => handleAnswerSelect(ques._id, ans)}
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

export default StageTwoQues