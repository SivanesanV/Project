import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
function Footer() {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus perspiciatis quod non, aspernatur, ad magnam culpa consequatur veniam dolore ipsa praesentium, consectetur consequuntur autem modi natus aperiam. Aliquid, sed praesentium?</p>
                    <div className="footer-social-icon">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center " >
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 8347834734</li>
                        <li>tomoto@gmail.com</li>
                    </ul>
                 </div>
            </div>
            <hr />
            <p className="footer-copy-right">Copyright 2025 @ Tomoto.com - All Rights Reserved.</p>
        </div>
    )
}

export default Footer
