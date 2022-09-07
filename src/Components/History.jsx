import {useState,React} from "react";
import EarningsCard from "./EarningsCard";
import VouchersCard from "./VouchersCard";
import nocoinsPic from '../images/no-coins.png'
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
     { customer_id && (user_data.number_of_pending_referrals || user_data.lifetime)?  <div className="history-container">
      <div className="how-heading">History</div>
      { (user_data.coins_on_way ) ?  <div className="history-referral">
        <div className="history-referral-header">
           <span className="green-text"> {user_data.coins_on_way} MCash Credits</span> are on your way!
        </div>
        <div className="history-referral-content">
            {user_data.number_of_pending_referrals} of your referrals orders are on the way - Mcash will be credited once they reach your friends. 
        </div>
      </div> : null }
      <div className='rewardsAndBurnsContainer'>
            <div className='toggleButtons'>
                <button className='rewards' style={{backgroundColor: buttonsState.earningsButtonColor, color: buttonsState.earningsButtonTextColor }} onClick={showEarnings}> 
                    Earnings
                </button>
                <button className='rewards' style={{backgroundColor: buttonsState.vouchersButtonColor, color: buttonsState.vouchersButtonTextColor}} onClick={showVouchers}>
                    My Vouchers
                </button>
            </div>
            { user_data?.rewards_list?.length  ? <div>
            {buttonsState.earnings && user_data.rewards_list.map((item,key)=> (
                <EarningsCard key={key} item={item} />
                ))} 
            </div> : 
            buttonsState.earnings && <div className="no-coins-pic"> 
                <img src={nocoinsPic} className="no-coins-img" alt="" srcset="" />
                <div className="no-earnings">
                    You don't have any earnings yet.
                </div>
            </div> }
            { (user_data?.pending_amazon_vouchers?.length || user_data?.vouchers_array?.length) ? <div>
                {buttonsState.vouchers && user_data.pending_amazon_vouchers.map((item,key)=> (
                    <VouchersCard key={key} item={item} pending="true"/>  
                ))}
                {buttonsState.vouchers && user_data.vouchers_array.map((item,key)=> (
                    <VouchersCard key={key} item={item} />  
                ))}
            </div> : 
             buttonsState.vouchers && <div className="no-coins-pic"> 
                <img src={nocoinsPic} alt="" srcset="" />
                <div className="no-earnings">
                It appears that you don't have any vouchers yet
                </div>
            </div>  }
      </div>
    </div> : null }
    </>
  );
};

export default History;
