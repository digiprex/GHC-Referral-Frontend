import pic from '../images/back2.png'
import React, {Component} from 'react'
import '../css/BackNavigator.css'

const BackNavigator = ({hideHistory}) => {
  return (
    <>  
        <div onClick={()=>hideHistory()} className='backNavigatorContainer'>
            <img src={pic} style={{paddingTop:"10px",height:"20px"}} alt=""  /> &nbsp; <span className='backNavigatorText'>Back</span> 
        </div>
    </>
  )
}

export default BackNavigator