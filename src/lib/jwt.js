import { sign, verify } from "jsonwebtoken";

export const generateAccessToken = (id) => sign({ id }, process.env.JWT_SECRET);

export const verifyAccessToken = async (token) => {
  if (!token)
    return {
      ok: false,
      errorName: "TokenExistError",
      errorMessage: "token not exist",
      decode: null,
    };
  const verifyToken = await new Promise((resolve) => {
    verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error)
        resolve({
          ok: false,
          errorName: error.name,
          errorMessage: error.message,
          decode: null,
        });
      resolve({
        ok: true,
        errorName: null,
        errorMessage: null,
        decode,
      });
    });
  });
  return verifyToken;
};
