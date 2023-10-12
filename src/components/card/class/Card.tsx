import React from "react";
import { Avatar, IconButton, AvatarGroup, Button } from "@mui/material";
import { MoreVertRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
    removeCourseFromClass,
    removeFacultyFromClass,
} from "../../../store/assignment/actions";
import { RootState } from "../../../store";

interface CardCProps {
    name: string;
    date: string;
    facultyID: any[];
    selected: string;
    classID: string;
}

const Card = ({ name, date, facultyID, classID, selected }: CardCProps) => {
    const dispatch = useDispatch<any>();

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    const layout = useSelector((state: RootState) => state.layout.assignment);

    return (
        <div className="classCard__Wrapper">
            <div className="classCard__Header">
                <div className="left">
                    <Avatar variant="rounded" />
                    <div className="classCard__Details">
                        <h6>{name}</h6>
                        <p>Created on {date}</p>
                    </div>
                </div>
                <div className="right">
                    <IconButton>
                        <MoreVertRounded />
                    </IconButton>
                </div>
            </div>
            <div className="classCard__Body">
                <div className="left">
                    <AvatarGroup max={4}>
                        {facultyID.map((t) => (
                            <Avatar />
                        ))}
                    </AvatarGroup>
                </div>
                <div className="right">
                    <Button
                        onClick={() =>
                            dispatch(
                                layout.type === "FACULTY"
                                    ? removeFacultyFromClass({
                                          universityID,
                                          classID,
                                          facultyID: selected,
                                      })
                                    : removeCourseFromClass({
                                          universityID,
                                          classID,
                                          courseID: selected,
                                      })
                            )
                        }
                    >
                        Revoke
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Card;
