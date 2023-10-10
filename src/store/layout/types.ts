export interface LayoutState {
    sidebar: boolean,
    settings: boolean,
    background: boolean
    background_modules: boolean
    search: boolean
    popup: boolean
    profile: boolean
    notifications: boolean
    delete: DeleteModal
    assignment: AssignmentModal
}

export interface DeleteModal {
    isOpen: boolean;
    callback: () => void;
    text: string;
}

export interface AssignmentModal {
    isOpen: boolean;
    type: "FACULTY" | "COURSES" | null
}