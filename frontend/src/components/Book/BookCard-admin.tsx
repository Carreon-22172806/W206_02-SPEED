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
                <table>
                <tr> <td>Article ID: </td><td>{book._id} </td></tr>
                <tr> <td>Article Title: </td><td>{book.title} </td></tr>
                <tr> <td>Article Author: </td><td>{book.author} </td></tr>
                <tr> <td>Article Year of Published: </td><td>{book.yob} </td></tr>
                <tr> <td>Article Journal Name: </td><td>{book.journalName} </td></tr>
                <tr> <td>Article Status: </td><td>{book.status} </td></tr>
                <tr> <td>Average Rating: </td><td>{averageRating.toFixed(1)} </td></tr>
                <br />
                </table>

                <Link href={`/show-book-details/${book._id}`} className='btn btn-outline-warning float-right'>
                    Configure Article
                </Link>
            </div>
        </div>
    );
};

export default BookCardAdmin;