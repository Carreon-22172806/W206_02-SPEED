export type Book = {
    title?: string;
    author?: string[];
    journalName?: string;
    yob?: number;
    volume?: number;
    number?: number;
    pages?: string;
    DOI?: string;
    status?: string;
    averageRating?: number;
};

export const DefaultEmptyBook: Book = {
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