import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { BsFillBookFill, BsThreeDotsVertical } from "react-icons/bs";
import {
    AiFillHeart,
    AiFillTag,
    AiOutlineHeart,
    AiOutlineTag,
} from "react-icons/ai";

const BookCard = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    return (
        <div className="bookCard__Wrapper">
            <div className="bookCard__Header">
                <div className="bookCard__Left">
                    <h6>India In The Post Covid World</h6>
                    <p>~By Rutuj Bokade</p>
                </div>
                <IconButton>
                    <BsThreeDotsVertical />
                </IconButton>
            </div>
            <div className="bookCard__Footer">
                <div className="bookCard__Left">
                    <div className="like" onClick={() => setIsLiked((t) => !t)} >
                        {isLiked ? (
                            <AiFillHeart />
                        ) : (
                            <AiOutlineHeart />
                        )}
                    </div>
                    <div className="save" onClick={() => setIsSaved((t) => !t)} >
                        {isSaved ? (
                            <AiFillTag />
                        ) : (
                            <AiOutlineTag />
                        )}
                    </div>
                </div>
                <IconButton>
                    <BsFillBookFill />
                </IconButton>
            </div>
        </div>
    );
};

export default BookCard;
