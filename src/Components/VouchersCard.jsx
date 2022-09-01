import React, {Component} from 'react'
import '../css/coinHistoryOrderCard.css'
import pic from '../images/voucher.png';
import copyPic from '../images/copy.png'
import amazon from '../images/amazon.png'
import calenderPic from '../images/calender.png';
import { useState } from 'react';

export default function VouchersCard({item,code,pending}) {
    const date = new Date(item.createdAt);
    const [clicked,Set_clicked] = useState(false);
    const required_date = `${date.getDate()} ${date.toLocaleString('en-US', {month: 'short'})} ${date.getFullYear()} `
    console.log(item,'item')
    const copyToClipBoard = (e) => {
        const text = document.getElementById(`${item.code}`) 
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
                            { !pending ? <div className='amazon-coupon'>
                                {item.voucher_code}
                                <img className='copy-border' src={amazon} alt="" />
                            </div> :  
                            <div className='amazon-coupon'>
                                Amazon voucher coming your way
                            </div>
                                }

                        </div>
                        { !pending ? <div className='coupon-description'>
                            Amazon voucher worth {item.value}
                        </div> : 
                        <div className='coupon-description'>
                            Voucher code will be sent to your registered account.
                        </div>
                        }
                        <div className='right-section'>
                            {/* <div className='coupon-status'>
                                <span className='status-dot'></span>  Active
                            </div> */}
                        { !pending ? <div className='copy-coupon'>
                                <button id={`${item.code}`} className={`copy-coupon-button ${clicked? "copy-green" : ""}`} onClick={(e) => copyToClipBoard(e)}>
                                    {/* <img className='coupon-pic' src={copyPic} alt="" /> */}
                                    <span id={item.code}>Copy code</span> 
                                </button>
                            </div> : null }
                        </div>
                    </div>
                    <div className='historyInfo'>
                        <img src={calenderPic} className='calender' alt="" />
                        <span className='historyDate'> Redeemed {item.value} coins on {required_date}</span>
                    </div>
                </div>
            </div>
        </>
    )
}