import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../stageTwoText/st.css'
import { useTranslation } from 'react-i18next';


const StageThreeTxt = () => {
  const { t, i18n } = useTranslation();
    const param =useParams()
  return (
  <div className="stage-two">
    <div className="container">
   <div>
   {t('stageThree')}
   </div>
   <Link className='btn' to={`/stageThreeQues/${param.id}`}>{t('agree')}</Link>
    </div>

  </div>
  )
}

export default StageThreeTxt