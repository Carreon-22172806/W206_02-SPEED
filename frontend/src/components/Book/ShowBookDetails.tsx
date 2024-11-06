'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book, DefaultEmptyBook } from "./Book";
import Link from 'next/link';
import HomeNavs from "../HomeNavs";

function ShowBookDetails() {
    const [book, setBook] = useState<Book>(DefaultEmptyBook);
    const params = useParams(); // Get URL parameters
    const router = useRouter();
    const id = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure id is a string

    useEffect(() => {
        if (id) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`)
                .then((res) => res.json())
                .then((json) => setBook(json))
                .catch((err) => console.log('Error from ShowBookDetails: ' + err));
        }
    }, [id]);

    const onDeleteClick = (id: string) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`, { method: 'DELETE' })
            .then(() => {
                router.push('/show-books/{id}'); // Redirect to the list of books after deletion
            })
            .catch((err) => console.log('Error from ShowBookDetails_deleteClick: ' + err));
    };

    const BookItem = (
        <div>
            <table className="table table-hover table-dark table-striped table-bordered">
                <tbody>
                    <tr>
                        <th scope='row'> 1 </th>
                        <td> Article ID </td>
                        <td>{id}</td>
                        <td> <button> Hide </button></td>
                    </tr>
                    <tr>
                        <th scope='row'> 2 </th>
                        <td> Title </td>
                        <td>{book.title}</td>
                        <td> <button> Hide </button></td>
                    </tr>
                    <tr>
                        <th scope='row'> 3 </th>
                        <td> Author </td>
                        <td>{book.author}</td>
                        <td> <button> Hide </button></td>
                    </tr>
                    <tr>
                        <th scope='row'> 4 </th>
                        <td> Journal / Conference Name </td>
                        <td>{book.journalName}</td>
                        <td> <button> Hide </button></td>
                    </tr>
                    <tr>
                        <th scope='row'> 5 </th>
                        <td> Year of Published </td>
                        <td>{book.yob}</td>
                        <td> <button> Hide </button></td>
                    </tr>
                    <tr>
                        <th scope='row'> 6 </th>
                        <td> Article Volume </td>
                        <td>{book.volume}</td>
                        <td> <button> Hide </button></td>
                    </tr>
                    <tr>
                        <th scope='row'> 7 </th>
                        <td> Article Number </td>
                        <td>{book.number}</td>
                        <td> <button> Hide </button></td>
                    </tr>
                    <tr>
                        <th scope='row'> 8 </th>
                        <td> Article Pages </td>
                        <td>{book.pages}</td>
                        <td> <button> Hide </button></td>
                    </tr>
                    <tr>
                        <th scope='row'> 9 </th>
                        <td> Article DOI </td>
                        <td>{book.DOI}</td>
                        <td> <button> Hide </button></td>
                    </tr>
                    <tr>
                        <th scope='row'> 10 </th>
                        <td> Status </td>
                        <td>{book.status}</td>
                        <td> <button> Hide </button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="ShowBookDetails">
            <HomeNavs />
            <div className="container">
                <div className="row">
                    <div className="col-md-10 m-auto">
                        <br /> <br />
                    </div>
                    <br />
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Book's Record</h1>
                        <p className="lead text-center">View Book's Info</p>
                        <hr /> <br />
                    </div>
                    <div className="col-md-10 m-auto">{BookItem}</div>
                    <div className="col-md-6 m-auto">
                    <div className="col-md-6 m-auto">
                        <button className="btn btn-danger" onClick={() => onDeleteClick(id)}>
                            Delete Book
                        </button>
                    </div>   
                    </div>
                    <div className="col-md-6 m-auto">
                        <Link href={`/edit-book/${id}`} className="btn btn-outline-info btn-lg btn-block">
                            Edit Book
                        </Link>
                    </div>

                    <div className="col-md-6 m-auto">
                        <button className='btn btn-success' onClick={() => console.log('Accepted')}>Accept</button>
                        <button className="btn btn-danger" onClick={() => console.log('Rejected')}>Reject</button>
                        <br />
                        <textarea
                            placeholder="Reasons/Comments: "
                            style={{ width: '100%', height: '100px', resize: 'none' }} // Adjust size as needed
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowBookDetails;
