import React from "react";

interface PricingCardsCP {
    title: string,
    description: string,
    isSelected: boolean
}

const PricingCards = ({ title, description, isSelected } : PricingCardsCP) => {
    return (
        <div className={`pricingCard__Wrapper ${isSelected && "active"}`}>
            <div className="title">
                <h6>{title}</h6>
                <p>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default PricingCards;
