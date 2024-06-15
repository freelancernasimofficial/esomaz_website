export default function getSubtitle(user: any) {
  if (user?.subtitle) {
    return user.subtitle;
  } else if (user?.username) {
    return "@" + user?.username;
  } else {
    return "@" + user?.uuId;
  }
}
