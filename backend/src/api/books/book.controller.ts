import { Body, Controller, Delete,
    Get, HttpException, HttpStatus, 
    Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './create-book.dto';
import { error } from 'console';

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
            return this.bookService.findAll();
        } catch {
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

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        try {
            return this.bookService.findOne(id);
        } catch {
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

    //Create/add a book
    @Post('/')
    async addBook(@Body() createBookDto: CreateBookDto)
    {
        try {
            await this.bookService.create(createBookDto);
            return { message: 'This book has been added successfully.'}
        } catch {
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
    async updateBook(
        @Param('id') id: string,
        @Body() createBookDto: CreateBookDto,
    ) {
        try {
            await this.bookService.update(id, createBookDto);
            return { message: 'This book has been updated successfully.'};
        } catch {
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
            return await await this.bookService.delete(id);
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No such a book',
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }
}
