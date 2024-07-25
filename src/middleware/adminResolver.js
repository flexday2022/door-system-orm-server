const adminResolver = (resolver) => {
  return (root, args, context, info) => {
    if (!context.admin) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "어드민 로그인이 필요합니다.",
        };
      }
    }
    return resolver(root, args, context, info);
  };
};

export default adminResolver;
