import React, { useEffect, useState } from "react";
export default function Subtotal(props) {

    const items = props.itemData;
    const [price, setPrice] = useState(0);
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
    return (
        <div className="sub_item">

            <h3>Subtotal (items: {items.length}): <strong>₹ {price.toFixed(2)}</strong></h3>
        </div>

    )
}
