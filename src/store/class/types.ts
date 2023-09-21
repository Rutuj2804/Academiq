import { NavigateFunction } from "react-router-dom";
import { ClassInterface } from "../../utils/types/class";
import { PaginationInterface } from "../../utils/types";

export interface ClassState {
    classes: ClassInterface[];
    class: ClassInterface;
    display: {
        all: number,
        active: number,
        deleted: number
    },
    pagination: PaginationInterface
}

export interface GetClassRequest {
    isActive: string;
    universityID: string;
    page?: number
}

export interface AddClassRequest {
    name: string;
    description: string;
    universityID: string;
    navigate: NavigateFunction;
}
