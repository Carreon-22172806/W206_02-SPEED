import React, { useState, useEffect, ChangeEvent, FormEvent, ChangeEventHandler } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book, DefaultEmptyBook } from "./Book";
import Link from "next/link";
import HomeNavs from "../HomeNavs";

function UpdateBookInfo() {
    const [book, setBook] = useState<Book>(DefaultEmptyBook);
    const id = useParams<{ id : string }>().id;
    const router = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setBook(json);
            })
            .catch((err) => {
                console.log('Error from UpdateBookInto: ' + err);
            });
    }, [id]);

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBook({ ...book, [event.target.name]: event.target.value});
    };

    const textAreaOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBook({ ...book, [event.target.name]: event.target.value});
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`, {method: 'PUT', headers: {"Content-Type": "application/json"}, body: JSON.stringify(book)})
            .then((res) => {
                router.push(`/show-book-details/${id}`);
            })
            .catch((err) => {
                console.log("Error from UpdateBookInfo: " + err);
            });
    };

    return (
        <div className="UpdateBookInfo">
            <HomeNavs />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br />
                    </div>
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center"> Edit Book </h1>
                        <p className ='lead text-center'> Update Book&quot;s Info</p>
                    </div>
                </div>
                <div className="col-md-8 m-auto">
                    <form noValidate onSubmit={onSubmit}>
                        {/* TITLE */}
                        <div className="form-group">
                            <label htmlFor="title"> Title </label>
                            <input type="text" placeholder="Title of the Book" name="title" className="form-control" value={book.title} onChange={inputOnChange} />
                        </div>
                        <br />
                        {/* AUTHOR */}
                        <div className="form-group">
                            <label htmlFor="author"> Author </label>
                            <textarea placeholder="Author(s), seperated by commas" name="author" className="form-control" value={book.author?.join(', ')} onChange={textAreaOnChange} />
                        </div>
                        <br />
                        {/* JOURNAL NAME */}
                        <div className="form-group">
                            <label htmlFor="journalName"> Journal Name </label>
                            <input type="text" placeholder="Journal/Conference Name" name="journalName" className="form-control" value={book.journalName} onChange={inputOnChange} />
                        </div>
                        <br />
                        {/* YEAR OF PUBLICATION */}
                        <div className="form-group">
                            <label htmlFor="yob"> Year of Publication </label>
                            <input type="number" placeholder="Year of Publication" name="yob" className="form-control" value={book.yob} onChange={inputOnChange} />
                        </div>
                        <br />
                        {/* VOLUME */}
                        <div className="form-group">
                            <label htmlFor="volume"> Book Volume </label>
                            <input type="number" placeholder="Book Volume" name="volume" className="form-control" value={book.volume} onChange={inputOnChange} />
                        </div>
                        <br />
                        {/* NUMBER */}
                        <div className="form-group">
                            <label htmlFor="number"> Book Number </label>
                            <input type="number" placeholder="Book Number" name="number" className="form-control" value={book.number} onChange={inputOnChange} />
                        </div>
                        <br />
                        {/* PAGES */}
                        <div className="form-group">
                            <label htmlFor="pages"> Book Pages </label>
                            <input type="text" placeholder="Book Pages" name="pages" className="form-control" value={book.pages} onChange={inputOnChange} />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-outline-warning btn-block">
                            Update Book
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateBookInfo;