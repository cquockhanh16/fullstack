import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { formattedDate } from "../../shared/util/convertTime";
import { convertStatus } from "../../shared/util/convertStatus";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Spinner from "../../shared/components/UIElements/Spinner";
import Modal from "../../shared/components/UIElements/Modal";
import "./DetailPayment.css";

const DetailPayment = (props) => {
  const { order_id } = useParams();
  const [order, setOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const navigate = useNavigate();
  const { sendRequest, isLoading, error, clearError, setError, statusCode } =
    useHttpClient();
  useEffect(() => {
    const token = Cookies.get("token") ? Cookies.get("token") : undefined;
    const isLogin = Cookies.get("isLogin") ? Cookies.get("isLogin") : undefined;
    if (!token || !isLogin) {
      navigate("/");
    }
    const getOrder = async () => {
      try {
        const res = await sendRequest(
          `http://localhost:2000/api/v1/get-order/${order_id}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        if (statusCode >= 500) {
          navigate("/error");
          return;
        }
        if (!res) {
          navigate("/");
          return;
        }
        setOrder(res.order);
        setOrderDetail(res.orderDetail);
      } catch (error) {
        setError(error.message);
      }
    };
    getOrder();
  }, [order_id, sendRequest]);
  if (isLoading) {
    return <Spinner></Spinner>;
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
                        <span className='detail-order__header'>Giao hàng</span>
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
                        <span className='detail-order__header'>Tổng cộng</span>
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
    </>
  );
};
const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, null)(DetailPayment);
