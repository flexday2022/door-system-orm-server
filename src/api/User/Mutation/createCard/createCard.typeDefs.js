import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createCard(card: CreateCardRequest!): t_crd
  }

  input CreateCardRequest {
    CRDTYPUID: Int!
    CRDCSN: String!
  }
`;
