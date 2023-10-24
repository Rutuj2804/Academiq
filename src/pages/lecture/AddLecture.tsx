import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";

const AddLecture = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["GENERAL", "Lectures", "Add"],
                link: "/lectures/add",
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <main className="addLecture__Wrapper">
                ADD LECTURE
            </main>
        </div>
    );
};

export default AddLecture;
