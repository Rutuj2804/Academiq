import { AuthInterface } from "../../utils/types";

export interface AuthState {
    isAuthenticated: boolean,
    user: AuthInterface
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    firstname: string;
    midname?: string;
    lastname: string;
    stateID: string;
    countryID: string;
    dob: string;
}