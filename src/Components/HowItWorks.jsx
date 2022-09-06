import React from "react";
import Login from "./LoginPopup";
import { Modal } from "react-responsive-modal";
import cashPic from '../images/mcash.png'
import "../css/howItWorksCards.css";
import { BottomSheet } from "react-spring-bottom-sheet";
import { useState } from "react";

const HowItWorks = ({customer_id,user_data}) => {
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


  return (
    <>
      <div className="how-it-works-container">
        <div className="mobile-how-it-works-header">
          Refer and Earn
        </div>
        <div className="mobile-how-it-works-sub-heading">
          For every Friend you refer, you get 100 Mcash credits for their future purchases.
          Redeem credits for Amazon gift vouchers.
        </div>
        <div className="how-heading">How it works</div>
        { customer_id  && !user_data.lifetime ? <div className="mcash-balance-nil">
          <div className="mcash-header"> <span className="mcash-pic"> <img src={cashPic} alt="" srcset="" /> </span> MCash Balance</div>
          <div className="mcash-content">
            You will be able to see your MCash balance when your referrals place
            an order using your code. Come back later to check.{" "}
          </div> 
        </div> : null}
        <div className="how-content-div">
          <div className="how-content">
            <div className="img-reward">
              <img
                src="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/image-1.png?v=1660124046"
                alt=""
                srcset=""
              />
            </div>
            <div className="how-sub-div">
              <div className="img-content">Refer a friend</div>
              <div className="img-sub-content">
                Share your code with your friends
              </div>
            </div>
          </div>
          <div className="how-content">
            <div className="img-reward">
              <img
                src="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/image-2.png?v=1660124046"
                alt=""
                srcset=""
              />
            </div>
            <div className="how-sub-div">
              <div className="img-content">Use code to shop</div>
              <div className="img-sub-content">
                Your friend gets 20% off on his purchase using your code.
              </div>
            </div>
          </div>
          <div className="how-content">
            <div className="img-reward">
              <img
                src="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/image-3.png?v=1660124046"
                alt=""
                srcset=""
              />
            </div>
            <div className="how-sub-div">
              <div className="img-content">Earn Mcash</div>
              <div className="img-sub-content">
                You earn 100 Mcash credits once the order gets delivered
              </div>
            </div>
          </div>
          <div className="how-content">
            <div className="img-reward">
              <img
                src="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/image-4.png?v=1660124046"
                alt=""
                srcset=""
              />
            </div>
            <div className="how-sub-div">
              <div className="img-content">Redeem Mcash</div>
              <div className="img-sub-content">
                Redeem Mcash for Amazon gift vouchers.{" "}
              </div>
            </div>
          </div>
        </div>
       { !customer_id ? <div className="how-login">
          <div className="how-login-text">
            Log In and unlock these exciting rewards. Let’s go!
          </div>
          <div className="how-login-button-div">
            <button
              className="how-login-button"
              onClick={
                openDesktopModal
              }
            >
              Log In
            </button>
          </div>
        </div> : null}
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
};

export default HowItWorks;
