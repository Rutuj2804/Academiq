export const errorType = {
    0: "ERROR",
    1: "SUCCESS",
};

export interface Message {
    _id: string;
    text: string;
    type: string;
}

export interface MessageState {
    messages: Message[]
}
