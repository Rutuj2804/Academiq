import { AuthInterface } from "./auth";
import { DocumentInterface } from "./base";

export interface DemandType extends DocumentInterface {
    name?: string;
    description?: string;
    createdBy?: AuthInterface
}