import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../stageTwoText/st.css'


const StageOneText = () => {
    const param =useParams()
  return (
  <div className="stage-two">
    <div className="container">
   <div>
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum voluptatum nemo dolorem error dignissimos molestias, sunt, minima porro nam laudantium quaerat inventore libero aliquid voluptate animi labore ullam quasi expedita.
   </div>
   <Link className='btn' to={`/examQues/${param.id}`}>Agree</Link>
    </div>

  </div>
  )
}

export default StageOneText