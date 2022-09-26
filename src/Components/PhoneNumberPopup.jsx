import React from 'react'

const PhoneNumberPopup = ({phoneNumber,SetPhoneNumber,isValidInput,changePhoneNumber}) => {
  return (
    <>
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
			<button className='phone-number-popup' onClick={changePhoneNumber}>
				Submit
			</button>
    </>
  )
}

export default PhoneNumberPopup