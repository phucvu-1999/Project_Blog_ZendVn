import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localVi from "dayjs/locale/vi";
import { DATE_TEMPLATE, DATE_TEMPLATE_FULL } from "../constants";

dayjs.locale(localVi);
dayjs.extend(relativeTime);

export const formatRelativeDate = (date, isFull) => {
  const dateFormattedObj = dayjs(date);
  const dateFormatted = dateFormattedObj.format(
    isFull ? DATE_TEMPLATE_FULL : DATE_TEMPLATE
  );
  const dateRelative = dateFormattedObj.fromNow();

  return { dateFormatted, dateRelative };
};
