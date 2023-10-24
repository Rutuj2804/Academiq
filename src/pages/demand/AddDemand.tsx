import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";

const AddDemand = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["GENERAL", "Demand Letters", "Add"],
                link: "/demand-letters/add",
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <main className="addDemand__Wrapper">
                ADD DEMAND
            </main>
        </div>
    );
};

export default AddDemand;
