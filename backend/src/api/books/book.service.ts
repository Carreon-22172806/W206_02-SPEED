import { Injectable } from "@nestjs/common";
import { Book } from "./book.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateBookDto } from "./create-book.dto";

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

    test(): string{
        return 'Testing Book route';
    }

    async findAll(): Promise<any[]> {
        const books = await this.bookModel.find().exec();
        return books.map((book) => ({
          ...book.toObject(), // Convert each Mongoose document to a plain JS object
          existsInDB: true,    // Add the custom field to indicate the book exists
        }));
      }

    // Check if a specific book exists by DOI
    async checkIfExists(doi: string): Promise<boolean> {
        const book = await this.bookModel.findOne({ DOI: doi }).exec();
        return !!book;  // Return true if book exists, false otherwise
    }

    async findOne(id: string): Promise<Book> {
        
        return await this.bookModel.findById(id).exec();
    }

    async create(createBookDto: CreateBookDto){
        return await this.bookModel.create(createBookDto);
    }

    async update(id: string, createBookDto: CreateBookDto) {
        return await this.bookModel.findByIdAndUpdate(id, createBookDto).exec();
    }

    async delete(id: string) {
        const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
        return deletedBook;
    }

    // Check if an article exists and if it's rejected
    async checkDuplicate(doi: string): Promise<{ exists: boolean, rejected: boolean }> {
        const book = await this.bookModel.findOne({ DOI: doi }).exec();
        if (book) {
            // If book exists, check if it was rejected
            return { exists: true, rejected: book.rejected || false }; // Assuming 'rejected' is a boolean field
        }
        return { exists: false, rejected: false };
    }
}