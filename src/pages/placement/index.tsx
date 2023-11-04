import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";

const Placements = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["PLACEMENTS", "Apply Jobs"],
                link: "/placement",
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <main>
                <div className="paper">
                    Placements
                </div>
            </main>
        </div>
    );
};

export default Placements;
