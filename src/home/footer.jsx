import React from 'react'
import "./footer.css";


export default function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer>
            <div className="footer_container">
                <div className="footr_details_one">
                    <h3>Get to Know US</h3>
                    <p>About us</p>
                </div>
                <div className="footr_details_one">
                    <h3>Connect with Us</h3>
                    <p>Facebook</p>
                    <p>LinkedIn</p>
                    <p>Instagram</p>
                </div>
                <div className="footr_details_one forres">
                    <h3>Make Money with Us</h3>
                    <p>Become a Seller</p>
                </div>
            </div>
            <div className="lastdetails">
                {/* <img src="" alt="logo" /> */}
                <p>
                    All the copyrights are reserved © {year}

                </p>
            </div>
        </footer>
    )
}
