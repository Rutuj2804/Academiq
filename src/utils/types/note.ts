import { AuthInterface } from "./auth"
import { DocumentInterface } from "./base"

export interface NoteInterface extends DocumentInterface {
    title?: string;
    text?: string;
    isPinned?: boolean;
    userID?: AuthInterface
    universityID?: string
}