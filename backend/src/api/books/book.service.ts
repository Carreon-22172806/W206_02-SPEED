import { Injectable, NotFoundException } from "@nestjs/common";
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

    async addRating(id: string, rating: number): Promise<Book> {
        const book = await this.bookModel.findById(id);
        if (!book) {
          throw new Error('Book not found');
        }
    
        book.ratings.push(rating);
        book.averageRating = book.ratings.reduce((a, b) => a + b) / book.ratings.length;
    
        return book.save();
      }
    
      async getAverageRating(id: string): Promise<number> {
        const book = await this.bookModel.findById(id);
        if (!book) {
          throw new Error('Book not found');
        }
        return book.averageRating;
      }

      async modifyRecordDirectly(id: string, updateData: any): Promise<Book> {
        const updatedBook = await this.bookModel.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!updatedBook) {
          throw new NotFoundException(`Book with ID "${id}" not found`);
        }
        return updatedBook;
      }

}