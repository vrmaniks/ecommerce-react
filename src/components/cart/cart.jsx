import React, { useState } from "react";
import "./cart.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../navbar";
import Newnav from "../newnavbar/newnav";
import Footer from "../../home/footer";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate();
    const { id } = useParams("");

    const [productData, setProductData] = useState([]);
    const inddata = async () => {
        const res = await fetch(`http://localhost:3000/product/viewProduct/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"

            }

        })

        const data = await res.json();
        if (res.status === 200) {
            setProductData(data);
        }
    }

    useEffect(() => {
        inddata()
    }, [id]);


    // add cart function:

    const addtocart = async (id) => {
        try {

            const token = localStorage.getItem("token");
            const userID = localStorage.getItem("id");
            if (!token || !userID) {
                navigate('/login');
            }


            const checkres = await fetch(`http://localhost:3000/user/addcart/${id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inddata, token, userID }),
                credentials: "include",
                withCredentials: true
            });

            const data1 = await checkres.json();

            if (checkres.status === 400 || !data1) {
                toast.warn(data1,
                    {
                        position: "top-center"
                    }

                );
            } else {
                toast.success("Product Added Successfully", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const buynow = async () => {
        toast.info("Buy now is not available You need to add Ptoduct in cart first", {
            position: "top-center",
            theme: "colored",
        })
    }

    return (
        <>

            <Navbar />
            <Newnav />


            <div className="cart_section">
                <div className="cart_container">
                    <div className="left_cart">
                        <img src={`${productData.image}`} alt="cartImage" />
                        <div className="cart_btn">
                            <button className="cart_btn1" onClick={() => { addtocart(productData.id) }}>Add to Cart</button>
                            <button className="cart_btn2" onClick={buynow}>Buy Now</button>
                        </div>
                    </div>
                    <div className="right_cart">
                        <h3>{`${productData.title}`}</h3>
                        <h4>{`${productData.category}`}</h4>
                        <hr />
                        <p className="mrp">₹: {`$${productData.price}`}</p>
                        <p className="description">About the Item : <span className="description_span"> {`${productData.description}`}</span></p>
                    </div>
                    <ToastContainer />
                </div>
            </div>
            <Footer />
        </>

    )
}