export interface Message {
    manager: string,
    subject: string,
    date: string | Date,
    text: string
}

export type Messages = Message[];
