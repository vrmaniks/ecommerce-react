import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./orders.css";
import Navbar from "../navbar";
import Newnav from "../newnavbar/newnav";
import Footer from "../../home/footer";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Orders() {
    const navigate = useNavigate();



    const [orderArray, updateOrderArray] = useState([]);
    // const [skip, setSkip] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const userID = localStorage.getItem("id");
                if (!token || !userID) {
                    toast.warn("Your session has expired. Please log in again to continue", {
                        position: "top-center"
                    })
                    {

                        setTimeout(() => {
                            navigate("/login");
                        }, 0);
                        return;
                    }
                }
                const response = await fetch(`http://localhost:3000/user/myorder?skip=${0}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token, userID })


                });
                const data = await response.json();
                if (data) {
                    updateOrderArray(data);
                };
            }
            catch (error) {
                console.log("something went wrogn : ", error);
            }
        };
        fetchData();

    }, []);
    return (
        <>
            <Navbar />
            <Newnav />
            {
                orderArray.length ? <div className="buynow_section">
                    <div className="buynow_container">
                        <div className="left_buy">
                            <h1>Your Orders</h1>
                            <span className="leftbuyprice">Date</span>
                            <hr />


                            {orderArray.map((product) =>
                                product.items.map((item) => (
                                    <div className="item_container" key={item.orderID}>
                                        <img src={item.image} alt="product_image" />
                                        <div className="item_details">
                                            <h3>{item.title}</h3>
                                            <h4>{item.category}</h4>
                                            <p className="unusual">Order ID : {product.orderID}</p>
                                        </div>
                                        <h6 className="item_price">{product.time}</h6>
                                    </div>
                                ))
                            )}






                        </div>
                    </div>
                    {/* <div className="last">
                        <button className="signin_btn" onClick={getMore}>
                            Load More
                        </button>
                    </div> */}
                    <ToastContainer />

                </div> : <div className="buynow_section">
                    <div className="buynow_container"><h3>ohh...! Looks you did not order Something</h3></div></div>
            }
            <Footer />
        </>

    )
}