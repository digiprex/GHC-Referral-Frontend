import {useState,React} from "react";
import EarningsCard from "./EarningsCard";
import VouchersCard from "./VouchersCard";
import "../css/History.css";

const History = ({user_data, customer_id}) => {
  const [trackHistory,setTrackHistory] = useState(false)
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
     { customer_id ?  <div className="how-it-works-container">
      <div className="how-heading">History</div>
      <div className="history-referral">
        <div className="history-referral-header">
           <span className="green-text">200 MCash Credits</span> are on your way!
        </div>
        <div className="history-referral-content">
            2 of your referrals orders are on the way - Mcash will be credited once they reach your friends. 
        </div>
      </div>
      <div className='rewardsAndBurnsContainer'>
            <div className='toggleButtons'>
                <button className='rewards' style={{backgroundColor: buttonsState.earningsButtonColor, color: buttonsState.earningsButtonTextColor }} onClick={showEarnings}> 
                    Earnings
                </button>
                <button className='rewards' style={{backgroundColor: buttonsState.vouchersButtonColor, color: buttonsState.vouchersButtonTextColor}} onClick={showVouchers}>
                    My Vouchers
                </button>
            </div>
            {buttonsState.earnings && user_data.rewards_list.map((item,key)=> (
                  <EarningsCard key={key} item={item} />
            ))}
            {buttonsState.vouchers && user_data.rewards_list.map((item,key)=> (
                <VouchersCard key={key} item={item} />  
            ))}
      </div>
    </div> : null }
    </>
  );
};

export default History;
