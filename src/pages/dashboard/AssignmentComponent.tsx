import {
    DoneRounded,
    UploadRounded,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";

interface AssignmentIC {
    compledted?: boolean;
}

const AssignmentComponent = ({ compledted }: AssignmentIC) => {
    return (
        <div className="lecture__Wrapper">
            <div className="user">
                <Avatar />
                <div className="details">
                    <h6>Cloud Computing</h6>
                    <p>Deadline: 26 May, 2023</p>
                </div>
            </div>
            <div className={compledted ? "done" : "upload"}>
                <IconButton size="small" disabled={compledted}>
                    {compledted ? <DoneRounded /> : <UploadRounded />}
                </IconButton>
            </div>
        </div>
    );
};

export default AssignmentComponent;
