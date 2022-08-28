import React, { Component } from "react";
import { useEffect, useState } from "react";
import sharePic from '../images/share.png'
import copyPic from '../images/copy.png';
import "../css/referAFriend.css";
import axios from "axios";

export default function ReferAFriend({ customer_id }) {
  const [isMobile, SetIsMobile] = useState(false);
  const [clicked, Set_clicked] = useState(false);
  const [referral_code, Set_referral_code] = useState("");
  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Something",
          text: "Hello, please come visit my website",
          url: "www.website.com.br",
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong", error);
        });
    }
  }

  useEffect(() => {
    SetIsMobile(window.innerWidth > 480 ? true : false);
    const data = {
      customer_id: "4320944390308",
    };
    const getReferralCode = () => {
      const config = {
        method: "post",
        url: `http://${process.env.REACT_APP_REFERRAL_BASE_URL}/referral/createReferral`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then((response) => {
          Set_referral_code(response.data.body.referral_code);
        })
        .catch((error) => {
          console.log(error, "error");
        });
      config.url = `http://${process.env.REACT_APP_REFERRAL_BASE_URL}/referral/checkBalance`;
    };
    getReferralCode();
  }, []);

  const copyToClipBoard = (obj) => {
    obj.target.innerHTML = "Copied";
    Set_clicked((prevState) => !prevState);
    navigator.clipboard.writeText(referral_code);
  };
  return (
    <>
      <div className="referAFriendContainer">
        {customer_id ? (
          <div className="refer-code-header">My Referral Code</div>
        ) : null}
        <div className="code">
          { customer_id ? <div className="coupon">
            <div className="couponText">{referral_code.toUpperCase()}</div>
            <div className="copyCouponDiv">
                <button
                  onClick={(e) => copyToClipBoard(e)}
                  className={`copyCoupon ${clicked ? "copy-green" : ""}`}
                  type="button"
                  >
                  <img src={copyPic} className="copy-pic-referral" alt="" srcset="" />
                  Copy Code
                </button>
            </div>
          </div> : null }
          <div className="refer-friend-container">
            <div className={`referFriend ${customer_id ? "refer-friend-width-with-customer-id" : 
          "refer-friend-width-no-customer-id"}`} onClick={() => share()}> 
              {/* <div className="share-img-div">
              </div> */}
              <div className="referText">
                <img src={sharePic} alt="" className='sharePic'  />
                Refer A Friend
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
