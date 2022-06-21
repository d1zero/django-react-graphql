import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation TokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
            payload
            refreshToken
            refreshExpiresIn
        }
    }
`;

export const DELETE_ACCESS_TOKEN = gql`
    mutation DeleteTokenCookie {
        deleteTokenCookie {
            deleted
        }
    }
`;

export const DELETE_REFRESH_TOKEN = gql`
    mutation DeleteRefreshTokenCookie {
        deleteRefreshTokenCookie {
            deleted
        }
    }
`;

export const REFRESH_TOKEN = gql`
    mutation RefreshToken {
        refreshToken {
            token
            payload
            refreshToken
            refreshExpiresIn
        }
    }
`;
