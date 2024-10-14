export type Book = {
    _id? : string;
    title?: string;
    author?: string[];
    journalName?: string;
    yob?: number;
    volume?: number;
    number?: number;
    pages?: string;
    DOI?: string;
    status?: string;
};

export const DefaultEmptyBook: Book = {
    _id: undefined,
    title: '',
    author: [],
    journalName: '',
    yob: undefined,
    volume: undefined,
    number: undefined,
    pages: '',
    DOI: '',
    status: '',
}