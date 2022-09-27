import { useEffect, useState } from "react";
import React, { Component } from "react";
import "../css/LoginPopup.css";

export default function LoginPopup({cashName}) {
  const redirectToShopifyHome = () => {
    window.location.href = process.env.REACT_APP_LOGIN_REDIRECT_URL;
  }
  return (
    <>
        <div className="header-content">
          <div className="modal-Header">Log in to continue</div>
          <div className="login-modal-content">
            Earn {cashName} credits and get access to exclusive rewards 
          </div>
          <div className="how-login-button-div">
            <button className="login-button-popup" onClick={() => redirectToShopifyHome()}>Log In</button>
          </div>
        </div>
    </>
  );
}
