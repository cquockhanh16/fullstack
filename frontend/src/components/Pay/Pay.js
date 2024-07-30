import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import "./Pay.css";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Spinner from "../../shared/components/UIElements/Spinner";
import Modal from "../../shared/components/UIElements/Modal";

const Pay = (props) => {
  const [countryData, setCountryData] = useState([]);
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);

  const companynameRef = useRef(null);
  const countryRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);

  const codeRef = useRef(null);
  const phonenumberRef = useRef(null);
  const emailRef = useRef(null);
  const noteRef = useRef(null);
  const paymentMethodsRef = useRef(null);

  const navigate = useNavigate();
  const { sendRequest, error, isLoading, setError, clearError, statusCode } =
    useHttpClient();
  const products = props.products;
  const uid = props.uid;
  const isLogin = props.isLogin;
  const token = Cookies.get("token");
  const totalPrice =
    products.reduce((total, p) => {
      return total + p.count * p.product_price;
    }, 0) || 0;
  useEffect(() => {
    const fetchCountryDate = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (statusCode >= 500) {
          navigate("/error");
          return;
        }
        const data = await res.json();
        setCountryData(data);
      } catch (error) {
        setCountryData([]);
      }
    };
    if (products.length === 0) {
      navigate("/");
    }
    fetchCountryDate();
  }, [navigate]);
  const orderProductHandler = async () => {
    console.log(uid, token, isLogin);
    if (!uid || !token || !isLogin) {
      navigate("/dang-nhap");
      return;
    } else {
      try {
        const fname = firstnameRef.current.value.trim();
        const lname = lastnameRef.current.value.trim();
        const company_name = companynameRef.current.value.trim();
        const country = countryRef.current.value.trim();
        const address = addressRef.current.value.trim();
        const city = cityRef.current.value.trim();
        const code = codeRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const phone_number = phonenumberRef.current.value.trim();
        if (
          fname === "" ||
          lname === "" ||
          company_name === "" ||
          country === "" ||
          address === "" ||
          city === "" ||
          code === "" ||
          email === "" ||
          phone_number === ""
        ) {
          setError("Các thông tin của đơn hàng không được để trống !!");
          return;
        }
        const body = JSON.stringify({
          first_name: firstnameRef.current.value.trim(),
          last_name: lastnameRef.current.value.trim(),
          company_name: companynameRef.current.value.trim(),
          country: countryRef.current.value.trim(),
          address: addressRef.current.value.trim(),
          city: cityRef.current.value.trim(),
          code: codeRef.current.value.trim(),
          email: emailRef.current.value.trim(),
          phone_number: phonenumberRef.current.value.trim(),
          account_id: uid,
          products: products,
          note: noteRef.current.value.trim(),
          status: 1,
          payment_methods: paymentMethodsRef.current.value.trim(),
          total_amount: totalPrice,
        });
        console.log(body);
        const res = await sendRequest(
          "http://localhost:2000/api/v1/order",
          "POST",
          body,
          {
            "Content-Type": "application/json", // Set appropriate headers
            Authorization: `Bearer ${token}`,
          }
        );
        if (+statusCode >= 500) {
          navigate("/error");
          return;
        }
        // if (statusCode == 201) {
        //   console.log("Đặt hàng thành công");
        // }
        props.orderProducts();
        navigate(`/don-hang`);
        return;
      } catch (error) {
        setError(error.message);
      }
    }
  };
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      {error && (
        <Modal
          onCancel={clearError}
          message={error}
          title='Thông báo lỗi'
          action={
            <button className='btn btn-primary' onClick={clearError}>
              Đóng
            </button>
          }
        />
      )}
      <div className='pay'>
        <div className='container'>
          <div className='row gap-1'>
            <div className='col-md-7 col-12'>
              <hr></hr>
              <h4>THÔNG TIN THANH TOÁN</h4>
              <form>
                <div className='row'>
                  <div className='col-6 gap-2'>
                    <label className='d-block'>Họ</label>
                    <input ref={firstnameRef} type='text' required />
                  </div>
                  <div className='col-6 gap-2'>
                    <label className='d-block'>Tên</label>
                    <input ref={lastnameRef} type='text' required />
                  </div>
                </div>

                <br />
                <div>
                  <label className='d-block'>Tên công ty</label>
                  <input ref={companynameRef} type='text' />
                </div>

                <br />
                <div>
                  <label className='d-block'>Quốc gia</label>
                  <select ref={countryRef}>
                    <option>Chọn quốc gia</option>
                    {/* {countryData.map((item, index) => {
                      return (
                        <option key={index} value={item.name.common}>
                          {item.name.common}
                        </option>
                      );
                    })} */}
                    <option value={"Việt Nam"}>Việt Nam</option>
                  </select>
                </div>

                <br />
                <div>
                  <label className='d-block'>Địa chỉ</label>
                  <input ref={addressRef} type='text' />
                </div>

                <br />
                <div>
                  <label className='d-block'>Tỉnh / Thành phố</label>
                  <input ref={cityRef} type='text' />
                </div>

                <br />
                <div>
                  <label className='d-block'>Mã bưu điện</label>
                  <input ref={codeRef} type='text' />
                </div>
                <br />
                <div className='row'>
                  <div className='col-6 gap-2'>
                    <label className='d-block'>Số điện thoại</label>
                    <input ref={phonenumberRef} type='text' required />
                  </div>
                  <div className='col-6 gap-2'>
                    <label className='d-block'>Email</label>
                    <input ref={emailRef} type='text' required />
                  </div>
                </div>
                <br />
                <div>
                  <label className='d-block'>Phương thức thanh toán</label>
                  <select ref={paymentMethodsRef}>
                    <option value={"Thanh toán sau khi nhận hàng"}>
                      Thanh toán sau khi nhận hàng
                    </option>
                    <option value={"Thanh toán bằng thẻ"}>
                      Thanh toán bằng thẻ
                    </option>
                  </select>
                </div>
                <br></br>
                <div>
                  <label className='d-block'>Ghi chú đơn hàng</label>
                  <textarea
                    ref={noteRef}
                    cols='100'
                    rows='5'
                    placeholder='Ghi chú về đơn hàng, ví dụ thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn'></textarea>
                </div>
              </form>
            </div>
            <div className='col-md-4 col-12'>
              <div className='detail-order'>
                <h4>ĐƠN HÀNG CỦA BẠN</h4>
                <div>
                  <span className='detail-order__header'>Sản phẩm</span>
                  <span className='cart-page__cnt'>Tổng cộng</span>
                </div>
                <hr></hr>
                <div>
                  {products.map((item, index) => {
                    return (
                      <div key={index} className='detail-order__item'>
                        <span>
                          {item.product_name} x{" "}
                          <span className='fw-bold'> {item.count}</span>
                        </span>
                        <span className='detail-order__header'>
                          {(item.product_price * item.count).toLocaleString()} đ
                        </span>
                      </div>
                    );
                  })}
                </div>
                <hr />
                <div>
                  <span className='detail-order__header'>Giao hàng</span>
                  <span className='cart-page__cnt'>Miễn phí giao hàng</span>
                </div>
                <div>
                  <span className='detail-order__header'>Tổng cộng</span>
                  <span className='cart-page__cnt'>
                    {totalPrice.toLocaleString()} đ
                  </span>
                </div>
                <hr></hr>
                <div>
                  <p className='detail-order__header'>Kiểm tra thanh toán</p>
                  <span>
                    Vui lòng gửi chi phiếu của bạn đến Tên cửa hàng, Đường của
                    cửa hàng, Thị trấn của cửa hàng, Bang / Hạt của cửa hàng, Mã
                    bưu điện cửa hàng.
                  </span>
                </div>
                <br />
                {/* <Link to='/thanh-toan/order-received'> */}
                <button
                  className='btn btn-lg btn-primary'
                  onClick={orderProductHandler}>
                  ĐẶT HÀNG
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
  uid: state.uid,
  isLogin: state.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
  orderProducts: () => dispatch({ type: "ORDER_PRODUCTS", payload: [] }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
