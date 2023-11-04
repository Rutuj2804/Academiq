import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";

const MyApplications = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["PLACEMENTS", "My Applications"],
                link: "/placement/my-applications",
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <main>
                <div className="paper">
                    MyApplications
                </div>
            </main>
        </div>
    );
};

export default MyApplications;
