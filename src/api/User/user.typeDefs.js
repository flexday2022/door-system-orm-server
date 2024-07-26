import { gql } from "apollo-server";

export default gql`
  type t_usr {
    USRUID: Int!
    USRID: String
  }

  type t_crd {
    CRDUID: Int!
  }

  type t_usrcrd {
    USRUID: Int
    CRDUID: Int!
    IDX: Int!
  }
`;
