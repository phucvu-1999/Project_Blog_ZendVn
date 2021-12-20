import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localVi from "dayjs/locale/vi";
import { DATE_TEMPLATE } from "../constants";

dayjs.locale(localVi);
dayjs.extend(relativeTime);

export const formatRelativeDate = (date) => {
  const dateFormattedObj = dayjs(date);
  const dateFormatted = dateFormattedObj.format(DATE_TEMPLATE);
  const dateRelative = dateFormattedObj.fromNow();

  return { dateFormatted, dateRelative };
};
