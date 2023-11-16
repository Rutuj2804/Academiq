import { AuthInterface } from "./auth";
import { DocumentInterface } from "./base";

export interface EventPostInterface extends DocumentInterface {
    comments?: CommentInterface[];
    createdBy?: AuthInterface;
    description?: string;
    disableComments?: boolean;
    disableLikes?: boolean;
    images?: string[];
    isActive?: boolean;
    likes?: string[];
    universityID?: string;
}

export interface CommentInterface extends DocumentInterface {
    createdBy?: AuthInterface;
    text?: string;
}