import React, { useState } from "react";
import { Book } from './Book';
import { useRouter } from "next/navigation";
import Link from "next/link";


interface IProp {
    book?: Book;
}

const BookCardAdmin = ({ book }: IProp) => {
    const router = useRouter();
    const [rating, setRating] = useState<number | null>(null);
    const [averageRating, setAverageRating] = useState<number>(book?.averageRating || 0);

    if (book == undefined) {
        return null;
    }

    const onClick = () => {
        router.push(`/show-book-details/${book._id}`)
    };

    const handleRating = async (newRating: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book._id}/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating: newRating }),
            });

            if (response.ok) {
                const data = await response.json();
                setAverageRating(data.averageRating);
                setRating(newRating);
            } else {
                console.error('Failed to submit rating');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    return (
        <div className="card-container3">
            <img src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d" alt="Books" height={200} onClick={onClick} />
            <div className="details">
                <p> Article Title:            {book.title} </p>
                <p> Article Author: {book.author} </p>
                <p> Article Year of Published: {book.yob} </p>
                <p> Article Journal/Conference Name {book.journalName} </p>
                <p> Article ID {book._id}</p>
                <p> Article Status {book.status}</p>
                <p> Average Rating: {averageRating.toFixed(1)}</p>
                <br />


                <Link href={`/show-book-details/${book._id}`} className='btn btn-outline-warning float-right'>
                    Configure Article
                </Link>
            </div>
        </div>
    );
};

export default BookCardAdmin;