import React from "react";
import { useState, useEffect } from "react";
import "./signup.css";
import Login from "../login/login";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/navbar";
import Newnav from "../components/newnavbar/newnav";
import Footer from "../home/footer";

export default function SignUp() {
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

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        repeatpassword: ""
    })


    function addUserInfo(event) {
        const { name, value } = event.target;
        setUserData(() => {
            return {
                ...userData,
                [name]: value
            }

        })
    }

    const saveUser = async (e) => {
        e.preventDefault();
        const { name, email, password, repeatpassword } = userData;
        if (!name || !email || !password || !repeatpassword) {
            toast.warn("Please Fill All The Fields", {
                position: "top-center"
            });
        }
        else {
            const response = await fetch(`http://localhost:3000/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, repeatpassword })
            });
            const data = await response.json();
            if (response.status === 400 || !data) {
                toast.warn(data, {
                    position: "top-center"
                });
            }
            else {
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
                toast.success("Account Created successfully", {
                    position: "top-center"
                });
                setUserData({ name: "", email: "", password: "", repeatpassword: "" });



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
                            <h1>Create New Account</h1>
                            <div className="form_data">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" placeholder="Enter your Name" onChange={addUserInfo} value={userData.name} />

                            </div>
                            <div className="form_data">
                                <label htmlFor="name">Email</label>
                                <input type="text" name="email" id="email" placeholder="Enter your Email" onChange={addUserInfo} value={userData.email} />

                            </div>
                            <div className="form_data">
                                <label htmlFor="name">Password</label>
                                <input type="password" name="password" id="password" placeholder="Enter your Password" onChange={addUserInfo} value={userData.password} />

                            </div>
                            <div className="form_data">
                                <label htmlFor="repeatpassword">Repeat Password</label>
                                <input type="password" name="repeatpassword" id="repeatpassword" placeholder="Repeat your Password" onChange={addUserInfo} value={userData.repeatpassword} />

                            </div>
                            <button className="signin_btn" onClick={saveUser}>Sign In</button>


                        </form>
                    </div>
                    <div className="create_accountinfo">
                        <p>Existing User?</p>
                        <button><NavLink to="/login">Login</NavLink></button>
                    </div>
                    <ToastContainer />
                </div>
            </section>

            <Footer />

        </>

    );
}