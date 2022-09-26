import axios from 'axios';
import React,{useState} from 'react';
import { useEffect } from 'react';
import '../css/PhoneNumberSection.css';

const PhoneNumberSection = ({customer_id}) => {
  const [isNewCustomer,Set_isNewCustomer] = useState(true);
  const [phoneNumber,Set_phoneNumber] = useState('');

  const getPhoneNumber = async () => {
    const data = {
      customer_id: customer_id
    }

    let config = {
      method: 'get',
      url: `${process.env.REACT_APP_STORE_URL}/admin/api/2022-01/customers/${customer_id}.json`,
      headers: { 
        'X-Shopify-Access-Token': process.env.REACT_APP_STORE_ACCESS_TOKEN
      }
    };

    try {
      const response  = await axios(config);
      Set_phoneNumber(response.data.customer.phone);
      return response;
    } catch(error) {
      console.log(error);
      return null;
    }
  }

  useEffect(()=>{
    getPhoneNumber();
  },[])

  const isValidInput = (e) => {
    if (e.keyCode === 13) {
      document.getElementById("phone-number-submit").click();
    }

    let x = e.which || e.keyCode;
    return (x >= 48 && x <= 57) ||
        x === 8 ||
        (x >= 35 && x <= 40) ||
        x === 46 ||
        (x >= 96 && x <= 105) ||
        x === 9
        ? null
        : e.preventDefault();
  }
  return (
    <>
  { isNewCustomer ?  
    <div className='phone-number-section'>
      <div className='section-header'>
          Almost there!
      </div>
      <div className='sub-heading'>
        To continue using your account and for all future updates, please link your phone number.All notifications will be sent via
        Whatsapp/SMS
      </div>
      <div className='input-section'>
        <div className='input-phone-number'>
          <input type="text" className='input-phone-text' value={phoneNumber}
           onChange={(e)=>Set_phoneNumber(e.target.value)} 
          placeholder="Enter your phone number" inputMode="numeric"
          pattern="[1-9]{1}[0-9]{5}"
          minLength="10"
          maxLength="10" onKeyDown={isValidInput}
          autoComplete='off'/>
        </div>
        <button id="phone-number-submit" className={`${(phoneNumber.length == 10)? 'phone-number-submit-correct': 'phone-number-submit' }`}>
          Submit
        </button>
      </div>
    </div> : 
    <div className='phone-number-section'>
      <div className='sub-heading'>
        All the updates will be sent on your registered phone number via Whatsapp/SMS
      </div>
    </div> }
  </>
  )
}

export default PhoneNumberSection