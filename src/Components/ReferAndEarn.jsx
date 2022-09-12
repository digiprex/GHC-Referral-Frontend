import "../css/referAndEarn.css";
import ReferAFriend from "./ReferAFriend.jsx";
import React, { Component, useEffect, useState } from "react";

export default function ReferAndEarn({customer_id, showHistory,Set_Referral_code}) {
  const [customer_Id,Set_customer_Id] = useState("");
  useEffect(()=>{
    Set_customer_Id(customer_id);
  },[customer_Id])
  return (
    <div className="referContainer">
      <div className="content">
        <div className="top-div-heading">Wellness is rewarding</div>
        <div className="top-heading">#GiftWellness</div>
        <div className="bottom-div-heading ">
          <div className="bottom-div-content" id="top">
            For every Friend you refer, you get 100 Mcash credits for their
            future purchases.
          </div>
          <div className="bottom-div-content" id="bottom">
            Redeem credits for Amazon Gift Vouchers
          </div>
        </div>
        <div className="coupon-image-div">
          <img
            className="coupon-image"
            src="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/gift-coupon.png?v=1653388246"
          />
        </div>
      </div>
      { true ? <ReferAFriend customer_id={customer_id} Set_Referral_code={Set_Referral_code}/> : null }
    </div>
  );
}
