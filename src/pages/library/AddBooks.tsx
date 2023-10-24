import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";

const AddBooks = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["SOCIALS", "Library", "Add Book"],
                link: "/library/add",
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <main className="addBooks__Wrapper">
                ADD BOOKS
            </main>
        </div>
    );
};

export default AddBooks;
