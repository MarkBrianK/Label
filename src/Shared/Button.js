import React from "react";
import "../Assets/Styles/Button.css"

function Button({children}){
    return(
        <button className="button" >
        {children}
        </button>
    )
}
export default Button
