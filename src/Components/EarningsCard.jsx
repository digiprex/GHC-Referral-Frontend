import React, {Component} from 'react'
import '../css/coinHistoryOrderCard.css'
import pic from '../images/fire.png';
import calenderPic from '../images/calender.png';
import coinPic from '../images/500coin.jpg';
import { useEffect } from 'react';

export default function EarningsCard({item}) {
    const date = new Date(item.createdAt);
    const required_date = `${date.getDate()} ${date.toLocaleString('en-US', {month: 'short'})} ${date.getFullYear()} `
   
    return (
        <>
            <div className='orderCardContainer'>
                <img className='fire' src={pic} alt="" />
                <div className='historyContentCard'>
                    <div className='historyContent'>
                        <div className='earn-record'>
                            Earned <span className='coins'>{item.value} Cash credits</span>  on referral order
                        </div>
                        <div className='earn-image'>
                            <img src={coinPic} className='coin-pic' alt="" />
                        </div>
                    </div>
                    <div className='historyInfo'>
                        <img src={calenderPic} className='calender' alt="" />
                        <span className='historyDate'> {required_date}</span>
                    </div>
                </div>
            </div>
        </>
    )
}