import { AuthenticationError } from "apollo-server";
import { verifyAccessToken } from "../lib/jwt";
import getUser from "./getUser";
import getAdmin from "./getAdmin";

const authErrors = [
  // "TokenExpiredError",
  // "JsonWebTokenError",
  // "NotBeforeError",
  // "TokenExistError",
];

const isAuth = async ({ ctx }) => {
  const { authorization } = ctx.req.headers;
  if (!authorization) return { user: undefined };

  const token = authorization.substring(7);

  const { ok, decode, errorName } = await verifyAccessToken(token);
  if (ok) {
    if (decode?.admin) {
      return {
        admin: await getAdmin(decode.id),
      };
    }
    return {
      user: await getUser(decode.id),
    };
  } else {
    if (authErrors.includes(errorName)) {
      throw new AuthenticationError(errorName);
    } else {
      return {
        user: undefined,
      };
    }
  }
};

export default isAuth;
