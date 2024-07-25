import { PrismaClient } from "@prisma/client";
// database에 쉽게 접근할 수 있는 ORM인 prisma 인스턴스
const client = new PrismaClient();

export default client;
