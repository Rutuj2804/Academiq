import { LectureInterface } from "../../utils/types/lecture";

export interface LocationState {
    lectures: LectureInterface[]
}

export interface CreateLectureRequest {
    title: string;
    universityID: string;
    classID: string;
    courseID: string;
    start: string;
    end: string;
    description: string;
    isRepeating: boolean;
    repeatType: string;
    repeatUntil: string | undefined;
}

export interface GetLecturesRequest {
    universityID: string;
    page?: number;
}