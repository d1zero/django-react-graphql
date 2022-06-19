import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CREATE_BOOK, DELETE_BOOK, UPDATE_BOOK } from "./mutations/book";
import { GET_ALL_BOOKS } from "./query/book";

function App() {
    const { data, loading, error, refetch } = useQuery(GET_ALL_BOOKS);
    const [newBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: GET_ALL_BOOKS }],
    });
    const [delBook] = useMutation(DELETE_BOOK, {
        refetchQueries: [{ query: GET_ALL_BOOKS }],
    });
    const [updBook] = useMutation(UPDATE_BOOK, {
        refetchQueries: [{ query: GET_ALL_BOOKS }],
    });

    const [books, setBooks] = useState([]);
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [editName, setEditName] = useState("");
    const [editDate, setEditDate] = useState("");

    useEffect(() => {
        if (!loading) {
            setBooks(data.allBooks);
        }
    }, [data]);

    const getAll = (e) => {
        e.preventDefault();
        console.log(1);
        refetch();
    };

    const addBook = (e) => {
        e.preventDefault();
        newBook({
            variables: {
                title: name,
                authorId: 1,
                dateOfRelease: date,
            },
        })
            .then(({ data }) => {
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteBook = (e, id) => {
        e.preventDefault();
        delBook({
            variables: {
                id,
            },
        })
            .then(({ data }) => {
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const editBook = (e, id) => {
        e.preventDefault();
        updBook({
            variables: {
                id,
                title: editName,
                authorId: 1,
                dateOfRelease: editDate,
            },
        })
            .then(({ data }) => {
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <form>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                />
                <br />
                <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                />
                <br />
                <button onClick={(e) => addBook(e)}>Add books</button>
                <br />
                <button onClick={(e) => getAll(e)}>Get all books</button>
            </form>
            <div>
                {books.map((book) => (
                    <div key={book.id}>
                        <p>{book.id}</p>
                        <p>{book.title}</p>
                        <p>{book.dateOfRelease}</p>
                        <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            type="text"
                        />
                        <br />
                        <input
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                            type="date"
                        />
                        <button onClick={(e) => editBook(e, book.id)}>
                            Edit
                        </button>
                        <button onClick={(e) => deleteBook(e, book.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
