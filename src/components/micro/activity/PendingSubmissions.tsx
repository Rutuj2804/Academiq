import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getUserName } from "../../../utils/helpers";

const PendingSubmissions = () => {

    const submissions = useSelector((state: RootState) => state.activity.pending)

    return <div>{submissions.map(t=>getUserName(t!))}</div>;
};

export default PendingSubmissions;
