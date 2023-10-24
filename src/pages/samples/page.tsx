import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";

const Sample = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Sample"],
                link: "/Sample",
            })
        );
    }, [dispatch, setBreadcrumps]);

    return (
        <div className="section__Wrapper">
        </div>
    );
};

export default Sample;
