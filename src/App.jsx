import React from "react";
import ReferAndEarn from "./Components/ReferAndEarn";
import HowItWorks from "./Components/HowItWorks";
import History from "./Components/History";
import WalletCards from "./Components/WalletCards";
import BackNavigator from "./Components/BackNavigator";
import ReferAFriend from "./Components/ReferAFriend.jsx";
import axios from 'axios';
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [screenSize,setScreenSize] = useState('')
  const [showHistory,setShowHistory] = useState(false)
  const [customer_id,Set_customer_id] = useState("");
  const [user_data,Set_user_data] = useState({
    "balance":"",
    "lifetime":"",
    "coins_on_way":"",
    "total_earnings":"",
    "rewards_list":[]
})
  useEffect(()=>{
    const screenWidth = window.innerWidth;
    setScreenSize(screenWidth);
    // console.log(showHistory &&  window.innerWidth < 600 ,"test1", window.innerWidth > 600, "test2")
    // Set_customer_id(document.getElementById("shopify-customer-id")?.value)
    Set_customer_id("6411445371092"); 
    // Set_customer_id("6414055473364");
    // Set_customer_id("5874011242688") 
    const data = {
      // "customer_id":"6414055473364",
       customer_id:"6411445371092",
      // "customer_id":"5874011242688",
      // customer_id: document.getElementById("shopify-customer-id")?.value
    }
    // 5874011242688
  const getEarningsData = async () => {
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
        let amazon_vouchers_total_sum = 0;
        let pending_rewards_sum = 0;
        const earnings_rewards_array= []; 
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
              // "balance": 0,
              "lifetime": response.data.body.lifetime,
              "coins_on_way": pending_rewards_sum,
              "rewards_list": rewards_earned,
              // rewards_list:[],
              "amazon_voucher_value":amazon_vouchers_total_sum,
              "vouchers_array":amazon_vouchers_array,
              // "vouchers_array":[],
              "number_of_pending_referrals":pending_rewards_values.length,
              "pending_amazon_vouchers": pending_amazon_vouchers
              // "pending_amazon_vouchers": []
          });
      }).catch((error)=>{
          console.log(error,'error');
      })
  }

  getEarningsData()
  },[])

  const toggleHistoryTrue = () => {
    setShowHistory(true);
  }

  const toggleHistoryFalse = () => {
    setShowHistory(false);
  } 
  return (
    <div className="main-container">
      {showHistory ? <BackNavigator hideHistory={toggleHistoryFalse} /> : null}
      {!showHistory ? <ReferAndEarn  customer_id={customer_id} showHistory={showHistory}/> : null}
      {/* {(showHistory &&  window.innerWidth < 600) ? <ReferAFriend  customer_id={customer_id} showHistory={showHistory}/> : null} */}
      {!showHistory ? <WalletCards showHistory={toggleHistoryTrue}  customer_id={customer_id} user_data={user_data}/> : null }
      {!showHistory ? <HowItWorks customer_id={customer_id} user_data={user_data}/> :  null}
      { ((showHistory &&  window.innerWidth < 600) || (window.innerWidth > 600) ) ? <History user_data={user_data} customer_id={customer_id}/> : null}
    </div>
  );
};

export default App;
