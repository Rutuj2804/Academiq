import { NavigateFunction } from "react-router-dom";
import { ClassInterface } from "../../utils/types/class";

export interface ClassState {
    classes: ClassInterface[];
    class: ClassInterface;
    display: {
        all: number,
        active: number,
        deleted: number
    }
}

export interface GetClassRequest {
    isActive: string;
    universityID: string;
    role: string;
}

export interface AddClassRequest {
    name: string;
    description: string;
    universityID: string;
    navigate: NavigateFunction;
}
