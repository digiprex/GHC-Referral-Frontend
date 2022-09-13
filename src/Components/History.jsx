import {useState,React,useRef} from "react";
import EarningsCard from "./EarningsCard";
import VouchersCard from "./VouchersCard";
import nocoinsPic from '../images/no-coins.png'
import live from '../images/live.png';
import ReferAFriend from "./ReferAFriend";
import sharePic from '../images/share.png'
import copyPic from '../images/copy-dark.png';
import { BottomSheet } from "react-spring-bottom-sheet";
import { Modal } from "react-responsive-modal";
import "../css/History.css";
import "../css/referAFriend.css";

const History = ({user_data, customer_id,focus_ref,code,Set_Referral_code}) => {
    const [trackHistory,setTrackHistory] = useState(false);
    const [clicked, Set_clicked] = useState(false);
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
          // const filesArray = [
          //   new File(
          //     '../images/Referral-share-image.jpeg',
          //     {
          //       type: "image/jpeg",
          //       lastModified: new Date().getTime()
          //     }
          //  )
          // ];
          navigator
          .share({
            title: "Referral",
            text: `Hey,buddy!\n Here is my Mars by ghc referral code - ${code}.\nYou get 20% off and free delivery on your next order.\n
            Let's celebrate Good health and Wellness`,
            // url: "/",
            // files:filesArray
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

      const copyToClipBoard = (obj) => {
        obj.target.innerHTML = "Copied";
        Set_clicked(true);
        navigator.clipboard.writeText(code);
      };
    const [buttonsState,setButtonState] = useState({
        earningsButtonColor: "white",
        earningsButtonTextColor:"#8D5468",
        earnings: true,
        spendsButtonColor:"#ebebeb",
        spendsButtonTextColor:"black",
        spends: false,
        vouchersButtonColor: "#ebebeb",
        vouchersButtonTextColor:"black",
        vouchers: false

    })

    const showEarnings = () =>{
        setButtonState({
            earningsButtonColor: "white",
            earningsButtonTextColor:"#8D5468",
            earnings: true,
            spendsButtonColor:"#ebebeb",
            spendsButtonTextColor:"black",
            spends: false,
            vouchersButtonColor: "#ebebeb",
            vouchersButtonTextColor:"black",
            vouchers: false
        })
    }

    const showVouchers = () => {
      setButtonState({
          earningsButtonColor: "#ebebeb",
          earningsButtonTextColor:"black",
          earnings: false,
          spendsButtonColor:"#ebebeb",
          spendsButtonTextColor:"black",
          spends: false,
          vouchersButtonColor: "white",
          vouchersButtonTextColor:"#8D5468",
          vouchers: true
      })
  }
  return (
    <>
     { customer_id && (user_data.number_of_pending_referrals || user_data.lifetime)?  <div className="history-container">
      <div className="how-heading" ref={focus_ref} >History</div>
      { (user_data.coins_on_way ) ?  <div className="history-referral" >
        <div className="history-referral-header">
           <div className="live-div">
                <img src={live} className='live-img' alt="" srcset="" />
           </div>
           <div className="live-div-content">
               <span className="green-text"> {user_data.coins_on_way} MCash Credits</span> are on your way!
           </div>
        </div>
        <div className="history-referral-content">
            <div style={{flex:1, visibility:"visible"}}>
                {/* <img src={live} className='live-img' alt="" srcset="" /> */}
            </div>
            <div style={{flex:10}}>
            {user_data.coins_on_way} MCash Credits will be added once your referral receives their order 
            </div>
        </div>
      </div> : null }
      <div className="mobile-history-header">
        History
      </div>
      <div className='rewardsAndBurnsContainer' >
            <div className='toggleButtons'>
                <button className='rewards' style={{backgroundColor: buttonsState.earningsButtonColor, color: buttonsState.earningsButtonTextColor }} onClick={showEarnings}> 
                    Earnings
                </button>
                <button className='rewards' id="vouchers" style={{backgroundColor: buttonsState.vouchersButtonColor, color: buttonsState.vouchersButtonTextColor}} onClick={showVouchers}>
                    My Vouchers
                </button>
            </div>
            { user_data?.rewards_list?.length  ? <div>
            {buttonsState.earnings && user_data.rewards_list.map((item,key)=> (
                <EarningsCard key={key} item={item} />
                ))} 
            </div> : 
            buttonsState.earnings && 
            <div>
                <div className="no-coins-pic"> 
                <img src={nocoinsPic} alt="" srcset="" />
                <div className="no-earnings">
                    You have no Earnings yet.
                </div>
                </div>  
                <div className="no-earnings-header">
                    To earn more MCash, refer your friends by sharing your code
                </div>
                <ReferAFriend customer_id={customer_id} Set_Referral_code={Set_Referral_code} inHistory={true}/>
            </div>
            }
            { (user_data?.pending_amazon_vouchers?.length || user_data?.vouchers_array?.length) ? <div>
                {buttonsState.vouchers && user_data.pending_amazon_vouchers.map((item,key)=> (
                    <VouchersCard key={key} item={item} pending="true"/>  
                ))}
                {buttonsState.vouchers && user_data.vouchers_array.map((item,key)=> (
                    <VouchersCard key={key} item={item} />  
                ))}
            </div> : 
             buttonsState.vouchers && 
              <div>
                <div className="no-coins-pic"> 
                <img src={nocoinsPic} alt="" srcset="" />
                <div className="no-earnings">
                  It appears that you don't have any vouchers yet
                </div>
                </div>  
                <div className="no-earnings-header">
                    To earn more MCash, refer your friends by sharing your code
                </div>
                <ReferAFriend customer_id={customer_id} Set_Referral_code={Set_Referral_code} inHistory={true}/>
              </div>
              }
      </div>
    </div> : null }
    </>
  );
};

export default History;
