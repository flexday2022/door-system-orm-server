import bcrypt from "bcrypt";

export const hashStr = (str) => bcrypt.hashSync(str, 10);

export const compareStr = (str, hashStr) => bcrypt.compareSync(str, hashStr);
