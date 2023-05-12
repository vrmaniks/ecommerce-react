import React from "react";
import "./forgotPassword.css";
import Navbar from "../navbar";
import Newnav from "../newnavbar/newnav";
import Footer from "../../home/footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [userdata, setData] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });

    function adddata(event) {
        const { name, value } = event.target;
        setData(() => {
            return {
                ...userdata,
                [name]: value
            }
        })
    }

    const changePassword = async (e) => {
        e.preventDefault();

        const { email, password, repeatPassword } = userdata
        if (!email || !password || !repeatPassword) {


            toast.warn("Please fill the fileds", {
                position: "top-center"
            })
        }
        else {

            if (password !== repeatPassword) {
                toast.warn("Password and repeat Password should Match", {
                    position: "top-center"
                })

            }
            else {
                const response = await fetch(`http://localhost:3000/user/forgotPassword`, {
                    credentials: "include",
                    method: "POST",
                    redirect: 'follow',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (response.status === 200) {

                    setTimeout(() => {
                        navigate('/login');

                    }, 3000)
                    toast.success("Password Changed", {
                        position: "top-center"
                    });
                    setData({ email: "", password: '', repeatPassword: "" })
                } else {
                    toast.warn(data, {
                        position: "top-center"
                    });

                }
            }
        }
    }
    return (
        <>
            <>
                <Navbar />
                <Newnav />




                <section>
                    <div className="sign_container">
                        {/* <div className="sign_header">
                        <img src="" alt="logo" />
                    </div> */}
                        <div className="sign_form">
                            <form method="POST">
                                <h1>Forgot Password</h1>
                                <div className="form_data">
                                    <label htmlFor="email">Email</label>
                                    <input type="text"
                                        onChange={adddata} name="email" id="email" placeholder="Enter your Email" value={userdata.email} />

                                </div>
                                <div className="form_data">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                        onChange={adddata} name="password" id="password" placeholder="Enter Your Password" value={userdata.password} />

                                </div>
                                <div className="form_data">
                                    <label htmlFor="repeatpassword">Repeat Psssword</label>
                                    <input type="password"
                                        onChange={adddata} name="repeatPassword" id="repeatpassword" placeholder="Repeat Your Password" value={userdata.repeatPassword} />

                                </div>
                                <button className="signin_btn" onClick={changePassword}>Change</button>
                            </form>
                        </div>
                        <ToastContainer />
                    </div>
                </section>
                <Footer />
            </>


        </>
    )
}