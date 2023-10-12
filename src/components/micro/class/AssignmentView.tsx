import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const AssignmentView = () => {

    const activities = useSelector((state: RootState) => state.activity.activities)

    return <div>{activities.map(a=><div key={a._id}>{a.name}</div>)}</div>;
};

export default AssignmentView;
