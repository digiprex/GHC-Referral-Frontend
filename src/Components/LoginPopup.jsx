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
          <div className="modalHeader">Log in to continue</div>
          <div className="login-input">
            <input
              className="login-input-text"
              type="text"
              placeholder="username"
            />
          </div>
          <div className="login-input">
            <input
              className="login-input-text"
              type="text"
              placeholder="password"
            />
          </div>
          <div className="how-login-button-div">
            <button className="login-button-popup" onClick={() => redirectToShopifyHome()}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}
