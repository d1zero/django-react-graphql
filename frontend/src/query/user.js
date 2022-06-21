
  import { gql } from "@apollo/client";

export const GET_USER_DATA = gql`
query Me($token: String!) {
    viewer(token: $token) {
      id
      username
    }
  }
`;
