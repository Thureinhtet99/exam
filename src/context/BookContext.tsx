import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

// Book interface
export interface BookType {
  id: string;
  title: string;
  author: string;
  year: number;
}

// Action types
type ActionType =
  | { type: "ADD_BOOK"; payload: BookType }
  | { type: "UPDATE_BOOK"; payload: BookType }
  | { type: "DELETE_BOOK"; payload: string };

// Context type
type BookContextType = {
  books: BookType[];
  addBook: (book: Omit<BookType, "id">) => void;
  updateBook: (book: BookType) => void;
  deleteBook: (id: string) => void;
};

// Initial state
const initialBooks: BookType[] = [
  { id: "1", title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { id: "2", title: "1984", author: "George Orwell", year: 1949 },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
  },
  { id: "4", title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
  },
];

// Reducer function
const bookReducer = (state: BookType[], action: ActionType): BookType[] => {
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.payload];

    case "UPDATE_BOOK":
      return state.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );

    case "DELETE_BOOK":
      return state.filter((book) => book.id !== action.payload);

    default:
      return state;
  }
};

// Create context
const BookContext = createContext<BookContextType | undefined>(undefined);

// Provider component
export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [books, dispatch] = useReducer(bookReducer, initialBooks);

  const addBook = (book: Omit<BookType, "id">) => {
    const newBook: BookType = {
      ...book,
      id: Date.now().toString(), // Generate unique id
    };
    dispatch({ type: "ADD_BOOK", payload: newBook });
  };

  const updateBook = (book: BookType) => {
    dispatch({ type: "UPDATE_BOOK", payload: book });
  };

  const deleteBook = (id: string) => {
    dispatch({ type: "DELETE_BOOK", payload: id });
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};

// Custom hook to use the context
export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};
