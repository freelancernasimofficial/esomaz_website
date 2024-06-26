export default function getNotificationMessage(type: string) {
  if (type === "FOLLOW_BACK") {
    return "Followed you back";
  } else if (type === "FOLLOW") {
    return "Followed you";
  } else if (type === "CONFIRM_FRIEND_REQUEST") {
    return "Accepted your friend request";
  } else if (type === "FRIEND_REQUEST") {
    return "Sent you friend request";
  } else if (type === "NEW_COMMENT_REACTION") {
    return "Reacted on your comment in a";
  } else if (type === "POST_REACTION") {
    return "Reacted on your";
  } else if (type === "NEW_COMMENT_REPLY") {
    return "Replied to your comment in a";
  } else if (type === "POST_COMMENT") {
    return "Commented on your";
  } else if (type === "CONFIRM_FRIEND_REQUEST") {
    return "Accepted your friend request";
  } else if (type === "NEW_REPLY_COMMENT_REPLY") {
    return "added to your reply comment in a";
  } else if (type === "NEW_POST_COMMENT") {
    return "Commented on your";
  } else if (type === "NEW_POST_SHARE") {
    return "Shared your";
  } else {
    return "NOT_FOUND " + type;
  }
}
