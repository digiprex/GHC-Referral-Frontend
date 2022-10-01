import { useEffect, useState } from "react";
import constants from "../lib/constants";
import React, { Component } from "react";
import alertImage from '../images/alert.png';
import sharePic from '../images/share.png';
import "../css/NoMcashPopUp.css";
import "../css/referAndEarn.css";
import { type } from "@testing-library/user-event/dist/type";

export default function NoMcashPopUp({closeNoMcashPopUp,code,cashName}) {
  const share = () => {
      if (navigator.share) {
        const blob = fetch("https://cdn.shopify.com/s/files/1/0607/6029/3588/files/Whatsapp_referral_image.jpg?v=1664651803");
        const file = new File([blob],'Whatsapp_referral_image.jpg',{type:"image/jpeg"})
        navigator
        .share({
          files:[file],
          title: "Referral",
          text: `Hey,buddy!\nHere is my ${process.env.REACT_APP_BRAND} by ghc referral code - ${code}.\nYou get 20% off and free delivery on your next order.\nLet's celebrate Good health and Wellness`
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong", error);
        });
      }
  }
  return (
    <>
      <div className="modalContainer">
        <div className="header-content">
          <div className="alert-image">
            <img src={alertImage} alt="" srcset="" />
          </div>
          <div className="modal-Header">You don’t have enough {cashName}</div>
          <div className="login-modal-content-mcash">You need atleast 500 {cashName} credits to redeem. Refer more to earn more</div>
          <div className={`referFriend-in-nomcash `} href="#referFriend" onClick={() => {closeNoMcashPopUp(); share()}}> 
              {/* <div className="share-img-div">
              </div> */}
              <div className="referText">
                <img src={sharePic}  alt="" className='sharePic'  />
                {constants.BANNER_REFER_A_FRIEND_TEXT}
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
