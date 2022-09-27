import React from 'react'
import '../css/PhoneNumberPopup.css'
const PhoneNumberPopup = ({phoneNumber,SetPhoneNumber,isValidInput,changePhoneNumber}) => {
  const mobileOrTab = window.innerWidth <= 900;
  return (
    <>
      <div className={`${ mobileOrTab ? "phone-number-popup-div":""}`}>
        <div className='phone-number-popup-heading'>
          Change phone number
        </div>
        <div className='input-phone-popup'>
          <input type="text" className='input-phone-text' value={phoneNumber}
            onChange={SetPhoneNumber} 
            placeholder="Enter your phone number" inputMode="numeric"
            pattern="[1-9]{1}[0-9]{5}"
            minLength="10"
            maxLength="10" onKeyDown={isValidInput}
            autoComplete='off'/>
        </div>
        <div className='phone-number-submit-div'>
          <button onClick={(event) => changePhoneNumber(event,true)} disabled={phoneNumber?.length != 10}
          className={ ` phone-number-popup ${(phoneNumber?.length == 10)? 'phone-number-submit-correct': 'phone-number-submit' }`}>
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default PhoneNumberPopup