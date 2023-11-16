import { EventPostInterface } from "../../utils/types";

export interface EventState {
    events: EventPostInterface[]
}

export interface CreateEventPostRequest {
    universityID: string;
    description?: string;
}