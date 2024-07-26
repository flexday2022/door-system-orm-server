import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createUser(user: CreateUserRequest!): t_usr
  }

  input CreateUserRequest {
    USRID: String!
    NM: String!
    STTDT: DateTime!
    EXPDT: DateTime!
    USRGRUID: Int!
  }
`;
