import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Book, DefaultEmptyBook } from "./Book";
import ShowBookDetails from "./ShowBookDetails";
import HomeNavs from "../HomeNavs";

const CreateBookComponent = () => {
    const navigate = useRouter();

    const [book, setBook] = useState<Book>(DefaultEmptyBook);

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: name === 'author' ? value.split(',').map(a => a.trim ()) : value });
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(book);
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
            method: 'POST', 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(book)})
            .then((res) => {
                console.log("Successfully submitted", res);
                setBook(DefaultEmptyBook);
                navigate.push("/show-book"); //Redirect after successful submission
            })
            .catch((err) => {
                console.error('There was a problem with the fetch operation: ', err);
            });
    };

    return (
        <div className="CreateBook">
            <HomeNavs />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br />
                    </div>
                    <div className="col-md-10 m-auto">
                        <h1 className="display-4 text-center">Suggest an Article</h1>
                        <p className="lead text-center">Create new article source</p>
                        <form noValidate onSubmit={onSubmit}>
                            {/* TITLE */}
                            <div className="form-group">
                                <input type="text" placeholder="Title of the Book" name="title" className="form-control" value={book.title} onChange={onChange}/>
                            </div>
                            <br />
                            {/* AUTHOR */}
                            <div className="form-group">
                                <textarea placeholder="Author(s), seperated by commas" name="author" className="form-control" value={book.author?.join(', ')} onChange={onChange} />
                            </div>
                            <br />
                            {/* JOURNAL NAME */}
                            <div className="form-group">
                                <input type="text" placeholder="Journal/Conference Name" name="journalName" className="form-control" value={book.journalName} onChange={onChange}/>
                            </div>
                            <br />
                            {/* YEAR OF PUBLICATION */}
                            <div className="form-group">
                                <input type="number" placeholder="Year Of Publication" name="yob" className="form-control" value={book.yob} onChange={onChange}/>
                            </div>
                            <br />
                            {/* VOLUME */}
                            <div className="form-group">
                                <input type="number" placeholder="Book Volumes" name="volume" className="form-control" value={book.volume} onChange={onChange}/>
                            </div>
                            <br />
                            {/* NUMBER */}
                            <div className="form-group">
                                <input type="number" placeholder="Book Number" name="number" className="form-control" value={book.number} onChange={onChange}/>
                            </div>
                            <br />
                            {/* PAGES */}
                            <div className="form-group">
                                <input type="text" placeholder="Book Pages" name="pages" className="form-control" value={book.pages} onChange={onChange}/>
                            </div>
                            <br /> 
                            <div className="form-group">
                                <input type="hidden" name="status" value="under-review" />
                            </div>
                            <button type="submit" className="btn btn-outline-warning btn-block mt-4 mb-4 w-100"> Submit Article</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBookComponent;