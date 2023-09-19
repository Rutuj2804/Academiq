import { NavigateFunction } from "react-router-dom";
import { ActivityInterface } from "../../utils/types";

export interface ActivityState {
    activities: ActivityInterface[];
    activity: ActivityInterface;
    display: {
        all: number,
        active: number,
        deleted: number
    }
}

export interface GetActivityRequest {
    isActive: string;
    universityID: string;
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
