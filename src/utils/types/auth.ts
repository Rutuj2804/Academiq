import { DocumentInterface } from "./base";

export interface AuthInterface extends DocumentInterface {
    email?: string;
    firstname?: string;
    lastname?: string;
    midname?: string;
}