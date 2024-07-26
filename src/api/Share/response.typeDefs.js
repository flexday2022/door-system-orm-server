import { gql } from "apollo-server";

export default gql`
  type CountResponse {
    count: Int!
  }
`;
