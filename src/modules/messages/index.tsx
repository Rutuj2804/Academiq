import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { sidebarLayout } from "../../store/settings/types";
import { removeMessage } from "../../store/messages/slice";

interface CMessageUnit {
    text: string;
    id: string;
    type: string;
}

const MessageUnit = ({ text, id, type }: CMessageUnit) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        setTimeout(()=>dispatch(removeMessage(id)), 10000)
    }, [dispatch, id])

    return (
        <div
            className={`messageUnit__Wrapper ${
                type === "SUCCESS" ? "success" : "error"
            }`}
        >
            <div className="text">{text}</div>
            <div className="close">
                <IconButton size="small" onClick={()=>dispatch(removeMessage(id))}>
                    <CloseRounded />
                </IconButton>
            </div>
        </div>
    );
};

const Messages = () => {

    const sidebar = useSelector((state:RootState)=> state.settings.sidebar)

    const messages = useSelector((state: RootState) => state.messages.messages)

    return (
        <div className={`messages__Wrapper ${sidebar === sidebarLayout[0] ? "left" : "right"}`}>
            <div className="messages__Box">
                {messages.map((m) => (
                    <MessageUnit
                        key={m._id}
                        text={m.text}
                        id={m._id}
                        type={m.type}
                    />
                ))}
            </div>
        </div>
    );
};

export default Messages;
