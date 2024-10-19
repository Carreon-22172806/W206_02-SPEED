import React, { useState, useEffect } from "react";
import Link from "next/link";
import BookCard from "./BookCard";
import { Book } from './Book';
import HomeNavs from "../HomeNavs";
import Image from "next/image";

function ShowBookListUser() {
    const [books, setBooks] = useState<Book[]>([]);
    const [duplicateMessage, setDuplicateMessage] = useState<string>('');

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
        .then((res) => res.json())
        .then((data) => {
            setBooks(data);
        })
        .catch((err) => {
            console.log('Error from ShowBookListUser: ' + err);
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
        <div className='ShowBookListUser'>
            <HomeNavs />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <h2 className="display-4 text-center">SPEED Database</h2>
                    </div>
                    <div className="col-md-11">
                        <Link href='/' className='btn btn-outline-warning float-left'> <img src="https://img.icons8.com/?size=100&id=12773&format=png&color=000000" alt="Search icon" height={30}/> Search</Link>
                        <Link href='/create-book' className='btn btn-outline-warning float-right'>
                            + Add New Article
                        </Link>
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>
                <div className="list2">
                    {books.length === 0
                        ? 'There is no book record in the system!'
                        : books.map((book, k) => (
                            <div key={k}>
                                <BookCard book={book} />
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

export default ShowBookListUser;
