import React, { useContext, useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router";
import './App.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./component/login/Login";
import "aos/dist/aos.css";
import AOS from "aos";
import Home from "./component/home/Home";
import Header from "./component/header/Header";
import Packages from "./component/Packages/Packages";
import Profile from "./component/profile/Profile";
import GetPack from "./component/getPackage/GetPack";
import StageOne from "./component/stage1Questions/StageOne";
import StageTwo from "./component/stageTwoText/stageTwo";
import StageTwoQues from "./component/stageTwoQues/StageTwoQues";
import StageThreeTxt from "./component/stage3Text/Stage3Text";
import StageThreeQues from "./component/stageThreeQues/StageThreeQues";
import FinalResult from "./component/finalResult/FinalResult";
import StageOneText from "./component/stageOneText/StageOneText";
import { useTranslation } from 'react-i18next';
import Footer from "./component/footer/Footer";
import Contact from "./component/contact/Contact";
import Appoint from "./component/appointment/Appoint";
export const AppContext = createContext();

function App() {
  const { t, i18n } = useTranslation();
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const [loader, setLoader] = useState(false);
  const route = import.meta.env.VITE_API_URL;;
  const filesRoute =import.meta.env.VITE_API_URLFILE;
  const [lang, setLang] = useState("en");
  const [answers,setAnswers]=useState([])
  const [exams,setExams]=useState({})

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  useEffect(()=>{
    if(sessionStorage.getItem("lang")){
      changeLanguage(sessionStorage.getItem("lang"))
      setLang(sessionStorage.getItem("lang"))
    }
    console.log(route)
    

  },[lang])
  useEffect(() => {
 
    if (sessionStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setLogin(true);
    }

  }, [login]);
  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <AppContext.Provider value={{route ,setLoader ,
    login ,
    setLogin ,
    token ,
    setToken,
    lang,
    setLang,
    filesRoute ,
    answers,
    setAnswers ,
    exams,
    setExams
    }}>
    <>
    <ToastContainer />
    {loader ?
    <div className="loader-cont">

<div class="loader"></div>
    </div>
    :null}
    <Header />
    <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appoint" element={<Appoint />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/finalResult" element={<FinalResult />} />
          <Route path="/exams/:id" element={<GetPack />} />
          <Route path="/stageOne/:id" element={<StageOneText />} />
          <Route path="/examQues/:id" element={<StageOne />} />
          <Route path="/stage2/:id" element={<StageTwo />} />
          <Route path="/stage3/:id" element={<StageThreeTxt/>} />
          <Route path="/stageTwoQues/:id" element={<StageTwoQues />} />
          <Route path="/stageThreeQues/:id" element={<StageThreeQues />} />
       

    </Routes>
    <Footer />
 

    </>
    </AppContext.Provider>
  )
}

export default App
