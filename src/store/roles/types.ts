export interface RolesfState {
    defined: [],
    assigned: [],
    definedDetail: {},
    assignedToMe: {},
    display: {
        all: number,
        active: number,
        deleted: number
    }
}

export interface GetRolesDefinitionRequest {
    universityID: string;
    isActive: string;
}

export interface CreateRoleDefinitionRequest {
    universityID: string
    name: string;
    lectures: number;
    demandLetters: number;
    classes: number;
    courses: number;
    activities: number;
    schedule: number;
    timetable: number;
    students: number;
    faculties: number;
    staffs: number;
    chats: number;
    events: number;
    library: number;
    roles: number;
    notes: number;
    calls: number;
    collaborate: number;
}