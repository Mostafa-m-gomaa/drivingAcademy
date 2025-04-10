import React, { useContext, useEffect , useState} from 'react'
import { AppContext } from '../../App'
import './final.css'
import { useTranslation } from 'react-i18next';

const FinalResult = () => {
    const {lang ,filesRoute}=useContext(AppContext)
    const [questions,setQuestions]=useState([])
    const [showCard,setShowCard]=useState(false)
    const [image,setImage]=useState("")
    const [answer,setAnswer]=useState("")
    const [question,setQuestion]=useState("")
    const [stage,setStage]=useState(0)
    const [urAnswer,setUrAnswer]=useState("")
    const { t, i18n } = useTranslation();

    const handleShowCard=(image,answer,question,stage,yournswer)=>{
        setImage(image)
        setAnswer(answer)
        setQuestion(question)
        setStage(stage)
        setUrAnswer(yournswer)
        setShowCard(true)

    }
    useEffect(() => {
        setQuestions(JSON.parse(sessionStorage.getItem('finalResult')))
        console.log(JSON.parse(sessionStorage.getItem('finalResult')));
      
        
    }, []);
  return (
    <div className="final-result">
        {showCard ? <div className="card-cont" onClick={()=>setShowCard(false)}>
        <div className="card">
            <h2>{question} ?</h2>
            <img src={`${filesRoute}/${image}`} alt="" />
            <h3>Correct Answer : {answer}</h3>
            <h3>Your Answer : {urAnswer}</h3>

        </div>
        </div> : null}
        <div className="container">
            <h1>{t('final')}</h1>
            <div className="result">
                {/* <h2>{t('stOne')}</h2> */}
                {/* <div className="stage">
                {questions.map((que)=>{
          let question
if(lang==="en"){
    question=que.question_en
}
else if(lang==="hol"){
question=que.question_hol
}
else if(lang==="ar"){
question=que.question_ar
}

if(que.stage === 1){
    return(
     
        <div onClick={()=>handleShowCard(que.questionImage,que.questionAnswer,question,que.stage,que.youAnswer)} className={que.questionAnswer === que.youAnswer ? "correct question" : "false question"}>
            <h3>{question}</h3>
        </div>
      
                )
}
       })}
                </div> */}
                {/* <h2>{t('stTwo')}</h2> */}
                {/* <div className="stage">
                {questions.map((que)=>{
          let question
if(lang==="en"){
    question=que.question_en
}
else if(lang==="hol"){
question=que.question_hol
}
else if(lang==="ar"){
question=que.question_ar
}

if(que.stage === 2){
    return(
    
        <div onClick={()=>handleShowCard(que.questionImage,que.questionAnswer,question,que.stage,que.youAnswer)} className={que.questionAnswer === que.youAnswer ? "correct question" : "false question"}>
            <h3>{question}</h3>
        </div>
       
                )
}
       })}
                </div> */}
                {/* <h2>{t('stThree')}</h2> */}
                <div className="stage">
                {questions.map((que)=>{
          let question
if(lang==="en"){
    question=que.question_en
}
else if(lang==="hol"){
question=que.question_hol
}
else if(lang==="ar"){
question=que.question_ar
}

if(que.stage === 3){
    return(
    
        <div onClick={()=>handleShowCard(que.questionImage,que.questionAnswer,question,que.stage,que.youAnswer)} className={que.questionAnswer === que.youAnswer ? "correct question" : "false question"}>
            <h3>{question}</h3>
        </div>
      
                )
}
       })}
                </div>
    
            </div>
        </div>
    </div>
  )
}

export default FinalResult