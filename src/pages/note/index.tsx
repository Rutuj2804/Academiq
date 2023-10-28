import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { Masonry } from "@mui/lab";
import { IconButton } from "@mui/material";
import { AddRounded, DeleteRounded, PushPinRounded } from "@mui/icons-material";
import { setNotesPopup } from "../../store/layout/slice";
import { RootState } from "../../store";
import { deleteNote, getNotes, updateNote } from "../../store/note/actions";

const Notes = () => {
    const dispatch = useDispatch<any>();

    const universityID = useSelector((state: RootState) => state.university.university.value)

    const notes = useSelector((state: RootState) => state.note.notes)

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ASSETS", "Notes"],
                link: "/notes",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if(universityID)
            dispatch(getNotes({ universityID }))
    }, [dispatch, universityID])

    return (
        <div className="section__Wrapper">
            <main className="notes__Wrapper">
                <div className="row">
                    {notes.filter(t=>t.isPinned).length ? <Masonry columns={3} spacing={2}>
                        {notes.filter(t=>t.isPinned).map((n, i) => (
                            <div className="notes__Note" key={n._id}>
                                <h6 onClick={()=>dispatch(setNotesPopup({ isOpen: true, type: "UPDATE", index: i }))}>{n.title}</h6>
                                <p onClick={()=>dispatch(setNotesPopup({ isOpen: true, type: "UPDATE", index: i }))}>{n.text}</p>
                                <div className="notes__Options">
                                    <IconButton size="small" onClick={() => dispatch(updateNote({ title: n.title!, text: n.text!, isPinned: !n.isPinned!, noteID: n._id! }))}>
                                        <PushPinRounded />
                                    </IconButton>
                                    <IconButton size="small" onClick={()=>dispatch(deleteNote({ noteID: n._id!, universityID }))}>
                                        <DeleteRounded />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </Masonry> : null}
                    <Masonry columns={3} spacing={2}>
                        {notes.filter(t=>!t.isPinned).map((n, i) => (
                            <div className="notes__Note" key={n._id}>
                                <h6 onClick={()=>dispatch(setNotesPopup({ isOpen: true, type: "UPDATE", index: i }))}>{n.title}</h6>
                                <p onClick={()=>dispatch(setNotesPopup({ isOpen: true, type: "UPDATE", index: i }))}>{n.text}</p>
                                <div className="notes__Options">
                                    <IconButton size="small" onClick={() => dispatch(updateNote({ title: n.title!, text: n.text!, isPinned: !n.isPinned!, noteID: n._id! }))}>
                                        <PushPinRounded />
                                    </IconButton>
                                    <IconButton size="small" onClick={()=>dispatch(deleteNote({ noteID: n._id!, universityID }))}>
                                        <DeleteRounded />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </Masonry>
                </div>
                <div className="notes__AddNew" onClick={()=>dispatch(setNotesPopup({ isOpen: true, type: "CREATE", index: -1 }))}>
                    <IconButton size="large">
                        <AddRounded />
                    </IconButton>
                </div>
            </main>
        </div>
    );
};

export default Notes;
