import { NoteInterface } from "../../utils/types";

export interface NoteState {
    notes: NoteInterface[],
}

export interface CreateNoteRequest {
    universityID: string;
    title: string;
    text: string;
    isPinned?: boolean;
}

export interface UpdateNoteRequest {
    title: string;
    text: string;
    isPinned?: boolean;
    noteID: string;
}

export interface GetNoteRequest {
    universityID: string;
}

export interface DeleteNoteRequest {
    noteID: string;
    universityID: string;
}