import React from "react";
import { FcStumbleupon } from "react-icons/fc";

const Cards = () => {
    return (
        <div className="cards__Wrapper">
            <div className="top">
                <FcStumbleupon />
                <p>Total Students</p>
            </div>
            <div className="body">
                <h4>1200</h4>
                <p>Students in the institute</p>
            </div>
        </div>
    );
};

export default Cards;
