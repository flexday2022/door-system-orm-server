import client from "../../../../client";
import { generateKeyNumber, generateUSRIDORD } from "../../../../utils";

export default {
  Mutation: {
    createBulkUsers: async (_, { startDate, count, secret }) => {
      // 시작일 기준
      let baseTime = new Date(startDate);
      baseTime = new Date(baseTime.getTime() - 9 * 60 * 60 * 1000);
      // cli progress 용도
      let success = 0;
      // uid auto increament
      const latestUser = await client.t_usr.findFirst({
        select: { USRUID: true },
        orderBy: { USRUID: "desc" },
      });
      // uid auto increament
      const latestCard = await client.t_crd.findFirst({
        select: { CRDUID: true },
        orderBy: { CRDUID: "desc" },
      });

      // 1 loop 당 1000개씩 createMany로 데이터 덤핑할 것
      for (let loop = 0; loop < Math.ceil(count / 1000); loop++) {
        const users = [];
        const cards = [];
        const usrcrds = [];
        for (let i = 0; i < 1000; i++) {
          const startDateTime =
            baseTime.getTime() + 60000 * i + 60000000 * loop;
          const endDateTime =
            baseTime.getTime() + 60000 * (1 + i) + 60000000 * loop;
          const key = generateKeyNumber(startDateTime, secret);
          const user = {
            USRID: key,
            NM: key,
            STTDT: new Date(startDateTime + 9 * 60 * 60 * 1000),
            EXPDT: new Date(endDateTime + 9 * 60 * 60 * 1000),
            USRGRUID: 1,
            USRIDORD: generateUSRIDORD({ USRGRUID: 1, USRID: key }),
          };
          const card = {
            CRDCSN: key,
            CRDTYPUID: 0,
          };
          users.push(user);
          cards.push(card);
          success += 1;
          console.log(success);
          // await client.$transaction(async (db) => {
          //   const startDateTime = baseTime.getTime() + 60000 * i;
          //   const endDateTime = baseTime.getTime() + 60000 * (i + 1);
          //   const key = generateKeyNumber(new Date(endDateTime), "2dunjdswe5");
          //   console.log(key);
          //   const user = await db.t_usr.create({
          //     data: {
          //       USRID: key,
          //       NM: key,
          //       STTDT: new Date(startDateTime),
          //       EXPDT: new Date(endDateTime),
          //       USRGRUID: 1,
          //       USRIDORD: generateUSRIDORD({ USRGRUID: 1, USRID: key }),
          //     },
          //     select: {
          //       USRUID: true,
          //     },
          //   });
          //   const card = await db.t_crd.create({
          //     data: {
          //       CRDCSN: key,
          //       CRDTYPUID: 0,
          //     },
          //     select: {
          //       CRDUID: true,
          //     },
          //   });
          //   await db.t_usrcrd.create({
          //     data: {
          //       IDX: 0,
          //       ISSDCNT: 1,
          //       ISSDDT: new Date(),
          //       t_usr: { connect: { USRUID: user.USRUID } },
          //       t_crd: { connect: { CRDUID: card.CRDUID } },
          //     },
          //   });
          //   success += 1;
          //   console.log(success);
          // });
        }
        await client
          .$transaction(async (db) => {
            await db.t_usr.createMany({
              data: users,
            });
            await db.t_crd.createMany({
              data: cards,
            });
          })
          .catch(() => {
            throw new Error("트렌잭션 터짐");
          });

        for (let p = 0; p < 1000; p++) {
          const usrcrd = {
            IDX: 0,
            ISSDCNT: 1,
            ISSDDT: new Date(),
            USRUID: latestUser.USRUID + 1 + p + loop * 1000,
            CRDUID: latestCard.CRDUID + 1 + p + loop * 1000,
          };
          usrcrds.push(usrcrd);
        }
        await client.t_usrcrd.createMany({ data: usrcrds });

        console.log(
          loop + 1 + " 회차 종료 : " + (loop + 1) * 1000 + "개 데이터 삽입 완료"
        );
      }
      console.log(baseTime);
      return { count: success };
    },
  },
};
