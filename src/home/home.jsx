import React, { useState, useEffect } from "react";
import Banner from "./banner.jsx";
import Navbar from "../components/navbar.jsx";
import Newnav from "../components/newnavbar/newnav.jsx";
import Footer from "./footer.jsx";
import "./home.css";
import { NavLink } from "react-router-dom";

export default function Home() {
    const [productArray, updateProductArray] = useState([]);
    const [skip, setSkip] = useState(5);
    const [hasMoreData, setHasMoreData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/product/products?skip=${0}`
                );
                const data = await response.json();
                if (data) {
                    updateProductArray(data);
                    setHasMoreData(data.length > 0);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();

    }, []);

    function loadMore() {
        setSkip((prevSkip) => prevSkip + 5);
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/product/products?skip=${skip}`
                );
                const data = await response.json();
                if (data) {
                    updateProductArray([...productArray, ...data]);
                    setHasMoreData(data.length > 0);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }

    return (
        <>

            <Navbar />
            <Newnav />
            <div className="home_section">
                <div className="banner_part">
                    <Banner />
                </div>
                <div className="productList">
                    {productArray.map((product, index) => (
                        <div className="productDiv" key={index}>
                            <div className="productImage">
                                <img
                                    src={product.image}
                                    alt="Product Image"
                                    className="productImage"
                                />
                            </div>
                            <div className="productTitle">{product.title}</div>
                            <div className="Quantity">Price : {product.price}</div>
                            <div className="buttonSection">
                                {/* <div className="delete button">Cart</div> */}
                                <NavLink to={`/viewProduct/${product.id}`}><div className="update button">View Product</div></NavLink>
                            </div>
                        </div>
                    ))}
                </div>
                {hasMoreData && (
                    <div className="last">
                        <button className="signin_btn" onClick={loadMore}>
                            Load More
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
