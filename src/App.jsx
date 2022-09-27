import React from "react";
import { useEffect, useState,useRef } from "react";
import axios from 'axios';
//Components
import ReferAndEarn from "./Components/ReferAndEarn";
import HowItWorks from "./Components/HowItWorks";
import History from "./Components/History";
import WalletCards from "./Components/WalletCards";
import BackNavigator from "./Components/BackNavigator";
import Loader from "./Components/Loader";
import PhoneNumberSection from "./Components/PhoneNumberSection";
//css
import "./App.css";

const App = () => {
  const [screenSize,setScreenSize] = useState('')
  const [body,Set_body] = useState(null);
  const ref = useRef(null);
  const [showHistory,setShowHistory] = useState(false)
  const [customer_id,Set_customer_id] = useState("");
  const [cashName,Set_cashName]= useState('');
  const [user_data,Set_user_data] = useState({
    "balance":"",
    "lifetime":"",
    "coins_on_way":"",
    "total_earnings":"",
    "rewards_list":[],
    "referral_code":""
})
const scrollToVouchers = () => {
  ref.current?.scrollIntoView({behavior: 'smooth'});
  // ref.current?.scrollIntoView();
};

const getEarningsData = async () => {
  const data = {
    // "customer_id":"6414055473364",
    //  customer_id:"6411445371092",
    // "customer_id":"5874011242688",
    customer_id: document.getElementById("shopify-customer-id")?.value
  }
  const config = {
      method: 'post',
      mode: 'cors',
      url : `${process.env.REACT_APP_REFERRAL_BASE_URL}/referral/checkBalance`,
      headers: { 
      'Content-Type': 'application/json'
      },
      data : data
  }
   await axios(config).then((response) =>{
    Set_body(response.data);
    let amazon_vouchers_total_sum = 0;
    let pending_rewards_sum = 0;
    const pending_rewards =  response.data.body.ledger.filter((x) => x.status == 'pending' && x.type == "credit")
    const pending_rewards_values = pending_rewards.map((x) => x.value);
    if (pending_rewards_values.length){
      pending_rewards_sum = pending_rewards_values?.reduce((x,y) => x+y);
    }
    const rewards_earned = response.data.body.ledger.filter((x) => x.status == 'rewarded')
    const amazon_vouchers_array=response.data.body.ledger.filter((x) => x.voucher_code != "0");
    amazon_vouchers_array.forEach((x) => amazon_vouchers_total_sum += x.value);
    const pending_amazon_vouchers = response.data.body.ledger.filter((x) => {return (x.type == 'debit' && x.status == "pending")})
    Set_user_data({
          "balance": response.data.body.balance,
          // "balance": 2000,
          "lifetime": response.data.body.lifetime,
          "coins_on_way": pending_rewards_sum,
          "rewards_list": rewards_earned,
          // rewards_list:[],
          "amazon_voucher_value":amazon_vouchers_total_sum,
          "vouchers_array":amazon_vouchers_array,
          // "vouchers_array":[],
          "number_of_pending_referrals":pending_rewards_values.length,
          "pending_amazon_vouchers": pending_amazon_vouchers,
          "referral_code":'',
          // "pending_amazon_vouchers": []
      });
    }).catch((error)=>{
        Set_body(true);
        console.log(error,'error');
    })
  }


  const Set_Referral_code = (code) => {
    Set_user_data((prevState) => {
      return {...prevState, 
        "referral_code": code} 
      })
  }

  const toggleHistoryTrue = () => {
    setShowHistory(true);
  }
  
  const toggleHistoryFalse = () => {
    setShowHistory(false);
  } 
    
  const getNewData = () => {}

  useEffect(()=>{
  
    document.documentElement.style.setProperty(
      "--border",
      process.env.REACT_APP_COLOR_BORDER
    );
    document.documentElement.style.setProperty(
      "--hover",
      process.env.REACT_APP_COLOR_HOVER
    );
    document.documentElement.style.setProperty(
      "--color-light",
      process.env.REACT_APP_COLOR_LIGHT
    );
    document.documentElement.style.setProperty(
      "--color-normal",
      process.env.REACT_APP_COLOR_NORMAL
    );
    document.documentElement.style.setProperty(
      "--color-dark",
      process.env.REACT_APP_COLOR_DARK
    );
    const cashNameFromEnv = process.env.REACT_APP_BRAND == 'Saturn' ? 'sCash' : 'mCash';
    Set_cashName(cashNameFromEnv);
    const screenWidth = window.innerWidth;
    setScreenSize(screenWidth);
    // Set_customer_id("6411445371092");
    // console.log(showHistory &&  window.innerWidth < 600 ,"test1", window.innerWidth > 600, "test2")
    Set_customer_id(document.getElementById("shopify-customer-id")?.value)
    // Set_customer_id("6414055473364");
    // Set_customer_id("5874011242688");
   
  getEarningsData();
  },[])

  return (
    <>
    { body ? <div className="main-container">
      {showHistory && <BackNavigator hideHistory={toggleHistoryFalse} />}
      {!showHistory && <ReferAndEarn  customer_id={customer_id} showHistory={showHistory} Set_Referral_code={Set_Referral_code}
      cashName={cashName}/>}
      {!showHistory && <WalletCards getNewData={getNewData} scrollToVouchers={scrollToVouchers} showHistory={toggleHistoryTrue}  
      customer_id={customer_id} user_data={user_data}cashName={cashName}/>}
      {!showHistory && < PhoneNumberSection customer_id={customer_id} /> }
      {!showHistory && <HowItWorks customer_id={customer_id} user_data={user_data} cashName={cashName}/>}
      { ((showHistory &&  window.innerWidth < 600) || (window.innerWidth > 600) ) && 
      <History user_data={user_data} customer_id={customer_id} focus_ref={ref} 
      code={user_data.referral_code} Set_Referral_code={Set_Referral_code} cashName={cashName}/>}
    </div> : 
      <Loader/>
      }
    </>
  );
};

export default App;
