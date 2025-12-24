import { useState, useEffect, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../context/BookContext";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, updateBook } = useBooks();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
  });

  const [bookNotFound, setBookNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      const book = books.find((b) => b.id === id);
      if (book) {
        setFormData({
          title: book.title,
          author: book.author,
          year: book.year.toString(),
        });
        setBookNotFound(false);
      } else {
        setBookNotFound(true);
      }
    }
  }, [id, books]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.year) {
      alert("Please fill in all fields");
      return;
    }

    if (id) {
      updateBook({
        id,
        title: formData.title,
        author: formData.author,
        year: parseInt(formData.year),
      });
      navigate("/");
    }
  };

  if (bookNotFound) {
    return (
      <div
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1>Book Not Found</h1>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Sorry, the book with ID "{id}" does not exist in our library.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Back to Book List
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Edit Book</h1>

      {/* Book Details Display */}
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Current Book Details</h2>
        <p>
          <strong>ID:</strong> {id}
        </p>
        <p>
          <strong>Title:</strong> {formData.title}
        </p>
        <p>
          <strong>Author:</strong> {formData.author}
        </p>
        <p>
          <strong>Year:</strong> {formData.year}
        </p>
      </div>

      {/* Edit Form */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>Edit Book Information</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Title:
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Author:
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Year:
            </label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                flex: 1,
              }}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                backgroundColor: "#666",
                color: "white",
                border: "none",
                borderRadius: "4px",
                flex: 1,
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
