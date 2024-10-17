// src/components/Book/RejectBookButton.tsx
import { useState } from 'react';

type RejectBookButtonProps = {
  bookId: string;
};

const RejectBookButton: React.FC<RejectBookButtonProps> = ({ bookId }) => {
  const [isRejected, setIsRejected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rejectBook = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${bookId}/reject`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to reject the book');
      }

      setIsRejected(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {isRejected ? (
        <p>The book has been rejected.</p>
      ) : (
        <button onClick={rejectBook}>Reject Book</button>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default RejectBookButton;