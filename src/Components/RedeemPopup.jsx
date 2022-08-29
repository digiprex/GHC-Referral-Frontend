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

export default function RedeemPopup({ user_data }) {
  const [redeemAmount, setRedeemAmount] = useState(1000);
  const [progress_amount, Set_progress_amount] = useState(10);
  const balanceAmount = 1600;
  const decrement = () => {
    console.log('decrement')
    if (redeemAmount - 500 >= 0) {
      setRedeemAmount(redeemAmount - 500);
    }
  };
  const increment = () => {
    if (redeemAmount + 500 <= user_data.balance) {
      setRedeemAmount(redeemAmount + 500);
    }
  };

  const redeemCoins = async () => {
    console.log(redeemAmount, "redeem amount");
    const data = {
      customer_id: c,
      redeem: redeemAmount,
    };
    const config = {
      method: "post",
      url: `http://${process.env.REACT_APP_REFERRAL_BASE_URL}/referral/redeem`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then((response) => {
        console.log(response.data, "resp body");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    // const progress_value = (parseInt(user_data.balance) * 100) / 2000;
    const progress_value = 10;
    Set_progress_amount(progress_value);
  }, []);
  return (
    <>
      <Container>
        <div className="modalContainer">
          <div className="headerContent">
            <div className="modalHeader">Redeem Coins</div>
            <div className="redeemCoinBalance">
              <div className="redeemCoinBalanceText">Balance:</div>
              <div className="redeemCoinBalanceAmount">{user_data.lifetime}</div>
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
          <div className="coinsList">
            <div className="fiveHundred">
              <div
                className="fiveHundredText"
                onClick={() => setRedeemAmount(500)}
              >
                500
              </div>
            </div>
            <div className="thousand">
              <div
                className="thousandText"
                onClick={() => setRedeemAmount(1000)}
              >
                1000
              </div>
            </div>
            <div className="fifteenHundred">
              <div
                className="fifteenHundredText"
                onClick={() => setRedeemAmount(1500)}
              >
                1500
              </div>
            </div>
          </div>
          <div className="earnAndSave">
            <div className="saveHeader">Earn More. Save More.</div>
            <div className="saveContent">
              <img src={share} alt="" style={{}} /> 100 coins for every referral
              order
            </div>
            <div className="saveContent bottom">
              <img src={next} alt="" style={{}} /> Use these Coins to save on
              your next purchase
            </div>
          </div>
          <div className="referMore">
            Refer 4 more friends to unlock{" "}
            <span
              style={{ color: "green", fontSize: "10px" }}
              className="greenText"
            >
              2000 coins
            </span>
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
          onClick={() => redeemCoins()}
        >
          Redeem Now
        </button>
      </Container>
    </>
  );
}
