import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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


    @Prop({ default: false })
    rejected: boolean;

    @Prop({ type: [Number], default: [] })
    ratings: number[];

    @Prop({ type: Number, default: 0 })
    averageRating: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);