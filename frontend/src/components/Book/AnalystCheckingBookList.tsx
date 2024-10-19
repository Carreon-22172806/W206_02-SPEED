import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Book } from './Book';
import HomeNavs from "../HomeNavs";
import Image from "next/image";
import BookCardAdmin from "./BookCard-admin";

function AnalystCheckingBookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [duplicateMessage, setDuplicateMessage] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('under-review'); // Default filter

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

    useEffect(() => {
        // Filter books based on the selected status
        const filtered = books.filter(book => book.status === filterStatus);
        setFilteredBooks(filtered);
    }, [books, filterStatus]); // Re-run this when books or filterStatus changes

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
        <div className='AnalyzingList'>
            <HomeNavs />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <h2 className="display-4 text-center">SPEED Database</h2>
                    </div>
                    <div className="col-md-11">
                        <Link href='/' className='btn btn-outline-warning float-left'>
                            <img src="https://img.icons8.com/?size=100&id=12773&format=png&color=000000" alt="Search icon" height={30}/> Search
                        </Link>
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>

                {/* Dropdown to filter by status */}
                <div className="filter-section">
                    <label htmlFor="statusFilter">Filter by Status: </label>
                    <select id="statusFilter" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="under-review">Under-Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <div className="list">
                    {filteredBooks.length === 0
                        ? 'There is no book record with this status in the system!'
                        : filteredBooks.map((book, k) => (
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

export default AnalystCheckingBookList;
