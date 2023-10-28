import { CloseRounded } from "@mui/icons-material";
import { IconButton, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutsideClickHandler } from "../../utils/hooks";
import { setNotesPopup } from "../../store/layout/slice";
import { Input } from "../../common/forms/input";
import { Textarea } from "../../common/forms/textarea";
import { CheckboxAndLabel } from "../../common/forms/checkbox";
import { createNote, updateNote } from "../../store/note/actions";
import { RootState } from "../../store";

const AddNotes = () => {
    const [formData, setFormData] = useState({
        title: "",
        text: "",
    });

    const { title, text } = formData;

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const [isPinned, setIsPinned] = useState(false);

    const universityID = useSelector((state: RootState) => state.university.university.value)

    const note = useSelector((state: RootState) => state.note.notes)
    const noteMode = useSelector((state: RootState) => state.layout.notes)

    useEffect(() => {
        if(noteMode.type && noteMode.type === "UPDATE" && noteMode.index >= 0 && note.length) {
            setFormData(f=>({ ...f, title: note[noteMode.index].title!, text: note[noteMode.index].text! }))
            setIsPinned(note[noteMode.index].isPinned!)
        }
    }, [noteMode, note])

    const dispatch = useDispatch<any>();

    const notesRef = useRef<HTMLDivElement>(null);

    useOutsideClickHandler(notesRef, () => dispatch(setNotesPopup({ isOpen: false, type: null, index: -1 })));

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(noteMode.type === "CREATE") {
            dispatch(createNote({ title, text, isPinned, universityID }))
        } else if(noteMode.type === "UPDATE" && noteMode.index >= 0) {
            dispatch(updateNote({ title, text, isPinned, noteID: note[noteMode.index]._id! }))
        }
        dispatch(setNotesPopup({ isOpen: false, type: null, index: -1 }))
    };

    return (
        <div ref={notesRef} className="standard__Popup addNotes__Wrapper">
            <div className="addNotes__Header">
                <h5>{noteMode.type === "CREATE" ? "Add" : "Update"} Note</h5>
                <IconButton onClick={() => dispatch(setNotesPopup({ isOpen: false, type: null, index: -1 }))}>
                    <CloseRounded />
                </IconButton>
            </div>
            <div className="addNotes__Form">
                <form onSubmit={onSubmit}>
                    <Input
                        value={title}
                        name="title"
                        onChange={onChange}
                        placeholder="Title"
                        required
                        autoFocus
                    />
                    <Textarea
                        value={text}
                        name="text"
                        onChange={onChange}
                        placeholder="Note"
                        rows={6}
                    />
                    <CheckboxAndLabel
                        id="isPinned"
                        label="Is Pinned"
                        description="Pins the note at the top of the page if this field is checked."
                        checked={isPinned}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setIsPinned(e.target.checked)
                        }
                    />
                    <Button type="submit">{noteMode.type === "CREATE" ? "Add" : "Update"} Note</Button>
                </form>
            </div>
        </div>
    );
};

export default AddNotes;
