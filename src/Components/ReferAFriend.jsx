import React, { Component } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Modal } from "react-responsive-modal";
import { useEffect, useState } from "react";
import sharePic from '../images/share.png'
import copyPic from '../images/copy.png';
import Login from "./LoginPopup";
import "../css/referAFriend.css";
import axios from "axios";

export default function ReferAFriend({ customer_id }) {
  const [isMobile, SetIsMobile] = useState(false);
  const [clicked, Set_clicked] = useState(false);
  const [referral_code, Set_referral_code] = useState("");
  const [open, setOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openDesktopModal = () => {
    setIsOpen(true);
  };

  const closeDesktopModal = () => {
    setIsOpen(false);
  };

  const openMobileModal = () => {
    setOpen(true);
  };

  const closeMobileModal = () => {
    setOpen(false);
  };
  const share = () => {
    if(customer_id) {
      if (navigator.share) {
        navigator
        .share({
          title: "Referral",
          text: `Hey,buddy!\n ${referral_code} is my Mars by ghc referral code.\nYou get 20% off and free delivery on next order.\n
          Let's celebrate Good health and Wellness`,
          // url: "/",
          files:[{
            ".jpeg":"../images/Referral-share-image.jpeg"
          }]
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong", error);
        });
      }
    } else {
      openDesktopModal()
    }
}

  useEffect(() => {
    SetIsMobile(window.innerWidth > 480 ? true : false);
    // Set_customer_id(customer_Id)
    const data = {
      customer_id: customer_id,
    };
    const getReferralCode = async () => {
      const config = {
        method: "post",
        url: `${process.env.REACT_APP_REFERRAL_BASE_URL}/referral/createReferral`,
        headers: {
          "Content-Type": "application/json",
        },
        customer_id: customer_id,
        data: data
      };
      await axios(config)
        .then((response) => {
          Set_referral_code(response.data.body.referral_code);
        })
        .catch((error) => {
          console.log(error, "error");
        });
      config.url = `${process.env.REACT_APP_REFERRAL_BASE_URL}/referral/checkBalance`;
    };
    getReferralCode();
  }, [customer_id]);

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
        <div className="referral-code">
          { customer_id ? <div className="coupon">
            <div className="couponText">{referral_code.toUpperCase()}</div>
            <div className="copyCouponDiv">
                <button
                  onClick={(e) => copyToClipBoard(e)}
                  className={`copyCoupon ${clicked ? "copy-green" : ""}`}
                  type="button"
                  >
                  {/* <img src={copyPic} className="copy-pic-referral" alt="" srcset="" /> */}
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
      <BottomSheet open={open} onDismiss={closeMobileModal}>
        <Login />
      </BottomSheet>
      <Modal
        center
        open={modalIsOpen}
        onClose={closeDesktopModal}
        showCloseIcon={false}
        classNames={{
          modal:'custom-modal'
        }}
      >
        <Login />
      </Modal>
    </>
  );
}
