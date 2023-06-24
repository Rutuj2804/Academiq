import {
    AttachFileRounded,
    EmojiEmotionsRounded,
    MoreVertRounded,
    SendRounded,
} from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import React, { useState } from "react";

interface MessagesCProps {
    isSender?: Boolean;
}

const Messages = ({ isSender }: MessagesCProps) => {
    return (
        <div className={`message__Wrapper ${isSender ? "sender" : ""}`}>
            <p>Hey there!! I thought you were dead.</p>
            <span>24 May, 2023 9:00 PM</span>
        </div>
    );
};

const ChatArea = () => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);

    return (
        <div className="chatArea__Wrapper">
            <div className="chat__Header">
                <div className="left">
                    <Avatar />
                    <div className="user">
                        <h6>Rutuj Bokade</h6>
                        <p>2 mins ago</p>
                    </div>
                </div>
                <div className="right">
                    <IconButton>
                        <MoreVertRounded />
                    </IconButton>
                </div>
            </div>
            <hr />
            <div className="chat__Body">
                <Messages />
                <Messages isSender />
                <Messages />
                <Messages isSender />
                <Messages />
                <Messages isSender />
                <Messages />
                <Messages isSender />
                <Messages />
                <Messages isSender />
                <Messages />
                <Messages isSender />
                <Messages />
                <Messages isSender />
                <Messages />
                <Messages isSender />
                <Messages />
                <Messages isSender />
                <Messages />
                <Messages isSender />
                <Messages />
                <Messages isSender />
            </div>
            <hr />
            <div className="chat__Footer">
                <form>
                    <div className="options">
                        <IconButton size="small">
                            <EmojiEmotionsRounded />
                        </IconButton>
                        <input
                            type="file"
                            id="attach"
                            onChange={(e) =>
                                e.target.files ? setFile(e.target.files[0]) : {}
                            }
                        />
                        <IconButton size="small">
                            <label htmlFor="attach">
                                <AttachFileRounded />
                            </label>
                        </IconButton>
                    </div>
                    <div className="inutDiv">
                        <textarea
                            rows={3}
                            placeholder="Send Message..."
                            onChange={e=>setMessage(e.target.value)}
                            value={message}
                        ></textarea>
                    </div>
                    <div className="submit">
                        <Button type="submit">
                            <SendRounded />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatArea;
