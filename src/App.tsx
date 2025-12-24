import { Routes, Route } from "react-router-dom";
import { BookProvider } from "./context/BookContext";
import BookList from "./pages/book-list";
import BookDetail from "./pages/book-detail";
import AuthorListExample from "./pages/example-component";

function App() {
  return (
    <BookProvider>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/authors" element={<AuthorListExample />} />
      </Routes>
    </BookProvider>
  );
}

export default App;
