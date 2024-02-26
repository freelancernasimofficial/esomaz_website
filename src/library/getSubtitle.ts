import getUsername from "./getUsername";

export default function getSubtitle(user: any) {
  if (user?.subtitle) {
    return user.subtitle;
  } else {
    return "@" + getUsername(user);
  }
}
