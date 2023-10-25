import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getUserName } from "../../../utils/helpers";
import { Avatar, Button } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../../../utils/hooks";

const Submissions = () => {
    const submissions = useSelector(
        (state: RootState) => state.activity.submissions
    );

    const navigate = useNavigate()

    const { encrypt } = useCrypto()

    return (
        <>
            {submissions.map((t) => (
                <div className="submissions__Wrapper">
                    <div className="submissions__User">
                        <Avatar />
                        <div className="details">
                            <h6>{getUserName(t.studentID!)}</h6>
                            <p>Submitted on: {moment(t.createdAt).format("DD MMM, YYYY")}</p>
                        </div>
                    </div>
                    <Button onClick={()=>navigate(`/activity/sub/${encrypt(t._id!)}`)}>View Submissions</Button>
                </div>
            ))}
        </>
    );
};

export default Submissions;
