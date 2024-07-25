import client from "../client";

const getUser = async (id) => {
  try {
    if (!id) return undefined;
    const user = await client.user.findUnique({
      where: { id },
    });
    if (user) {
      return user;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("get user error");
    console.error(error);
    return undefined;
  }
};

export default getUser;
