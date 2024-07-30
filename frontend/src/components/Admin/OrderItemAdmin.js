import React, { useState, useRef } from "react";
import { parseISO, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Modal from "../../shared/components/UIElements/Modal";
import { convertStatus } from "../../shared/util/convertStatus";
import "./OrderItemAdmin.css";

const OrderItemAdmin = (props) => {
  const [showFormEditOrder, setShowFromEditOrder] = useState(false);
  const statusRef = useRef();
  const navigate = useNavigate();
  const { sendRequest, isLoading, error, clearError, statusCode, setError } =
    useHttpClient();
  const {
    account_id,
    order_id,
    total_amount,
    status,
    note,
    payment_methods,
    createdAt,
  } = props.item;
  const date = parseISO(createdAt);
  const formattedDate = format(date, "HH:mm:ss dd/MM/yyyy");
  const showFormEditHandler = () => {
    setShowFromEditOrder((prev) => !prev);
  };
  const editProductHandler = async () => {
    try {
      let body = JSON.stringify({
        status: statusRef.current.value.trim(),
      });
      const token = Cookies.get("token");
      const res = await sendRequest(
        `http://localhost:2000/api/v1/admin/orders?id=${order_id}`,
        "PATCH",
        body,
        { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      );
      if (statusCode >= 500) {
        navigate("/error");
        return;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setShowFromEditOrder((prev) => !prev);
    }
  };
  const showInforOrder = () => {
    props.onShowOrder(order_id);
  };
  return (
    <>
      {error && (
        <Modal
          onCancel={clearError}
          message={error}
          error
          title='Có lỗi'
          action={
            <>
              <button className='btn btn-danger' onClick={clearError}>
                Đóng
              </button>{" "}
            </>
          }></Modal>
      )}
      {showFormEditOrder && (
        <Modal
          onCancel={showFormEditHandler}
          title='Cập nhật trạng thái của đơn hàng'
          action={
            <>
              <button className='btn btn-danger' onClick={showFormEditHandler}>
                Đóng
              </button>{" "}
              <button className='btn btn-primary' onClick={editProductHandler}>
                Cập nhật
              </button>
            </>
          }>
          <div className='order_item-admin'>
            <select ref={statusRef}>
              {status === 1 && <option value={0}>Hủy đơn hàng</option>}
              {status === 1 && <option value={2}>Xác nhận đơn hàng</option>}
              {(status === 2 || status === 3) && status !== 0 && (
                <option value={4}>Đơn hàng đang được giao</option>
              )}
              {status >= 4 && status !== 0 && (
                <option value={5}>Đơn hàng đã giao xong</option>
              )}
            </select>
          </div>
        </Modal>
      )}
      <td>{order_id}</td>
      <td>{account_id}</td>
      <td>{(+total_amount).toLocaleString()} đ</td>
      <td>{convertStatus(status)}</td>
      <td>{note}</td>
      <td>{payment_methods}</td>
      <td>{formattedDate}</td>
      <td>
        <button
          onClick={showFormEditHandler}
          className={`btn btn-danger mb-3 ${
            status === 0 || status === 5 ? "disabled" : ""
          }`}>
          Cập nhật trạng thái đơn hàng
        </button>
        <button className='btn btn-primary' onClick={showInforOrder}>
          Xem đơn hàng
        </button>
      </td>
    </>
  );
};

export default OrderItemAdmin;
