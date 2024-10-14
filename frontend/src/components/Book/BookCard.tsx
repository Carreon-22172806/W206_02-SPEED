import React from "react";
import { Book } from './Book';
import { useRouter } from "next/navigation";
import Link from "next/link";


interface IProp {
    book?: Book;
}

const BookCard = ({ book }: IProp) => {
    const router = useRouter();
    if (book == undefined) {
        return null;
    }
    const onClick = () => {
        router.push(`/show-book/${book._id}`)
    };
    return (
        <div className="card-container" onClick={onClick}>
            <img src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d" alt="Books" height={200} />
            <div className="details">
                <h1> {book.title} </h1>
                <h3> {book.author} <br /> {book.yob} </h3>
                <p> {book.journalName} </p>
                <p> {book._id}</p>
                <br />
                <Link href={`/show-book-details/${book._id}`} className='btn btn-outline-warning float-right'>
                        Configure Article
                </Link>
            </div>
        </div>
    );
};

export default BookCard;