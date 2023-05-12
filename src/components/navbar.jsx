import React, { useEffect, useState } from 'react';
import "./../components/navbar.css";
import SearchIcon from '@mui/icons-material/Search';  //need to visit this website before https://mui.com/material-ui/getting-started/installation/
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [loginStatus, setLoginStaus] = useState(!!localStorage.getItem("token"));
    const navigate = useNavigate();
    // const isLoggedIn = !!localStorage.getItem("token");

    const logoutUser = async () => {
        const token = localStorage.getItem("token");
        const userID = localStorage.getItem("id");
        const response = await fetch(`http://localhost:3000/user/logout`, {
            credentials: "include",
            method: "POST",
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, userID })
        });
        if (response.status === 200) {
            setTimeout(() => {
                navigate("/login");
            },3000)
            toast.info("Logged out successfully", {
                position: "top-center"
            });
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            setLoginStaus(false);

        }

    }

    return (
        <header>
            <nav>
                <div className="left">

                    <div className="navlogo">
                        <NavLink to="/"><img src="" alt="logo" /></NavLink>

                    </div>
                    <div className="nav_searchbaar">
                        <input type="text" placeholder='Search Items' />
                        <div className="search_icon">
                            <SearchIcon id="search" />

                        </div>
                    </div>

                </div>
                <div className="right">
                    {
                        loginStatus ?
                            <nav className="nav_btn" onClick={logoutUser}>

                                LogOut
                            </nav> : <nav className="nav_btn">

                                <NavLink to="/login">SignIn</NavLink>
                            </nav>
                    }
                    <NavLink to="/buynow">
                        <div className="cart_btn">
                            <Badge badgeContent={0} color="primary">
                                <ShoppingCartIcon id="icon" />

                            </Badge>

                        </div>
                    </NavLink>
                    <PersonIcon className='avtar' />

                </div>
            </nav>
            <ToastContainer />
        </header>
    )
}

export default Navbar;