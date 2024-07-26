// import crypto from "crypto-js";
const crypto = require("crypto-js");
const padding = (number, length) => {
  let str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
};
Date.prototype.yyyyMMddHHmm = function () {
  const yyyy = this.getFullYear().toString();
  const MM = padding(this.getMonth() + 1, 2);
  const dd = padding(this.getDate(), 2);
  const HH = padding(this.getHours(), 2);
  const mm = padding(this.getMinutes(), 2);
  return yyyy + MM + dd + HH + mm;
};

export const generateKeyNumber = (baseTime = 1721869620000, secretKey = "") => {
  if (!Boolean(secretKey)) {
    throw new Error("secret key required");
  }
  // 기준일은 2024-07-10 00시 00분 00초 한국 표준시
  // const baseTime = new Date("2024-07-25 10:07:00 GMT+0900");
  const baseDate = new Date(baseTime);
  const dateTimeString = baseDate.yyyyMMddHHmm() + secretKey;
  const hash = crypto.SHA256(dateTimeString).toString(crypto.enc.Hex);
  const hashInt = BigInt("0x" + hash);
  const modulus = BigInt("999999999999999");
  const uniqueKey = hashInt % modulus;
  return Number(uniqueKey).toString();
};

export const generateUSRIDORD = ({ USRGRUID = 0, USRID = "" }) => {
  if (!Boolean(USRID)) {
    throw new Error("USRID required");
  }

  let brackets = "";
  const baseLength = 33;
  const userDataLength = ("" + USRGRUID + USRID).length;
  const bracketCount = baseLength - userDataLength;
  for (let i = 0; i < bracketCount; i++) {
    brackets += "(";
  }
  return USRGRUID + brackets + USRID;
};
