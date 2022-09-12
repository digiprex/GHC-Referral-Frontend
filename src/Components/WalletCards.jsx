import React, { Component } from "react";
import "../css/walletCards.css";
import "../css/coinBalanceCard.css";
import CoinBalanceCard from "./CoinBalanceCard";
import giftPic from "../images/gift.png";
import discountIcon from "../images/discount.png";
import pic from "../images/WalletCardImage.jpg";

export default function WalletCards({ showHistory, user_data, customer_id }) {
  return (
    <>
      { customer_id && (user_data.number_of_pending_referrals || user_data.lifetime) ? <div className="walletCardsContainer">
        <div className="coinBalanceCardContainer">
        { user_data.coins_on_way ? <div className="coinsOnWayFlex">
            <div className="gift-pic-div">
              <img src={giftPic} className="giftPic" alt="" />
            </div>
              <div className="coinsOnWay">
              <span className="onWayCoinsNumber">{user_data.coins_on_way}</span>
              &nbsp;Mcash credits are on the way
              {/* <Chip label="200" classes={onWayCoinsNumber} component="a" href="#basic-chip" /> &nbsp;coins are on the way */}
            </div> 
          </div> : null}
          { user_data.amazon_voucher_value ? <div className="coinsOnWayFlex">
            <div className="gift-pic-div">
              <img src={discountIcon} className="giftPic" alt="" />
            </div>
            <div className="coinsOnWay">
              You earned Amazon vouchers worth &nbsp;
              <span className="onWayCoinsNumber" style={{color:"#1DBA78"}}>{user_data.amazon_voucher_value}</span>
              {/* <Chip label="200" classes={onWayCoinsNumber} component="a" href="#basic-chip" /> &nbsp;coins are on the way */}
            </div>
          </div> : null}
          {/* <div className="savedMoneyCard">
            <img src={discountIcon} className="giftPic" alt="" />
            <div className="coinsOnWayFlex savedMoney">
              <div>
                You earned Amazon vouchers worth &nbsp;{" "}
              </div>
              <span className="onWayCoinsPriceNumber"> &#8377;1000</span> &nbsp;
            </div>
          </div> */}
        </div>
        <div className="coinBalanceCardContainer container-dash-border">
          <CoinBalanceCard user_data={user_data} showHistory={showHistory}customer_id={customer_id} />
        </div>
      </div> : null }
    </>
  );
}
