import client from "../client";

const getAdmin = async (id) => {
  try {
    if (!id) {
      return undefined;
    }
    const admin = await client.admin.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });
    if (admin) {
      return admin;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("--- getAdmin Error ---");
    console.error(error);
    return undefined;
  }
};

export default getAdmin;
