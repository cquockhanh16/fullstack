import { parseISO, format } from "date-fns";

export const convertToDate = (dateString) => {
  const parts = dateString.split("/");
  return new Date(
    parseInt(parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10)
  );
};

export const formattedDate = (time) => {
  const date = parseISO(time);
  const formattedDate = format(date, "HH:mm:ss dd/MM/yyyy");
  return formattedDate;
};
