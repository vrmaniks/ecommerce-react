import React from "react";
import "./option.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Option(deletedata) {



    const removedata = async (value) => {
        try {
            const token = localStorage.getItem("token");
            const userID = localStorage.getItem("id");

            const res = await fetch(`http://localhost:3000/user/removeItem/${value.deletedata}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, userID }),
            });
            const data = await res.json();

            if (res.status === 400 || !data) {
                toast.warn(data, {
                    position: "top-center"
                })

            }
            else {
                toast.info("Item Removed", {
                    position: "top-center",
                    theme: "colored"
                })
                value.cart();
            }




        }
        catch (err) {
            console.log(err);
        }


    }
    return (
        <div className="add_remove_select">

            <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <p className="deleteBtn" onClick={() => removedata(deletedata)}>Delete</p><span>|</span>
            <ToastContainer />
        </div>
    )
}