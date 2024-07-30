import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Cookies from "js-cookie";
import "./OrderAdmin.css";
import OrderItemAdmin from "./OrderItemAdmin";
import Spinner from "../../shared/components/UIElements/Spinner";
import Modal from "../../shared/components/UIElements/Modal";
import { formattedDate } from "../../shared/util/convertTime";
import { convertStatus } from "../../shared/util/convertStatus";

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [showInforOrder, setShowInforOrder] = useState(false);
  const [order, setOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const { isLoading, sendRequest, error, clearError, statusCode, setError } =
    useHttpClient();
  const token = Cookies.get("token");
  useEffect(() => {
    const token = Cookies.get("token");
    const fetchOrders = async () => {
      try {
        const res = await sendRequest(
          "http://localhost:2000/api/v1/admin/orders",
          "GET",
          null,
          {
            Authorization: `Beare ${token}`,
          }
        );
        if (statusCode >= 500) {
          navigate("/error");
          return;
        }
        setOrders(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchOrders();
  }, [sendRequest, navigate]);
  const getInforOrder = async (orderId) => {
    try {
      const res = await sendRequest(
        `http://localhost:2000/api/v1/admin/order?order_id=${orderId}`,
        "GET",
        null,
        { Authorization: `Bearer ${token}` }
      );
      if (statusCode >= 500) {
        navigate("/error");
        return;
      }
      if (!res.order || !res.orderDetail) {
        navigate("/admin");
        return;
      }
      setOrder(res.order);
      setOrderDetail(res.orderDetail);
    } catch (error) {
      setError(error.message);
    }
  };
  const showHideInforOrder = (order_id) => {
    setShowInforOrder((prev) => !prev);
    if (typeof order_id === "number") {
      setOrderId(order_id);
      getInforOrder(order_id);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
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
      {showInforOrder && (
        <Modal
          onCancel={showHideInforOrder}
          title='Thông tin đơn hàng'
          action={
            <>
              <button className='btn btn-danger' onClick={showHideInforOrder}>
                Đóng
              </button>{" "}
            </>
          }>
          {order && orderDetail && (
            <>
              <div className='detail-payment'>
                <div className='container'>
                  <div className='row'>
                    <div className='col-12 col-md-7'>
                      <h4>Chi tiết đơn hàng</h4>

                      <hr></hr>
                      {order && (
                        <>
                          <div>
                            <span className='detail-order__header'>
                              Giao hàng
                            </span>
                            <span className='cart-page__cnt'>
                              Miễn phí giao hàng
                            </span>
                          </div>
                          <div>
                            <span className='detail-order__header'>
                              Trạng thái đơn hàng
                            </span>
                            <span className='cart-page__cnt'>
                              {convertStatus(order.status)}
                            </span>
                          </div>
                          <div>
                            <span className='detail-order__header'>
                              Tổng cộng
                            </span>
                            <span className='cart-page__cnt'>
                              {(+order.total_amount).toLocaleString()} đ
                            </span>
                          </div>
                          <div>
                            <span className='detail-order__header'>Lưu ý</span>
                            <span className='cart-page__cnt'>{order.note}</span>
                          </div>
                        </>
                      )}
                      <div>
                        <span className='detail-order__header'>Sản phẩm</span>
                        <span className='cart-page__cnt'>Tổng cộng</span>
                      </div>
                      <hr></hr>
                      <div className='mb-3 order-detail__item'>
                        {orderDetail &&
                          orderDetail.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className='detail-order__item d-flex align-items-center'>
                                <span>
                                  <img
                                    style={{ width: "100px" }}
                                    src={
                                      "http://localhost:2000/uploads/" +
                                      item.Product.product_image_url
                                    }
                                    alt=''
                                  />
                                  {item.Product.product_name} x {item.quanity}
                                </span>
                                <span className='detail-order__header'>
                                  {(+item.sub_total).toLocaleString()} đ
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className='col-12 col-md-5'>
                      {order && (
                        <>
                          <div className='order-infor'>
                            <ul>
                              <li>
                                Mã đơn hàng: <span>{order.order_id}</span>
                              </li>
                              <li>
                                Tên người nhận:{" "}
                                <span>
                                  {order.Customer.fisrt_name +
                                    " " +
                                    order.Customer.last_name}
                                </span>
                              </li>
                              <li>
                                Địa chỉ người nhận:{" "}
                                <span>{order.Customer.address}</span>
                              </li>
                              <li>
                                Email: <span>{order.Customer.email}</span>
                              </li>
                              <li>
                                Mã bưu điện: <span>{order.code}</span>
                              </li>
                              <li>
                                Thời gian đặt hàng:{" "}
                                <span>{formattedDate(order.createdAt)}</span>
                              </li>
                              <li>
                                Tổng cộng:{" "}
                                <span>
                                  {(+order.total_amount).toLocaleString()} đ
                                </span>
                              </li>
                              <li>
                                Phương thức thanh toán:{" "}
                                <span>Thanh toán khi nhận hàng</span>
                              </li>
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal>
      )}
      {orders && (
        <>
          <div className='main-container'>
            {orders.length === 0 ? (
              <h3>Không có đơn hàng nào</h3>
            ) : (
              <>
                <h3>Quản lý đơn hàng</h3>
                <table className='tbl_orders'>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Mã khách hàng</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Ghi chú</th>
                    <th>Phương thức thanh toán</th>
                    <th>Thời gian đặt hàng</th>
                    <th>Chức năng</th>
                  </tr>
                  {orders.map((item, index) => {
                    return (
                      <tr key={index}>
                        <OrderItemAdmin
                          item={item}
                          onShowOrder={showHideInforOrder}
                        />
                      </tr>
                    );
                  })}
                </table>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default OrderAdmin;
