import React, { useState, useEffect } from "react";
import Link from "next/link";
import BookCard from "./BookCard";
import { Book } from './Book';
import HomeNavs from "../HomeNavs";

function ShowBookListUser() {
    const [books, setBooks] = useState<Book[]>([]);
    const [duplicateMessage, setDuplicateMessage] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [filterType, setFilterType] = useState<string>('title'); 

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
                console.log(data); 
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

    const filteredBooks = books.filter(book => {
        const searchLower = searchTerm.toLowerCase(); 
        switch (filterType) {
            case 'title':
                return book.title && book.title.toLowerCase().includes(searchLower);
            case 'author':
                return book.author && book.author.some(author => author.toLowerCase().includes(searchLower));
            case 'status':
                return book.status && book.status.toLowerCase().includes(searchLower); // Assuming 'status' is a property of the book
            case 'all':
                return (
                    book.title?.toLowerCase().includes(searchLower) ||
                    book.author?.some(author => author.toLowerCase().includes(searchLower)) ||
                    (book.status && book.status?.toLowerCase().includes(searchLower)) // Include status in the 'all' search
                );
            default:
                return true;
        }
    });

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
                        <div className="input-group mb-3" style={{ maxWidth: '100%' }}>
                            <input 
                                type="text" 
                                placeholder="Search for books..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                className="form-control" 
                                style={{ fontSize: '1.2rem', padding: '10px', flex: '1' }} 
                            />
                            <select 
                                className="form-select" 
                                value={filterType} 
                                onChange={(e) => setFilterType(e.target.value)} 
                                style={{ fontSize: '1.2rem', padding: '10px', flex: '1', border: '1px solid #ced4da' }}
                            >
                                <option value="all">Search by All</option>
                                <option value="title">Title</option>
                                <option value="author">Author</option>
                                <option value="status">Status</option> {/* Changed to Status option */}
                            </select>
                            <Link href='/create-book' className='btn btn-outline-warning' style={{ fontSize: '1.2rem', flex: '0.4' }}>
                                + Add New Article
                            </Link>
                        </div>
                        <br />
                        <hr />
                    </div>
                </div>
                <div className="list2">
                    {filteredBooks.length === 0
                        ? 'There is no book record in the system!'
                        : filteredBooks.map((book, k) => (
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