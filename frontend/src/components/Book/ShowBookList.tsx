// ShowBookList.tsx

import React, { useState, useEffect } from "react";
import Link from "next/link";
import BookCard from './BookCard';
import { Book } from './Book';
import HomeNavs from "../HomeNavs";

function ShowBookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [duplicateMessage, setDuplicateMessage] = useState<string>('');

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
        .then((res) => res.json())
        .then((data) => {
            setBooks(data);
        })
        .catch((err) => {
            console.log('Error from ShowBookList: ' + err);
        });
    }, []);

    const checkForDuplicates = async (doi: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/check-duplicate/${doi}`);
            const data = await res.json();
            if (data.message) {
                setDuplicateMessage(data.message);
                if (data.rejected) {
                    setDuplicateMessage('This article has been rejected previously.');
                }
            }
        } catch (err) {
            console.log('Error checking duplicate: ' + err);
        }
    };

    const bookList =
        books.length === 0
            ? 'There is no book record in the system!'
            : books.map((book, k) => (
                <div key={k}>
                    <BookCard book={book} />
                    {/* Assuming each book has a DOI to check for duplicates */}
                    <button 
  onClick={() => book.DOI && checkForDuplicates(book.DOI)}
  disabled={!book.DOI}  
>
  Check for Duplicate
</button>

                    
                </div>
            ));

    return (
        <div className='ShowBookList'>
            <HomeNavs />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <h2 className="display-4 text-center">Books List</h2>
                    </div>
                    <div className="col-md-11">
                        <Link href='/create-book' className='btn btn-outline-warning float-right'>
                            + Add New Book
                        </Link>
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>
                <div className="list">{bookList}</div>
                <div>{duplicateMessage && <p>{duplicateMessage}</p>}</div>
            </div>
        </div>
    );
}

export default ShowBookList;
