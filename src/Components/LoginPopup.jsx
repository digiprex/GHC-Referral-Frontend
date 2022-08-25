import { useEffect, useState } from "react";
import React, { Component } from "react";
import "../css/LoginPopup.css";

export default function LoginPopup() {
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
            <button className="login-button-popup">Login</button>
          </div>
        </div>
      </div>
    </>
  );
}
