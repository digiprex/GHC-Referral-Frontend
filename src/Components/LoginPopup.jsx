import { useEffect, useState } from "react";
import React, { Component } from "react";
import "../css/LoginPopup.css";

export default function LoginPopup() {
  const redirectToShopifyHome = () => {
    window.location.href = process.env.REACT_APP_LOGIN_REDIRECT_URL;
  }
  return (
    <>
      <div className="modalContainer">
        <div className="header-content">
          <div className="modal-Header">Log in to continue</div>
          <div className="login-modal-content">
            Earn MCash credits and get Access to exclusive rewards 
          </div>
          <div className="how-login-button-div">
            <button className="login-button-popup" onClick={() => redirectToShopifyHome()}>Log In</button>
          </div>
        </div>
      </div>
    </>
  );
}
