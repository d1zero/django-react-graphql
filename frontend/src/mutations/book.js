import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
    mutation CreateBook(
        $title: String!
        $authorId: ID!
        $dateOfRelease: Date!
    ) {
        createBook(
            title: $title
            authorId: $authorId
            dateOfRelease: $dateOfRelease
        ) {
            book {
                id
                title
                dateOfRelease
            }
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation DeleteBook($id: ID!) {
        deleteBook(id: $id) {
            book {
                title
            }
        }
    }
`;

export const UPDATE_BOOK = gql`
    mutation UpdateBook(
        $id: ID!
        $title: String!
        $authorId: ID!
        $dateOfRelease: Date!
    ) {
        updateBook(
            id: $id
            title: $title
            authorId: $authorId
            dateOfRelease: $dateOfRelease
        ) {
            book {
                title
            }
        }
    }
`;
