import { NavigateFunction } from "react-router-dom";
import { ActivityInterface, AuthInterface, PaginationInterface, SubmissionInterface } from "../../utils/types";

export interface ActivityState {
    activities: ActivityInterface[];
    submissions: SubmissionInterface[];
    pending: AuthInterface[];
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

export interface GetActivitySubmissionsRequest extends GetActivityRequest {
    activityID: string;
}

export interface GetActivityFromClassRequest {
    classID: string;
    universityID: string;
}

export interface GetActivityByIDRequest {
    activityID: string;
    universityID: string;
}

export interface DeleteActivityRequest {
    activityID: string[];
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

export interface AddSubmissionRequest {
    title: string;
    description: string;
    files: FileList | null;
    activityID: string
    navigate: NavigateFunction;
    universityID: string;
}