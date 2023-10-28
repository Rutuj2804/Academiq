import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Search from "./Search";
import Delete from "./Delete";
import AddAssignment from "./AddAssignment";
import EventPost from "./EventPost";
import AddNotes from "./AddNotes";

const Popups = () => {
    const layout = useSelector((state: RootState) => state.layout);

    return (
        layout.popup ? (
            <div className="popup__Wrapper">
                {layout.search ? <Search /> : null}
                {layout.delete.isOpen ? <Delete /> : null}
                {layout.assignment.isOpen ? <AddAssignment /> : null}
                {layout.event.isOpen ? <EventPost /> : null}
                {layout.notes.isOpen ? <AddNotes /> : null}
            </div>
        ) : <></>
    );
};

export default Popups;
