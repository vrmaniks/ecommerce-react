import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';



function Right(props) {
    const items = props.itemData;
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        totalAmount();
    }, [props]);


    const totalAmount = () => {
        let price = 0;
        items.map((item) => {
            price = price + item.price;
        });
        setPrice(price);


    }
    const verifyPayment = async (data) => {
        const options = {
            key: "rzp_test_LEk4Bbfdh3A1gs",
            amount: Number(data.order.amount),
            currency: data.order.currency,
            name: "E-commerce",
            description: "This is description",
            order_id: data.order.id,
            handler: function (response) {
                try {
                    console.log("main hun response: ", response);
                    const token = localStorage.getItem("token");
                    const userID = localStorage.getItem("id");
                    fetch("http://localhost:3000/user/verifyPayment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ token, userID, response })
                    }).then(response => response.json()).then(data => {
                        toast.info(data.message, {
                            position: "top-center",
                            theme: "colored",
                        });
                        toast.info("Redirecting to Order Page", {
                            position: "top-right",
                            theme: "colored",
                        });
                        setTimeout(() => {
                            navigate("/myorders");
                            // window.location.href = "/myorders";
                        }, 5000)

                    }).catch((err) => {
                        console.log("Something went wrong");
                    })
                } catch (err) {
                    console.log("err form handler function:", err);
                }
            }


        }
        const rzp = new window.Razorpay(options)
        rzp.open();


    }

    const proceedToBuy = async (amount) => {
        try {
            const token = localStorage.getItem("token");
            const userID = localStorage.getItem("id");
            const response = await fetch("http://localhost:3000/user/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount, token, userID })
            });
            const data = await response.json();
            if (response.status === 200) {
                verifyPayment(data);
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log("something went wrong");
        }
    };


    const delivery = 120;

    return (
        <div className="right_buy">
            <div className="cost_right">
                <p>Place Your Order</p>

                <h3>
                    Subtotal ({items.length} item):{" "}
                    <strong>₹ {price}</strong>
                </h3>

                <button className="rightbuy_btn" onClick={() => proceedToBuy(price)}>
                    Proceed To Buy
                </button>
            </div>
            <ToastContainer />
        </div>
    );

}
export default memo(Right);