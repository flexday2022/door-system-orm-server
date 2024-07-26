import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createBulkUsers(
      startDate: DateTime!
      count: Int!
      secret: String!
    ): CountResponse!
  }
`;
