import React from "react";
import './../newnavbar/newnav.css';
import { NavLink } from "react-router-dom";


function Newnav() {

    return (
        <div className="new_nav">
            <div className="nav_data">
                <div className="left_data">
                    <p >
                        <NavLink to='/myorders' className="myorder"> Check Out Your Orders</NavLink>
                    </p>
                    <p>
                        <NavLink to='/becomeSeller' className={'myorder'}>Become a Seller</NavLink>
                    </p>
                    <p>
                        Best Seller
                    </p>
                    <p>
                        Fashion
                    </p>
                    <p>
                        Trends
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Newnav;