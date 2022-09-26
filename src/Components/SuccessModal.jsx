import React from 'react'
import phone_success from '../images/phone-success.png';

const SuccessModal = () => {
  return (
    <>
    <div className='phone-success-img'>
        <img src={phone_success} alt="" srcset="" />
    </div>
    <div className='success-message'>
        You're all set
    </div>
    </>

  )
}

export default SuccessModal