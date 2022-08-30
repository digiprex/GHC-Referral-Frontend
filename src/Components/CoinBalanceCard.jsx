import "../css/coinBalanceCard.css";
// import coinPic from './images/onlycoin.png'
import pic from "../images/coin symbol.jpg";
import historyPic from "../images/history3.png";
import React, { useState, useContext, createContext, useEffect } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Chip from "@mui/material/Chip";
// import Modal from 'react-modal';
import RedeemPopup from "./RedeemPopup";
import axios from "axios";
const mobileViewContext = createContext();

export default function CoinBalanceCard({ showHistory, user_data, customer_id }) {
  const [open, setOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
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

  useEffect(() => {}, []);

  return (
    <>
      <div className="coinBalanceHeading">
        MCash Balance:
        <div className="history" onClick={() => showHistory()}>
          <img
            style={{ marginRight: "5px", height: "10px" }}
            src={historyPic}
            alt=""
          />{" "}
          History
        </div>
      </div>
      <div className="coinBalanceCard">
        <img
          src="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/new_cash.png?v=1653396179"
          className="coinPic"
          alt=""
        />
        <div className="coinBalanceRightSection">
          <div style={{ flex: 1 }} className="earnings-div">
            <div className="headerCard">MCash Balance</div>
            <div className="coinBalanceDiv">
              <div className="coinBalance">{user_data.balance}</div>
            </div>
          </div>
          <div style={{ flex: 1 }} className="earnings-div-mobile">
            <div className="coinBalanceDiv" style={{display: "flex", justifyContent: "center"}}>
              <div className="coinBalance">{user_data.balance}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="lifetime-earnings">
        <span className="earnings">Lifetime earnings:</span>
        <span className="amount">&#8377;{user_data.lifetime}</span>
      </div>
      <div className="button-container">
        <button
          id="redeemBtn"
          onClick={window.innerWidth > 480 ? openDesktopModal : openMobileModal}
          className="redeem"
          type="button"
        >
          {/* () => setOpen(true) */}
          Redeem Now
        </button>
        <BottomSheet open={open} onDismiss={closeMobileModal}>
          <RedeemPopup user_data={user_data} customer_id={customer_id} />
        </BottomSheet>
        <Modal
          // isOpen={modalIsOpen}
          // onRequestClose={closeDesktopModal}
          center
          open={modalIsOpen}
          onClose={closeDesktopModal}
          // classNames={{
          //     overlay: 'customOverlay',
          //     modal: 'customModal',
          // }}
          // style={customStyles}
          // className="desktopModal"
          // overlayClassName="overlay"
          // className='desktopPopup'
          // ariaHideApp={false}
          // contentLabel="Desktop Modal"
        >
          <RedeemPopup user_data={user_data} customer_id={customer_id} />
        </Modal>
      </div>
      {/* <div id="myModal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <p>Some text in the Modal..</p>
                    </div>
                </div> */}
    </>
  );
}
