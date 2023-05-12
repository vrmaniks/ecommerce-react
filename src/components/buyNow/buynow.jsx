import React, { useEffect, useState } from "react";
import "./buynow.css";
import Option from "./option";
import Subtotal from "./subtotal";
import Right from "./right";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../navbar";
import Newnav from "../newnavbar/newnav";
import Footer from "../../home/footer";
import { useNavigate } from "react-router-dom";

export default function Buynow() {
    const navigate = useNavigate();

    const [cartData, setCartdata] = useState("");
    const getMyCart = async () => {
        const token = localStorage.getItem("token");
        const userID = localStorage.getItem("id");

        if (!token || !userID) {
            navigate('/login');
        }
        const response = await fetch(`http://localhost:3000/user/showMyCart`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, userID })
        });

        const data = await response.json();
        if (response.status != 200) {
            toast.warn("Session Expired! Please Login Again", {
                position: "top-center"
            })

            console.log("something went wrong");
        }
        else {
            setCartdata(data.cart);
        }
    }

    useEffect(() => {
        getMyCart();
    }, []);
    return (
        <>
            <Navbar />
            <Newnav />
            {
                cartData.length ? <div className="buynow_section">
                    <div className="buynow_container">
                        <div className="left_buy">
                            <h1>Shopping</h1>
                            <p>Select all items</p>
                            <span className="leftbuyprice">Price</span>
                            <hr />

                            {
                                cartData.map((item) => {
                                    return (
                                        <>
                                            <div className="item_container">
                                                <img src={item.image} alt="product_image" />
                                                <div className="item_details">
                                                    <h3>{item.title}</h3>
                                                    <h4>{item.category}</h4>
                                                    {/* <h3 className="diffrentprice">{item.price}</h3> */}
                                                    <p className="unusuall">Select the Quantity</p>

                                                    <Option deletedata={item.id} cart={getMyCart} />

                                                </div>
                                                <h3 className="item_price">₹ {item.price}</h3>
                                            </div>

                                            <hr />
                                        </>
                                    )


                                })
                            }


                            <Subtotal itemData={cartData} />


                        </div>
                        <Right itemData={cartData} />


                    </div>

                </div> : <div className="buynow_section">
                    <div className="buynow_container"><h3>ohh...! Looks Like Your Cart is Empty</h3></div></div>
            }
            <Footer />
        </>
    )
}
