import { useApi } from "../hooks/use-api";

type AuthorType = {
  id: string;
  name: string;
  surname: string;
};

export default function AuthorListExample() {
  const { data, loading, error, refetch } = useApi<AuthorType[]>(
    "https://my-json-server.typicode.com/dmitrijt9/book-api-mock/authors"
  );

  if (loading) {
    return <div>Loading authors...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Authors</h1>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {data?.map((book) => (
          <li key={book.id}>
            {book.name} {book.surname}
          </li>
        ))}
      </ul>
    </div>
  );
}
