import React, { useState, useEffect } from "react";
import { Book } from './Book';
import HomeNavs from "../HomeNavs";
import BookCardAdmin from "./BookCard-admin";

function AnalystCheckingBookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [duplicateMessage, setDuplicateMessage] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('under-review'); // Default status filter
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [filterType, setFilterType] = useState<string>('title'); // Default filter type

    useEffect(() => {
        // Fetch all books
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
            })
            .catch((err) => {
                console.log('Error from AnalystCheckingBookList: ' + err);
            });
    }, []);

    useEffect(() => {
        // Filter books based on the selected filter type (Title, Author) and Status
        const filtered = books.filter(book => {
            const searchLower = searchTerm.toLowerCase(); 

            // Check if the book matches the selected filter type (Title or Author)
            const matchesSearch = filterType === 'title'
                ? book.title?.toLowerCase().includes(searchLower)
                : book.author?.some(author => author.toLowerCase().includes(searchLower));

            // Check if the book matches the selected status
            const matchesStatus = book.status === filterStatus;

            // Return true if both search term and status match
            return matchesSearch && matchesStatus;
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
                        placeholder={`Search for books by ${filterType}`} 
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
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                    </select>
                </div>

                {/* Dropdown to filter by status */}
                <div className="filter-section mb-3">
                    <label htmlFor="statusFilter" style={{ marginRight: '10px' }}>Filter by Status:</label>
                    <select 
                        id="statusFilter" 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{ padding: '10px', fontSize: '1.2rem' }}
                    >
                        <option value="under-review">Under-Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {/* List of filtered books */}
                <div className="list">
                    {filteredBooks.length === 0
                        ? 'There are no book records matching the search criteria and status.'
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
