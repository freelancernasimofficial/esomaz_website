const getFullName = (user: any) => {
  return user?.firstName + " " + user?.lastName;
};

export default getFullName;
