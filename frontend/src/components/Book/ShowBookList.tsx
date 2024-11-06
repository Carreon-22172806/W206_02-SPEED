import React, { useState, useEffect } from "react";
import BookCardAdmin from "./BookCard-admin";
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
            const encodedDoi = encodeURIComponent(doi);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/check-duplicate/${encodedDoi}`);
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

    return (
        <div className='ShowBookList'>
            <HomeNavs />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <h2 className="display-4 text-center">Moderation Dashboard</h2>
                    </div>
                    <div className="col-md-11">
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>
                <div className="list">
                    {books.length === 0
                        ? 'No modifications needed!'
                        : books.map((book, k) => (
                            <div key={k}>
                                <BookCardAdmin book={book} />
                                <button 
                                    onClick={() => book.DOI && checkForDuplicates(book.DOI)}
                                    disabled={!book.DOI}  
                                >
                                    Check for Duplicate
                                </button>
                            </div>
                        ))
                    }
                </div>
                <div>{duplicateMessage && <p>{duplicateMessage}</p>}</div>
            </div>
        </div>
    );
}

export default ShowBookList;
