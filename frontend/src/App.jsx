import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CREATE_BOOK, DELETE_BOOK, UPDATE_BOOK } from "./mutations/book";
import { GET_ALL_BOOKS } from "./query/book";
import { observer } from "mobx-react-lite";
import User from "./store/user";
import {
    DELETE_ACCESS_TOKEN,
    DELETE_REFRESH_TOKEN,
    LOGIN_USER,
    REFRESH_TOKEN,
} from "./mutations/user";
import { GET_USER_DATA } from "./query/user";

function App() {
    const { data, loading, error, refetch } = useQuery(GET_ALL_BOOKS);
    const userResp = useQuery(GET_USER_DATA, {
        variables: { token: localStorage.getItem("token") },
    });
    const userData = userResp.data;
    const userLoading = userResp.loading;
    const userRefetch = userResp.refetch;
    const [newBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: GET_ALL_BOOKS }],
    });
    const [delBook] = useMutation(DELETE_BOOK, {
        refetchQueries: [{ query: GET_ALL_BOOKS }],
    });
    const [updBook] = useMutation(UPDATE_BOOK, {
        refetchQueries: [{ query: GET_ALL_BOOKS }],
    });
    const [loginUser] = useMutation(LOGIN_USER);
    const [deleteAccessToken] = useMutation(DELETE_ACCESS_TOKEN);
    const [deleteRefreshToken] = useMutation(DELETE_REFRESH_TOKEN);
    const [refreshToken] = useMutation(REFRESH_TOKEN);

    const [books, setBooks] = useState([]);
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [editName, setEditName] = useState("");
    const [editDate, setEditDate] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!loading) {
            setBooks(data.allBooks);
        }
        if (!userLoading) {
            if (userData?.viewer) {
                User.setUser();
            } else {
                refreshToken();
                userRefetch();
            }
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

    const login = (e) => {
        e.preventDefault();
        loginUser({
            variables: {
                username,
                password,
            },
        }).then(({ data }) => {
            if (data?.tokenAuth?.token) {
                localStorage.setItem("token", data.tokenAuth.token);
                userRefetch();
                User.setUser(userData?.viewer || null);
            }
        });
    };

    const logout = (e) => {
        e.preventDefault();
        deleteAccessToken();
        deleteRefreshToken();
        localStorage.removeItem("token");
        User.setUser(null);
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            {User.getUser()?.username || "not logged in"}
            {!User.getUser() ? (
                <>
                    <h1>Login form</h1>
                    <form>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={(e) => login(e)}>Login</button>
                    </form>
                </>
            ) : (
                <button onClick={(e) => logout(e)}>logout</button>
            )}
            <h2>Add book</h2>
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

export default observer(App);
