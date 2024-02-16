const getUsername = (user: any) => {
  return user?.username ?? user?.uuId;
};

export default getUsername;
