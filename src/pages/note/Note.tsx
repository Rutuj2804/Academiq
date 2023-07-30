import React from "react";

interface NoteCI {
    text: string
}

const Note = ({ text }: NoteCI) => {
    return <div>{text}</div>;
};

export default Note;
