import React, {Component} from 'react'
import '../css/coinHistoryOrderCard.css'
import pic from '../images/voucher.png';
import copyPic from '../images/copy.png'
import amazon from '../images/amazon.png'
import calenderPic from '../images/calender.png';
import coinPic from '../images/500coin.jpg';
import { useState } from 'react';

export default function VouchersCard({item,code}) {
    const date = new Date(item.createdAt);
    const [clicked,Set_clicked] = useState(false);
    const required_date = `${date.getDate()} ${date.toLocaleString('en-US', {month: 'short'})} ${date.getFullYear()} `
    
    const copyToClipBoard = (obj) => {
        const text = document.getElementById('copy-code-text') 
        text.innerHTML = "Copied";
        Set_clicked(true);
        navigator.clipboard.writeText(code)
    }
    return (
        <>
            <div className='orderCardContainer'>
                <img className='fire' src={pic} alt="" />
                <div className='historyContentCard'>
                    <div className='historyContent2'>
                        <div className='left-section'>
                            <div className='amazon-coupon'>
                                {code}
                                <img className='copy-border' src={amazon} alt="" />
                            </div>
                            <div className='coupon-description'>
                                Flat 500 off
                            </div>
                        </div>
                        <div className='right-section'>
                            <div className='coupon-status'>
                                <span className='status-dot'></span>  Active
                            </div>
                            <div className='copy-coupon'>
                                <button className={`copy-coupon-button ${clicked? "copy-green" : ""}`} onClick={(e) => copyToClipBoard(e)}>
                                    <img className='coupon-pic' src={copyPic} alt="" />
                                    <span id='copy-code-text'>Copy code</span> 
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='historyInfo'>
                        <img src={calenderPic} className='calender' alt="" />
                        <span className='historyDate'> Redeemed 500 coins on {required_date}</span>
                    </div>
                </div>
            </div>
        </>
    )
}