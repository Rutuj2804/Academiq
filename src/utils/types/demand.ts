import { AuthInterface } from "./auth";
import { DocumentInterface } from "./base";

export interface DemandType extends DocumentInterface {
    name?: string;
    description?: string;
    createdBy?: AuthInterface
}

export interface Demand extends DocumentInterface {
    demandedBy?: AuthInterface;
    reason?: string;
    type?: DemandType;
    status?: string;
}