import { useState } from 'react';
import './becomeSeller.css';
import SellerLogin from '../sellerSignupLogin/sellerLogin';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';
import Newnav from '../newnavbar/newnav';
import Footer from '../../home/footer';






export default function Seller() {
    const navigate = useNavigate();

    function handleStartSelling() {
        navigate('/SellerLogin');
    }
    return (
        <>
            <Navbar />
            <Newnav />

            <div className='first'>
                <div className='insidefirst'>
                    <h1>Become a Seller</h1>
                    <h2>Start your selling journey  and become
                        a part of our seller community</h2>
                    <button className='sellerBtn' onClick={handleStartSelling}>Start Selling</button>
                </div>
                <div className='insidefirst_2'>
                    <img className='firstimg' src="https://img.freepik.com/premium-vector/mobile-online-shopping-people-buy-dresses-shirts-pants-online-shops-shoppers-buying-internet-sale-flat-illustration-online-clothing-store-discount-total-sale-concept_229548-60.jpg?w=900" />
                </div>
            </div>
            <div className='second'>
                <h3>START WITH</h3>
                <div className='insidesecond'>

                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_l8YsSgYLbpcnJXY8KtAD2ln9F6NDbnvNEQ&usqp=CAU" />
                        <h4>GST Details</h4>
                    </div>
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx2rAi_baQlGSBuGUzbaWmmhGQmBtfA-WV3Q&usqp=CAU" />
                        <h4>PAN Details</h4>
                    </div>
                    <div>
                        <img src="https://infostackflow.com/wp-content/uploads/2018/09/Aadhaar-Image.jpg" />
                        <h4>AADHAAR Details</h4>
                    </div>

                </div>
            </div>
            <div className='third'>
                <div className='insidethird'>
                    <h1>Start your Seller Journey</h1>
                    <h5>Join our family of 10K+ business</h5>
                    <button className='sellerBtn' onClick={handleStartSelling}>Start Selling</button>
                </div>
                <div className='insidethird_2'>
                    <img src="https://www.primedesignsolutions.com/wp-content/uploads/2017/04/e-commerce-graphic.svg" />
                </div>
            </div>

            <Footer />
        </>
    )
}