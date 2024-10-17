import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './create-book.dto';

@Controller('api/books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get('/test')
    test() {
        return this.bookService.test();
    }

    @Get('/')
    async findAll() {
        try {
            return await this.bookService.findAll();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No Books Found',
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }

    @Get('/rejected')
    async findRejected() {
        try {
            return await this.bookService.findRejected();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No Rejected Articles Found',
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        try {
            return this.bookService.findOne(id);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No Book Found',
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }

    @Post('/')
    async addBook(@Body() createBookDto: CreateBookDto) {
        try {
            await this.bookService.create(createBookDto);
            return { message: 'This book has been added successfully.' };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Unable to add this book',
                },
                HttpStatus.BAD_REQUEST,
                { cause: error },
            );
        }
    }

    @Post('/:id')
    async updateBook(@Param('id') id: string, @Body() createBookDto: CreateBookDto) {
        try {
            await this.bookService.update(id, createBookDto);
            return { message: 'This book has been updated successfully.' };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Unable to update this book',
                },
                HttpStatus.BAD_REQUEST,
                { cause: error },
            );
        }
    }

    @Delete('/:id')
    async deleteBook(@Param('id') id: string) {
        try {
            return await this.bookService.delete(id);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No such book',
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }

    @Get('/check-duplicate/:doi')
    async checkDuplicate(@Param('doi') doi: string) {
        try {
            // Decode the DOI parameter
            const decodedDoi = decodeURIComponent(doi);
            const result = await this.bookService.checkDuplicate(decodedDoi);
            if (result.exists) {
                return {
                    message: 'The book exists in the database.',
                    rejected: result.rejected,
                };
            } else {
                return { message: 'The book does not exist in the database.' };
            }
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Unable to check for duplicates',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
                { cause: error },
            );
        }
    }

    @Post('/:id/rate')
    async rateBook(@Param('id') id: string, @Body('rating') rating: number) {
      try {
        if (rating < 1 || rating > 5) {
          throw new HttpException('Rating must be between 1 and 5', HttpStatus.BAD_REQUEST);
        }
        const updatedBook = await this.bookService.addRating(id, rating);
        return { message: 'Rating added successfully', averageRating: updatedBook.averageRating };
      } catch (error) {
        throw new HttpException('Failed to add rating', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Get('/:id/rating')
    async getBookRating(@Param('id') id: string) {
      try {
        const averageRating = await this.bookService.getAverageRating(id);
        return { averageRating };
      } catch (error) {
        throw new HttpException('Failed to get average rating', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Patch(':id/reject')
    rejectBook(@Param('id') bookId: string) {
    return this.bookService.rejectBook(bookId);
  }
}
