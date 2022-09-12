import { useEffect, useState } from "react";
import React, { Component } from "react";
import alertImage from '../images/alert.png';
import sharePic from '../images/share.png';
import "../css/NoMcashPopUp.css";
import "../css/referAndEarn.css";

export default function NoMcashPopUp({closeNoMcashPopUp,code}) {
  const share = () => {
      if (navigator.share) {
        navigator
        .share({
          title: "Referral",
          text: `Hey,buddy!\n Here is my Mars by ghc referral code - ${code}.\nYou get 20% off and free delivery on your next order.\n
          Let's celebrate Good health and Wellness`,
          // url: "/",
          // files:filesArray
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
          <div className="modal-Header">You don’t have enough Mcash</div>
          <div className="login-modal-content-mcash">
            You need atleast 500 Mcash credits to redeem. Refer more to earn more 
          </div>
          <div className={`referFriend `} href="#referFriend" onClick={() => {closeNoMcashPopUp(); share()}}> 
              {/* <div className="share-img-div">
              </div> */}
              <div className="referText">
                <img src={sharePic}  alt="" className='sharePic'  />
                Refer A Friend
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
