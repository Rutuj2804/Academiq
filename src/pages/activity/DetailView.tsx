import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";

const ActivityDetailView = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Activities", "Activity"],
                link: `/activities`,
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <main className="activityDetail__Wrapper">
                <div className="paper">
                    <div className="activityDetail__Container">
                        <h4>My Activity</h4>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ActivityDetailView;
