import React, { useState } from "react";
import { Book } from './Book';
import { useRouter } from "next/navigation";
import Image from "next/image";

interface IProp {
    book?: Book;
}

const BookCard = ({ book }: IProp) => {
    const router = useRouter();
    const [rating, setRating] = useState<number | null>(null);
    const [averageRating, setAverageRating] = useState<number>(book?.averageRating || 0);

    if (book == undefined) {
        return null;
    }

    const onClick = () => {
        router.push(`/show-book/${book._id}`)
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
        <div className="card-container">
            <Image src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d" alt="Books" height={200} onClick={onClick} />
            <div className="details">
                <h1>{book.title}</h1>
                <h3>{book.author} <br /> {book.yob}</h3>
                <p>{book.journalName}</p>
                <p>{book._id}</p>
                <div className="rating">
                    <p>Average Rating: {averageRating.toFixed(1)}</p>
                    <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRating(star);
                                }}
                                style={{ cursor: 'pointer', color: star <= (rating || 0) ? 'gold' : 'gray' }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <br />
            </div>
        </div>
    );
};

export default BookCard;