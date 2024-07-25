const userResolver = (resolver) => {
  return (root, args, context, info) => {
    if (!context.user) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "로그인이 필요합니다.",
        };
      }
    }
    return resolver(root, args, context, info);
  };
};

export default userResolver;
