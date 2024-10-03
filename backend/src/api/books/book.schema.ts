import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument } from "mongoose";

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
    @Prop ({required: true})
    title: string;

    @Prop ({required: true})
    author: string[];

    @Prop ({required: true})
    journalName: string;

    @Prop ({required: true})
    yob: number;

    @Prop ({required: true})
    volume: number;

    @Prop ({required: true})
    number: number;

    @Prop ({required: true})
    pages: string;

    @Prop ({required: true})
    DOI: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);