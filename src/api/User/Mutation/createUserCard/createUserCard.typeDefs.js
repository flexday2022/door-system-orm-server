import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createUserCard(
      request: CreateUserCardRequest!
      userId: Int!
      cardId: Int!
    ): t_usrcrd
  }

  input CreateUserCardRequest {
    IDX: Int!
    ISSDDT: DateTime!
    ISSDCNT: Int!
  }
`;
