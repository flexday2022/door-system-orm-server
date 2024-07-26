import { gql } from "apollo-server";

export default gql`
  type Query {
    getUsers: [t_usr]
  }
`;
