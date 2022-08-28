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
    const data = {
      "customer_id":"5874011242688",
      // "customer_id": null
      // customer_id:"5874011242688",
      // customer_id: document.getElementById("shopify-customer-id")
    }
    // Set_customer_id(document.getElementById("shopify-customer-id"));
    Set_customer_id("5874011242688");
  const getEarningsData = async () => {
      const config = {
          method: 'post',
          mode: 'cors',
          url : `http://${process.env.REACT_APP_REFERRAL_BASE_URL}/referral/checkBalance`,
          headers: { 
          'Content-Type': 'application/json'
          },
          data : data
      }
       await axios(config).then((response) =>{
          const ledger = [
            {
                "createdAt": "2022-04-15T08:33:17.000Z",
                "value": 100,
                "type": "credit",
                "status": "pending",
                "voucher_code": "0",
                "order": "1020"
            },
            {
                "createdAt": "2022-04-14T08:26:39.000Z",
                "value": 100,
                "type": "credit",
                "status": "rewarded",
                "voucher_code": "0",
                "order": "1016"
            },
            {
              "createdAt": "2022-04-14T08:20:44.000Z",
              "value": 100,
              "type": "credit",
              "status": "rewarded",
              "voucher_code": "0",
              "order": "1234"
           },
           {
              "createdAt": "2022-04-14T08:19:33.000Z",
              "value": 100,
              "type": "credit",
              "status": "rewarded",
              "voucher_code": "0",
              "order": "1234"
           }
        ]

        response.data.body.ledger =  ledger;
        const rewards =  response.data.body.ledger.filter((x) => x.status == 'pending')
        const rewards_array = response.data.body.ledger.filter((x) => x.status != 'pending')
        const totalEarnings = rewards_array.reduce((sum,current) =>  sum + current.value,0)
          Set_user_data({
              "balance": response.data.body.balance,
              "lifetime": response.data.body.lifetime,
              "coins_on_way": rewards[0].value,
              "total_earnings": totalEarnings,
              "rewards_list": rewards_array
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
      {!showHistory ? <WalletCards showHistory={toggleHistoryTrue}  customer_id={customer_id}/> : null }
      {!showHistory ? <HowItWorks customer_id={customer_id} /> :  null}
      {!showHistory ? <History user_data={user_data} customer_id={customer_id}/> : null}
    </div>
  );
};

export default App;
