import React, { useState } from 'react';

const AdminBookModifier: React.FC = () => {
  const [bookId, setBookId] = useState('');
  const [updateData, setUpdateData] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/books/${bookId}/admin-modify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'admin-key': adminKey
        },
        body: updateData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setMessage(`Book updated successfully: ${JSON.stringify(result)}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Error updating book: ${error.message}`);
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Modify Book Record Directly</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book ID:</label>
          <input
            type="text"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Update Data (JSON format):</label>
          <textarea
            value={updateData}
            onChange={(e) => setUpdateData(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Admin Key:</label>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Book</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminBookModifier;