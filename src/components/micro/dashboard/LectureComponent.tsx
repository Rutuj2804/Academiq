import { DoneRounded, PlayArrowRounded } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";

interface LectureIC {
    compledted?: boolean;
}

const LectureComponent = ({ compledted }: LectureIC) => {
    return (
        <div className="lecture__Wrapper">
            <div className="user">
                <Avatar />
                <div className="details">
                    <h6>Cloud Computing</h6>
                    <p>Live: 7:00AM | 26 May, 2023</p>
                </div>
            </div>
            <div className={compledted ? "done" : "play"}>
                <IconButton size="small" disabled={compledted}>
                    {compledted ? <DoneRounded /> : <PlayArrowRounded />}
                </IconButton>
            </div>
        </div>
    );
};

export default LectureComponent;
