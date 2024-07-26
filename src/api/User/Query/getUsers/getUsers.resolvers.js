import client from "../../../../client";

export default {
  Query: {
    getUsers: () =>
      client.t_usr.findMany({
        orderBy: { USRUID: "asc" },
        take: 10,
      }),
  },
};
