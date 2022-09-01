import "../css/redeemPopup.css";
import Container from "@mui/material/Container";
import pic from "../images/goldcoin.png";
import minus from "../images/minus.png";
import plus from "../images/plus.png";
import share from "../images/small-share.png";
import next from "../images/next.png";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import React, { Component } from "react";
import axios from "axios";

export default function RedeemPopup({ user_data, customer_id,closeDesktopModal }) {
  const [redeemAmount, setRedeemAmount] = useState(1000);
  const [progress_amount, Set_progress_amount] = useState(0);
  const [friend_to_refer_for_redemption,Set_friend_to_refer_for_redemption] = useState(0);
  user_data.balance = 900;
  const mcash_for_redeem_pending = (user_data.balance%500);
  const can_redeem = (user_data/500);
  const number_of_more_friends_to_refer = (500-(mcash_for_redeem_pending))/100;
  const next_redemption_amount = user_data.balance+mcash_for_redeem_pending;
  // Set_friend_to_refer_for_redemption(number_of_more_friends_to_refer);
  const decrement = () => {
    if (redeemAmount - 500 >= 0) {
      setRedeemAmount(redeemAmount - 500);
    } 
  };
  const increment = () => {
    if (redeemAmount + 500 <= user_data.balance) {
      setRedeemAmount(redeemAmount + 500);
    } else {
      alertUser(redeemAmount + 500)
    }
  };

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

        alert('success')
      })
      .catch((error) => {
        console.log(error);
        alert(error)
      });
  };
  useEffect(() => {
    const progress_value = ((parseInt(user_data.balance % 500) / 500 )*100) || 0
    Set_progress_amount(progress_value);
  }, []);
  return (
    <>
      <Container>
        <div className="modalContainer">
          <div className="headerContent">
            <div className="modalHeader">Redeem Credits</div>
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
          <div className="redeem-message">
            You can only redeem in multiples of 500 
          </div>
          <div className="coinsList">
            <div className="fiveHundred">
              <div
                className="fiveHundredText"
                onClick={() => user_data.balance >= 500 ? setRedeemAmount(500) : alertUser(500)}
              >
                500
              </div>
            </div>
            <div className="thousand">
              <div
                className="thousandText"
                onClick={() => user_data.balance >= 1000 ? setRedeemAmount(1000) : alertUser(1000)}
              >
                1000
              </div>
            </div>
            <div className="fifteenHundred">
              <div
                className="fifteenHundredText"
                onClick={() => user_data.balance >= 1500 ? setRedeemAmount(1500) : alertUser(1500)}
              >
                1500
              </div>
            </div>
          </div>
          <div className="earnAndSave">
            <div className="saveHeader">Gift More. Save More.</div>
            <div className="saveContent">
              <img src={share} alt="" style={{}} />
              <span className="save-content-text">
                100 Mcash credits for every referral order
              </span> 
            </div>
            <div className="saveContent bottom">
              <img src={next} alt="" style={{}} /> 
              <span className="save-content-text">
                Redeem Credits for Amazon gift vouchers
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
          onClick={() => closeDesktopModal()}
        >
          Redeem Now
        </button>
      </Container>
    </>
  );
}
