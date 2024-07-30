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

export const convertStatus = (status) => {
  let str = "";
  if (+status === 0) {
    str = "Dơn hàng đã bị hủy";
  } else if (+status === 1) {
    str = "Đơn hàng đang được xác nhận";
  } else if (+status === 2) {
    str = "Đơn hàng đã được xác nhận";
  } else if (+status === 3) {
    str = "Đơn hàng đã được thanh toán";
  } else if (+status === 4) {
    str = "Đơn hàng đang trên đường giao đến bạn";
  } else {
    str = "Đơn hàng đã giao xong";
  }
  return str;
};
