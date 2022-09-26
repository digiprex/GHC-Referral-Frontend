import axios from 'axios';
import React,{useState} from 'react';
import { useEffect } from 'react';
import { Modal } from "react-responsive-modal";
import PhoneNumberPopup from './PhoneNumberPopup';
import SuccessModal from './SuccessModal';
import Loader from "./Loader";
import "react-responsive-modal/styles.css";
import '../css/PhoneNumberSection.css';

const PhoneNumberSection = ({customer_id}) => {
  const [phoneNumber,Set_phoneNumber] = useState('');
  const [modalOpen,Set_modalOpen] = useState(false);
  const [customerPhoneNumber,Set_customerPhoneNumber] = useState('');
  const [loading,Set_loading] = useState(true);
  const [successModal,Set_successModal] = useState(false);
 
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
      Set_customerPhoneNumber(response.data.customer.phone?.slice(3));
      Set_loading(false);
      return response;
    } catch(error) {
      console.log(error);
      return null;
    }
  }

  const closePopup = () => {
    Set_modalOpen(false);
  }

  const closeSuccessModal = () => {
    Set_successModal(false);
  }
  const changePhoneNumber = async () => {
    Set_modalOpen(false);
    Set_loading(true);
    let data = JSON.stringify({
      "customer": {
        "id": customer_id,
        "phone": phoneNumber
      }
    });

    let config = {
      method: 'put',
      url: 'https://prex-prex-prex.myshopify.com/admin/api/2022-01/customers/6411445371092.json',
      headers: { 
        'X-Shopify-Access-Token': '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', 
        'Content-Type': 'application/json', 
      },
      data : data
    };

    try {
      const response = await axios(config);
      Set_customerPhoneNumber(response.data.customer.phone);
      Set_loading(false);
      Set_successModal(true);
    } catch(error) {

    }
  }
  useEffect(()=>{
    getPhoneNumber();
  },[])

  useEffect(()=>{
    getPhoneNumber();
  },[customerPhoneNumber]);

  const SetPhoneNumber = (e) =>{
    Set_phoneNumber(e.target.value)
  }

  const changeNumber = () => {
    Set_modalOpen(true);
  }

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
    { !loading ? 
    <div>
     { !customerPhoneNumber ?  
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
        <button id="phone-number-submit" onClick={changePhoneNumber} disabled={phoneNumber?.length != 10} className={`${(phoneNumber?.length == 10)? 'phone-number-submit-correct': 'phone-number-submit' }`}>
          Submit
        </button>
      </div>
    </div> : 
    <div className='phone-number-section'>
      <div className='sub-heading'>
        All the updates will be sent on your registered phone number via Whatsapp/SMS
      </div>
      <div className='phone-number-details-div'>
        <span>Phone Number:</span><span>{customerPhoneNumber}</span><a className='change-phone-link' onClick={changeNumber} >Change</a>
      </div>
    </div> }
    </div> 
    : <Loader/> }
    <Modal
          center
          open={modalOpen}
          onClose={closePopup}
          showCloseIcon={false}
          classNames={{
            modal: 'custom-modal-phone-number',
          }}
        >
        <PhoneNumberPopup 
        phoneNumber={phoneNumber} SetPhoneNumber={SetPhoneNumber} isValidInput={isValidInput} changePhoneNumber={changePhoneNumber}
        // closeDesktopModal={closeDesktopModal} close_SuccessPopup={close_SuccessPopup} 
        />
      </Modal>
      <Modal
          center
          open={successModal}
          onClose={closeSuccessModal}
          showCloseIcon={false}
          classNames={{
            modal: 'custom-modal-success-phone-number',
          }}
        >
        <SuccessModal/>
      </Modal>
  </>
  )
}

export default PhoneNumberSection