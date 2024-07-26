import client from "../../../../client";

export default {
  Mutation: {
    createUserCard: (
      _,
      { request: { IDX, ISSDDT, ISSDCNT }, userId, cardId }
    ) =>
      client.t_usrcrd.create({
        data: {
          IDX,
          ISSDDT: new Date(ISSDDT),
          ISSDCNT,
          t_usr: {
            connect: {
              USRUID: userId,
            },
          },
          t_crd: {
            connect: {
              CRDUID: cardId,
            },
          },
        },
      }),
  },
};
