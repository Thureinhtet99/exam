import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../context/BookContext";

export default function BookList() {
  const { books, addBook, deleteBook } = useBooks();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.year) {
      alert("Please fill in all fields");
      return;
    }

    addBook({
      title: formData.title,
      author: formData.author,
      year: parseInt(formData.year),
    });

    // Reset form
    setFormData({ title: "", author: "", year: "" });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook(id);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/books/${id}`);
  };

  return (
    <div>
      <h1>Book Library</h1>

      {/* Add Book Form */}
      <div>
        <h2>Add New Book</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />
          <button type="submit">Add Book</button>
        </form>
      </div>

      {/* Books Table */}
      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: "start",
              }}
            >
              ID
            </th>
            <th
              style={{
                textAlign: "start",
              }}
            >
              Title
            </th>
            <th
              style={{
                textAlign: "start",
              }}
            >
              Author
            </th>
            <th
              style={{
                textAlign: "start",
              }}
            >
              Year
            </th>
            <th
              style={{
                textAlign: "start",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>
                <button onClick={() => handleEdit(book.id)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {books.length === 0 && (
        <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
          No books found. Add your first book above!
        </p>
      )}
    </div>
  );
}
