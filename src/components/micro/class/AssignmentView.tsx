import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { ActivityCard } from "../../card/activity";

const AssignmentView = () => {
    const activities = useSelector(
        (state: RootState) => state.activity.activities
    );

    return (
        <div className="row">
            {activities.map((a) => (
                <div className="col-lg-4 col-md-6 col-12" key={a._id}>
                    <ActivityCard
                        name={a.name!}
                        description={a.description!}
                        attachments={a.files?.length!}
                        id={a._id!}
                    />
                </div>
            ))}
        </div>
    );
};

export default AssignmentView;
