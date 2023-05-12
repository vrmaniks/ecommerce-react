import React from "react";
import Carousel from "react-material-ui-carousel";
import "./banner.css";
const data = [
    "https://cdn.pixabay.com/photo/2016/06/12/09/08/iphone-1451614_1280.png"
    ,
    "https://cdn.pixabay.com/photo/2017/03/01/09/11/shop-2107911__480.png",
    "https://cdn.pixabay.com/photo/2017/01/28/19/06/label-2016248_1280.png"
]
function Banner() {
    return (
        <Carousel className="carasousel"
        autoPlay={true}
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
            style:{
                backgroundColor:"#fff",
                color:"#494949",
                borderRadius:0,
                marginTop:-22,
                height:"104px"

            }
        }}

        >
            {
                data.map((imag,index)=>{
                    return(
                        <>
                        <img src={imag} alt="" className="banner_img"/>
                        </>
                    )
                })
            }

        </Carousel>
    )
}

export default Banner;