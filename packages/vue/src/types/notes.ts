export interface Note {
    manager: string,
    date: string | Date,
    text: string
}

export type Notes = Note[];
