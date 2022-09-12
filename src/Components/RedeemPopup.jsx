import "../css/redeemPopup.css";
import Container from "@mui/material/Container";
import pic from "../images/goldcoin.png";
import minus from "../images/minus.png";
import plus from "../images/plus.png";
import share from "../images/small-share.png";
import share_saturn from '../images/share-saturn.png';
import redeem_saturn from '../images/redeem-saturn.png'
import { Modal } from "react-responsive-modal";
import next from "../images/next.png";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import React, { Component } from "react";
import axios from "axios";

export default function RedeemPopup({ user_data, customer_id,closeDesktopModal,open_SuccessPopup,closeMobileModal }) {
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [progress_amount, Set_progress_amount] = useState(0);
  const [loading_state,Set_loading_state] = useState(false);
  const [friend_to_refer_for_redemption,Set_friend_to_refer_for_redemption] = useState(0);
  const mcash_for_redeem_pending = (user_data.balance%500);
  const can_redeem = (user_data/500);
  const number_of_more_friends_to_refer = (500-(mcash_for_redeem_pending))/100;
  const next_redemption_amount = user_data.balance+mcash_for_redeem_pending;
  // Set_friend_to_refer_for_redemption(number_of_more_friends_to_refer);
  const decrement = () => {
    if (redeemAmount == 0) {
      document.getElementById("error-text-redeem").style.visibility = "hidden"
    } else if ( redeemAmount - 500 >= 0) {
     setRedeemAmount(redeemAmount - 500);
     document.getElementById("error-text-redeem").style.visibility = "hidden"
    } else {
      document.getElementById("error-text-redeem").style.visibility = "visible"
    }
  };
  const increment = () => {
    if (redeemAmount + 500 <= user_data.balance) {
      setRedeemAmount(redeemAmount + 500);
      document.getElementById("error-text-redeem").style.visibility = "hidden"
    } else {
      document.getElementById("error-text-redeem").style.visibility = "visible"
    }
  };

  const setAmount = (amount,id) => {
    if(redeemAmount + amount <= user_data.balance) {
    setRedeemAmount(redeemAmount+amount);
    document.getElementById("error-text-redeem").style.visibility = "hidden"
    } else {
      document.getElementById("error-text-redeem").style.visibility = "visible"
    }
   }

  const alertUser = (amount) => {
    alert(`Balance less than ${amount}`)
  }

  const redeemCoins = async () => {
    const data = {
      customer_id: customer_id,
      redeem: redeemAmount,
    };
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_REFERRAL_BASE_URL}/referral/redeem`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
    .then((response) => {
      closeDesktopModal();
      open_SuccessPopup();
      closeMobileModal();
      })
    .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const progress_value = ((parseInt(user_data.balance % 500) / 500 )*100) || 0
    Set_progress_amount(progress_value);
    if(user_data.balance < 1500) {
      document.getElementById("fifteenHundred").style.color="#C4C4C4";
      document.getElementById("fifteenHundred").style.cursor="no-drop";
      document.getElementById("fifteenHundred").disabled= true;
    }
    if( user_data.balance < 1000) {
      document.getElementById("thousand").style.color="#C4C4C4";
      document.getElementById("thousand").style.cursor="no-drop";
      document.getElementById("thousand").disabled= true;
    }
  }, []);
  return (
    <>
      <Container>
        <div className="modalContainer">
          <div className="headerContent">
            <div className="modalHeader">Redeem Credits</div>
          </div>
          <div className="sub-heading-redeem">
            <div className="redeem-message">
              You can only redeem in multiples of 500 
            </div>
            <div className="redeemCoinBalance">
              <div className="redeemCoinBalanceText">Balance:</div>
              <div className="redeemCoinBalanceAmount">{user_data.balance}</div>
            </div>
          </div>
          <div className="addCoins">
            <div className="minus" onClick={() => decrement()}>
              <img src={minus} alt="" />
            </div>
            <div className="addCoinsText">
              <img src={pic} alt="" /> {redeemAmount}
            </div>
            <div className="plus" onClick={() => increment()}>
              <img src={plus} alt="" />
            </div>
          </div>
          <div id="error-text-redeem">
            Enter a value less than the current balance 
          </div>
          <div className="coinsList">
            <button className="fiveHundred" id="fiveHundred" onClick={() =>{setAmount(500,"fiveHundred");}}>
                500
            </button>
            <button className="thousand" id="thousand" onClick={(e) =>setAmount(1000,"thousand")}>
                1000
            </button>
            <button className="fifteenHundred" id="fifteenHundred" onClick={(e) => setAmount(1500,"fifteenHundred")}>
                1500
            </button>
          </div>
          <div className="earnAndSave">
            <div className="saveHeader">Gift More. Save More.</div>
            <div className="saveContent">
              <img src={share_saturn} alt="" style={{}} />
              <span className="save-content-text">
                100 Mcash credits for every referral order
              </span> 
            </div>
            <div className="saveContent bottom">
              <img src={redeem_saturn} alt="" style={{}} /> 
              <span className="save-content-text">
                Redeem credits for Amazon gift vouchers
              </span>
            </div>
          </div>
          <div className="referMore">
            <div>
            Refer {number_of_more_friends_to_refer} more friends to reach{"  "}
            <span
              style={{ color: "green", fontSize: "10px" }}
              className="greenText"
              >
              {user_data.balance+number_of_more_friends_to_refer*100} Mcash credits
            </span>
            </div> 
          </div>
        </div>
        <div className="progressBar">
          <LinearProgress
            color="success"
            variant="determinate"
            value={progress_amount}
          />
        </div>
        <button
          id="redeemBtn"
          className="redeemButtonPopUp"
          type="button"
          onClick={() => {redeemCoins()}}
        >
          Redeem Now
        </button>
       
      </Container>
    </>
  );
}
