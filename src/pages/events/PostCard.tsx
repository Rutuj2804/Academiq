import { MoreVertRounded } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { BsChatLeft, BsFillChatLeftFill, BsHeart, BsHeartFill, BsShare } from "react-icons/bs";
import { useState } from "react"

const imgArr = [
    "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
];

interface PostCardCI {
    liked?: boolean,
    comment?: boolean,
}

const PostCard = ({ liked, comment }: PostCardCI) => {

    const [isLiked, setIsLiked] = useState(liked)
    const [isCommented, setIsCommented] = useState(comment)

    const getClassname = (l: number) => {
        if (l == 1) {
            return "";
        } else if (l > 1) {
            return "grid-view";
        }
    };

    return (
        <div className="postCard__Wrapper">
            <div className="postCard__Header">
                <div className="left">
                    <Avatar />
                    <div className="user">
                        <h6>Rutuj Jeevan Bokade</h6>
                        <p>Monday, 26 May, 2023</p>
                    </div>
                </div>
                <div className="right">
                    <IconButton>
                        <MoreVertRounded />
                    </IconButton>
                </div>
            </div>
            <hr />
            <div className="postCard__Main">
                <div className="top">
                    <p>
                        Browse through the icons below to find the one you need.
                        The search field supports synonyms—for example, try
                        searching for "hamburger" or "logout."
                    </p>
                </div>
                <div className={`bottom ${getClassname(imgArr.length)}`}>
                    {imgArr.map((r, i) =>
                        i >= 3 ? null : <img src={r} key={i} alt="Post" />
                    )}
                    {imgArr.length > 4 ? (
                        <div className="last">
                            <img src={imgArr[3]} alt="Post" />
                            <div>
                                <h6>+{imgArr.length - 4}</h6>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            <hr />
            <div className="postCard__Footer">
                <div className="left">
                    <div className="like" onClick={()=>setIsLiked(v=>!v)}>{isLiked ? <BsHeartFill /> : <BsHeart />}</div>
                    <div className="comment" onClick={()=>setIsCommented(v=>!v)}>{isCommented ? <BsFillChatLeftFill /> : <BsChatLeft />}</div>
                </div>
                <div className="right">
                    <BsShare />
                </div>
            </div>
        </div>
    );
};

export default PostCard;
