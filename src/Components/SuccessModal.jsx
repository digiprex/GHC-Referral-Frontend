import React from 'react'
import phone_success from '../images/phone-success.png';

const SuccessModal = () => {
  return (
    <>
    <div className='phone-success-div'>
      <div >
          <img src={phone_success} className='phone-success-img'  alt="" srcset="" />
      </div>
      <div className='success-message'>
          You're all set
      </div>
    </div>
    </>

  )
}

export default SuccessModal