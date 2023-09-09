import { DocumentInterface } from "./base";

export interface AuthInterface extends DocumentInterface {
    email?: string;
    firstName?: string;
    lastName?: string;
}