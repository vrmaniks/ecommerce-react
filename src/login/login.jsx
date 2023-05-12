import React, { useState, useEffect } from "react";
import './login.css';
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/navbar";
import Newnav from "../components/newnavbar/newnav";
import Footer from "../home/footer";
export default function Login() {


    const navigate = useNavigate();

    const checkToken = () => {
        const checkStatus = !!localStorage.getItem("token");
        if (checkStatus) {
            navigate("/");
        }
    };

    useEffect(() => {
        checkToken();
    }, []);



    const [userdata, setData] = useState({
        email: "",
        password: ""
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

    const authUser = async (e) => {
        e.preventDefault();
        const { email, password } = userdata;
        if (!email || !password) {
            toast.warn("Please Fill All The Fields", {
                position: "top-center"
            });
        } else {
            const response = await fetch(`http://localhost:3000/user/login`, {
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
                    navigate('/');

                }, 5000);
                toast.success("Welcome back", {
                    position: "top-center"
                });
                localStorage.setItem("token", data.token);
                localStorage.setItem("id", data.id);
                setData({ email: "", password: "" });
            } else {
                toast.warn(data, {
                    position: "top-center"
                })



            }
        }
    }


    return (
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
                            <h1>Welcome Back! Please Log In</h1>
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
                            <button className="signin_btn" onClick={authUser}>Continue</button>
                        </form>
                    </div>

                    <div className="create_accountinfo">
                        <p>New user?</p>
                        <button ><NavLink to="/signup">Create An Account</NavLink></button>
                    </div>
                    <div className="create_accountinfo">
                        <p>Forgot Password?</p>
                        <button ><NavLink to="/forgotPassword">Click to Change</NavLink></button>
                    </div>
                    <ToastContainer />
                </div>
            </section>
            <Footer />
        </>

    )
}