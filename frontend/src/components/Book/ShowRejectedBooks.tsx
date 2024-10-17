'use client';

import React, { useEffect, useState } from 'react';
import { Book } from './Book';
import HomeNavs from '../HomeNavs';
import Link from 'next/link';

const ShowRejectedBooks = () => {
    const [rejectedBooks, setRejectedBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchRejectedBooks = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/rejected`);
                if (!response.ok) throw new Error('Failed to fetch rejected books');
                const data = await response.json();
                setRejectedBooks(data);
            } catch (error) {
                console.error('Error fetching rejected books:', error);
            }
        };

        fetchRejectedBooks();
    }, []);

    return (
        <div
            style={{
                background: 'linear-gradient(to bottom, #8d3d51, #310000)',
                minHeight: '100vh',
                color: 'white',
                paddingBottom: '20px',
            }}
        >
            <HomeNavs />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', color: 'white' }}>Rejected Articles</h1>
                        <p className="lead text-center" style={{ color: 'white' }}>List of Rejected Articles</p>
                        <hr /> <br />
                    </div>
                </div>

                <div className="list-group">
                    {rejectedBooks.length === 0 ? (
                        <p className="text-center" style={{ color: 'white' }}>No rejected articles found.</p>
                    ) : (
                        rejectedBooks.map((book) => (
                            <div
                                key={book._id}
                                className="list-group-item list-group-item-action flex-column align-items-start"
                                style={{ color: 'white', backgroundColor: 'transparent' }}  // Transparent background for list items
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{book.title}</h5>
                                    <small>{book.yob}</small>
                                </div>
                                <p className="mb-1">Authors: {book.author?.join(', ')}</p>
                                <p className="mb-1">Journal: {book.journalName}</p>
                                <p>Status: {book.status}</p>
                                <Link
                                    href={`/show-book-details/${book._id}`}
                                    className="btn btn-outline-info mt-3"
                                    style={{ color: 'white', borderColor: 'white' }}  // White-styled button
                                >
                                    View Details
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowRejectedBooks;