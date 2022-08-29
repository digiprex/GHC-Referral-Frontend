import React from "react";
import ReferAndEarn from "./Components/ReferAndEarn";
import HowItWorks from "./Components/HowItWorks";
import History from "./Components/History";
import WalletCards from "./Components/WalletCards";
import BackNavigator from "./Components/BackNavigator";
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
    if(document.getElementById("shopify-customer-id")?.value) {
      Set_customer_id(document.getElementById("shopify-customer-id")?.value) 
    } else {
      Set_customer_id("")
    }
  
    
    // Set_customer_id("6411445371092"); 
    const data = {
      // "customer_id":"5874011242688",
      //  customer_id:"6411445371092",
      customer_id: document.getElementById("shopify-customer-id")?.value || 0
    }
    // 5874011242688
  const getEarningsData = async () => {
      const config = {
          method: 'post',
          mode: 'cors',
          url : `https://${process.env.REACT_APP_REFERRAL_BASE_URL}/referral/checkBalance`,
          headers: { 
          'Content-Type': 'application/json'
          },
          data : data
      }
       await axios(config).then((response) =>{
        const pending_rewards =  response.data.body.ledger.filter((x) => x.status == 'pending')
        const pending_rewards_values = pending_rewards.map((x) => x.value);
        const pending_rewards_sum = pending_rewards_values.reduce((x,y) => x+y);
        const rewards_earned = response.data.body.ledger.filter((x) => x.status = 'rewarded')
        const rewards_earned_values = rewards_earned.map((x) => x.value);
        const rewards_earned_sum = rewards_earned_values.reduce((x,y) => x+y);
        console.log(rewards_earned_sum,'total earnings')
        const totalEarnings = rewards_earned_values.reduce((sum,current) =>  sum + current.value,0)
          Set_user_data({
              "balance": response.data.body.balance,
              "lifetime": rewards_earned_sum,
              "coins_on_way": pending_rewards_sum,
              "rewards_list": rewards_earned
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
      {!showHistory ? <ReferAndEarn  customer_id={customer_id}/> : null}
      {!showHistory ? <WalletCards showHistory={toggleHistoryTrue}  customer_id={customer_id} user_data={user_data}/> : null }
      {!showHistory ? <HowItWorks customer_id={customer_id} /> :  null}
      {!showHistory ? <History user_data={user_data} customer_id={customer_id}/> : null}
    </div>
  );
};

export default App;
