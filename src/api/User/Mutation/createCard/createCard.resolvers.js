import client from "../../../../client";

export default {
  Mutation: {
    createCard: (_, { card: { CRDTYPUID, CRDCSN } }) =>
      client.t_crd.create({ data: { CRDTYPUID, CRDCSN } }),
  },
};
