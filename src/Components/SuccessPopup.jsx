import { useEffect, useState } from "react";
import React, { Component } from "react";
import successImage from '../images/success.png'
import "../css/Success.css";

export default function SuccessPopup({close_SuccessPopup,handleClick}) {

  const focusOnVouchers = () => {
    close_SuccessPopup();
    document.getElementById("vouchers").click()
    handleClick();
  }
  return (
    <>
      <div className="modalContainer">
        <div className="header-content">
          <div className="success-image">
            <img src={successImage} alt="" srcset="" />
          </div>
          <div className="success-modal-Header">Congratulations!</div>
          <div className="success-modal-content top-content">
              Your Redemption request was submitted.
          </div>
          <div className="success-modal-content success-down-content">
            We will generate your Amazon voucher code and send it on your registered account within 24 hours
          </div>
          <div className="how-login-button-div" onClick={() => focusOnVouchers()}>
            <button className="success-button-popup">My Vouchers</button>
          </div>
        </div>
      </div>
    </>
  );
}
