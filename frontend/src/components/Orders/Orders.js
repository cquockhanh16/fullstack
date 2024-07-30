import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { formattedDate } from "../../shared/util/convertTime";
import { convertStatus } from "../../shared/util/convertStatus";
import "./Orders.css";
import { Link } from "react-router-dom";
import Modal from "../../shared/components/UIElements/Modal";
import Spinner from "../../shared/components/UIElements/Spinner";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [showFormCancelOrder, setShowFormCancelOrder] = useState(false);
  const { isLoading, error, setError, sendRequest, statusCode, clearError } =
    useHttpClient();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "http://localhost:2000/api/v1/orders",
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        if (statusCode >= 500) {
          navigate("/error");
          return;
        }
        setOrders(res.orders);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [navigate, sendRequest, token, setError, statusCode]);
  const formCancelOrder = (oid) => {
    setShowFormCancelOrder((prev) => !prev);
    console.log(oid);
    setOrderId(oid);
  };
  const cancelOrderHandler = async () => {
    try {
      const res = await sendRequest(
        `http://localhost:2000/api/v1/order?oid=${orderId}`,
        "PATCH",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (statusCode >= 500) {
        navigate("/error");
        return;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setShowFormCancelOrder((prev) => !prev);
    }
  };
  const payOrderHandler = async (orderId, total) => {
    try {
      const body = JSON.stringify({
        orderIdd: orderId,
        amountt: Math.round(total),
      });
      const res = await sendRequest(
        "http://localhost:2000/api/v1/payment",
        "POST",
        body,
        {
          "Content-Type": "application/json",
        }
      );
      if (statusCode >= 500) {
        navigate("/");
        return;
      }
      console.log(res);
      if (res.data.payUrl) {
        window.location.href = res.data.payUrl;
        return;
      }
    } catch (error) {
      setError(error.message);
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
      {showFormCancelOrder && (
        <Modal
          onCancel={formCancelOrder}
          // width={1000}
          title='Thông báo'
          message='Bạn chắc chắn muốn hủy đơn hàng này ?'
          action={
            <>
              <button className='btn btn-danger' onClick={formCancelOrder}>
                Đóng
              </button>{" "}
              {"    "}
              <button className='btn btn-success' onClick={cancelOrderHandler}>
                Hủy đơn hàng
              </button>
            </>
          }></Modal>
      )}
      <div className='orders'>
        <div className='container'>
          {orders.length !== 0 ? (
            <>
              <div className='row'>
                <h3>Danh sách đơn hàng</h3>
                <div className='col'>
                  <div className='row'>
                    <div className='col-1 cart-page__header'>MÃ</div>
                    <div className='col cart-page__header'>TỔNG TIỀN</div>
                    <div className='col cart-page__header'>TRẠNG THÁI</div>
                    {/* <div className='col-2 cart-page__header'>GHI CHÚ</div> */}
                    <div className='col-3 cart-page__header'>
                      PHƯƠNG THỨC THANH TOÁN
                    </div>
                    <div className='col cart-page__header'>ĐẶT HÀNG LÚC</div>
                    <div className='col-3 cfart-page__header'></div>
                  </div>
                  <hr></hr>
                  <div className='cart-page__item orders_item'>
                    {orders.map((item, index) => {
                      return (
                        <div
                          className='row align-items-center mb-3 w-100'
                          key={index}>
                          <div className='col-1 d-flex align-items-center gap-2'>
                            {item.order_id}
                          </div>
                          <div className='col cart-page__item-price'>
                            {(+item.total_amount).toLocaleString()} đ
                          </div>
                          <div className='col cart-page__item-price'>
                            {convertStatus(item.status)}
                          </div>
                          {/* <div className='col-2 cart-page__item-price'>
                            {item.note}
                          </div> */}
                          <div className='col-3 cart-page__item-price'>
                            {item.payment_methods}
                          </div>
                          <div className='col cart-page__item-price'>
                            {formattedDate(item.createdAt)}
                          </div>
                          <div className='col-3 cart-page__item-price text-center'>
                            <button
                              className={`btn btn-danger ${
                                item.status === 1 ? "" : "disabled"
                              }`}
                              onClick={() => formCancelOrder(item.order_id)}>
                              Hủy
                            </button>
                            <button
                              className={`btn btn-primary mx-3 ${
                                item.status === 1 ? "" : "disabled"
                              }`}
                              onClick={() =>
                                payOrderHandler(
                                  item.order_id,
                                  item.total_amount
                                )
                              }>
                              Thanh toán
                            </button>
                            <Link to={`/order-received/${item.order_id}`}>
                              <button className='btn btn-outline-success'>
                                Chi tiết
                              </button>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h3 className='text-center'>Chưa có đơn hàng</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
