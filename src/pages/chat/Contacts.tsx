import { AddRounded, SearchRounded } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { GoPrimitiveDot } from "react-icons/go";

const ContactThread = () => {
    return (
        <div className="thread__Wrapper">
            <Avatar />
            <div className="user">
                <h6>
                    Rutuj Bokade{" "}
                    <span>
                        <GoPrimitiveDot />
                    </span>
                </h6>
                <p>Hi there!! I thought you're dead</p>
            </div>
        </div>
    );
};

const Contacts = () => {
    return (
        <div className="contacts__Wrapper">
            <div className="contacts__Header">
                <div className="left">
                    <h4>Inbox</h4>
                </div>
                <div className="right">
                    <IconButton>
                        <SearchRounded fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <AddRounded fontSize="small" />
                    </IconButton>
                </div>
            </div>
            <hr />
            <div className="contacts__Threads">
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
                <ContactThread />
            </div>
        </div>
    );
};

export default Contacts;
