import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";

const Collaborate = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ASSETS", "Collaborate"],
                link: "/collaborate",
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
        </div>
    );
};

export default Collaborate;
