import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";

const MyJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["PLACEMENTS", "My Jobs"],
                link: "/placement/my-jobs",
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <main>
                <div className="paper">
                    MyJobs
                </div>
            </main>
        </div>
    );
};

export default MyJobs;
