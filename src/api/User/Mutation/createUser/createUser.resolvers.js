import client from "../../../../client";
import { generateUSRIDORD } from "../../../../utils";

export default {
  Mutation: {
    createUser: (_, { user: { USRID, NM, STTDT, EXPDT, USRGRUID } }) =>
      client.t_usr.create({
        data: {
          USRID,
          NM,
          STTDT: new Date(STTDT),
          EXPDT: new Date(EXPDT),
          USRGRUID,
          USRIDORD: generateUSRIDORD({ USRGRUID, USRID }),
        },
      }),
  },
};
