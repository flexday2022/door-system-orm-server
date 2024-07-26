import { gql } from "apollo-server";
import { DateTimeTypeDefinition } from "graphql-scalars";

export default gql`
  ${DateTimeTypeDefinition}
  scalar Upload
`;
