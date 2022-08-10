import moment from "moment";

export const formatDate = (date, format = "LLLL") => {
  return moment(date).format(format);
};
