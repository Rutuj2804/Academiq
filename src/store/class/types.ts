import { NavigateFunction } from "react-router-dom";

export interface ClassState {
    classes: [];
    class: {
        _id?: string;
        name: string;
        description: string;
        createdBy: string;
        isActive: boolean;
    };
}

export interface GetClassData {
    isActive: boolean;
    universityID: string;
    role: string;
}

export interface AddClassData {
    name: string;
    description: string;
    universityID: string;
    navigate: NavigateFunction;
}
