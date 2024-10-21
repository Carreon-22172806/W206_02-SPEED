import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Book } from './Book';
import HomeNavs from "../HomeNavs";
import BookCardAdmin from "./BookCard-admin";

function AnalystCheckingBookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [duplicateMessage, setDuplicateMessage] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('under-review'); // Default filter
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [filterType, setFilterType] = useState<string>('title'); 

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
        // Filter books based on the selected status and search term
        const filtered = books.filter(book => {
            const matchesStatus = book.status === filterStatus;
            const searchLower = searchTerm.toLowerCase(); 
            const matchesSearch = filterType === 'title'
                ? book.title.toLowerCase().includes(searchLower)
                : filterType === 'author'
                ? book.author.some(author => author.toLowerCase().includes(searchLower))
                : filterType === 'doi'
                ? book.DOI.toLowerCase().includes(searchLower)
                : filterType === 'journalName'
                ? book.journalName.toLowerCase().includes(searchLower)
                : true; // Default to true for 'all' or unexpected values

            return matchesStatus && matchesSearch;
        });
        setFilteredBooks(filtered);
    }, [books, filterStatus, searchTerm, filterType]); // Re-run this when books, filterStatus, searchTerm, or filterType changes

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
                        <br />
                        <hr />
                    </div>
                </div>

                {/* Search bar and dropdown for filtering */}
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
                        style={{ fontSize: '1.2rem', padding: '10px', flex: '0.4', border: '1px solid #ced4da' }} 
                    >
                        <option value="all">Search by All</option>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="doi">DOI</option>
                        <option value="journalName">Journal Name</option>
                    </select>
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