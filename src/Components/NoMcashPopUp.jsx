import { useEffect, useState } from "react";
import React, { Component } from "react";
import alertImage from '../images/alert.png'
import "../css/NoMcashPopUp.css";

export default function NoMcashPopUp() {
  const redirectToShopifyHome = () => {
    window.location.href = process.env.REACT_APP_LOGIN_REDIRECT_URL;
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
          {/* <div className="how-login-button-div">
            <button className="login-button-popup" onClick={() => redirectToShopifyHome()}>Log In</button>
          </div> */}
        </div>
      </div>
    </>
  );
}
