import React from "react";
import shoe from "../Assets/Image/shoe icon.png"


export default function Category() {

    return (

        <div style={{ display: "flex", justifyContent: "space-evenly", textAlign: "center" }}>
            <div>
                <div>
                    <img src={shoe} alt="" />
                    <p> Shoes</p>
                </div>
                <div>
                    <img src={shoe} alt="" />
                    <p> Jackets</p>
                </div>
                <div>
                    <img src={shoe} alt="" />
                    <p> Dress </p>
                </div>
                <div>
                    <img src={shoe} alt="" />
                    <p> Hoodies </p>
                </div>
                <div>
                    <img src={shoe} alt="" />
                    <p> T-shirts </p>
                </div>
            </div>
            <div>
            </div>

        </div>
    )
}
