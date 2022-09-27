import React, { Component } from "react";
import constants from '../lib/constants';
import { BottomSheet } from "react-spring-bottom-sheet";
import { Modal } from "react-responsive-modal";
import { useEffect, useState } from "react";
import sharePic from '../images/share.png'
import copyPic from '../images/copy-dark.png';
import Login from "./LoginPopup";
import "../css/referAFriend.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

export default function ReferAFriend({ customer_id,Set_Referral_code,inHistory,brand}) {
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

  const getShareText = (code) => {
    return 
  }

  const share = () => {
    if(customer_id) {
      if (navigator.share) {
        navigator
        .share({
          title: "Referral",
          text: `Hey,buddy!\nHere is my Mars by ghc referral code - ${referral_code}.\nYou get 20% off and free delivery on your next order.\nLet's celebrate Good health and Wellness`,
          // url: "/",
          // files:filesArray
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error(error);
        });
      }
    } else {
      openDesktopModal()
    }
}

  useEffect(() => {
    SetIsMobile(window.innerWidth > 480 ? true : false);
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
          Set_Referral_code(response.data.body.referral_code);
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
    Set_clicked(true);
    navigator.clipboard.writeText(referral_code);
  };
  return (
    <>
      <div className={ `${inHistory? "referAFriendContainer-inHistory": "referAFriendContainer"}`} id="referFriend">
        {(customer_id && !inHistory) ? (
          <div className="refer-code-header">{constants.BANNER_REFERRAL_CODE_INPUT_LABEL}</div>
        ) : null}
        <div className={`${inHistory ? "referral-code-in-history": "referral-code"}`}>
          { customer_id ? <div className={`coupon ${inHistory ? "dotted-box": ""}`}>
            <div className="couponText">
             { referral_code ? referral_code.toUpperCase() :
             <Backdrop
             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
             open
           >
             <CircularProgress color="inherit" />
             </Backdrop>
              }
            </div>
            <div className="copyCouponDiv">
                <button
                  onClick={(e) => copyToClipBoard(e)}
                  className={`copyCoupon ${clicked ? "copy-green" : ""}`}
                  type="button"
                  >
                  <img src={copyPic} className="copy-pic-referral" alt="" srcset="" />
                  {constants.BANNER_COPY_CODE_TEXT}
                </button>
            </div>
          </div> : null }
          <div className="refer-friend-container">
            <div className={`referFriend ${customer_id ? "refer-friend-width-with-customer-id" : 
          "refer-friend-width-no-customer-id"}`} onClick={() => share()}> 
              <div className="referText">
                <img src={sharePic} alt="" className='sharePic'  />
                {constants.BANNER_REFER_A_FRIEND_TEXT}
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
