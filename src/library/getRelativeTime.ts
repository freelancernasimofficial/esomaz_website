import moment from "moment";

const getRelativeTime = (date: any) => {
  return moment(date).fromNow();
};

export default getRelativeTime;
