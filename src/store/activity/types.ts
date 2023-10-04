import { NavigateFunction } from "react-router-dom";
import { ActivityInterface, PaginationInterface } from "../../utils/types";

export interface ActivityState {
    activities: ActivityInterface[];
    activity: ActivityInterface;
    display: {
        all: number,
        active: number,
        deleted: number
    },
    pagination: PaginationInterface
}

export interface GetActivityRequest {
    isActive: string;
    universityID: string;
    page?: number;
}

export interface AddActivityRequest {
    name: string;
    description: string;
    universityID: string;
    priority: number;
    deadline: string;
    classID: string;
    sendEmailNotification: boolean;
    files: File[]
    navigate: NavigateFunction;
}
