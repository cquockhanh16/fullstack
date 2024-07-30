import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PromotionAdmin.css";
import Cookies from "js-cookie";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Modal from "../../shared/components/UIElements/Modal";
import Spinner from "../../shared/components/UIElements/Spinner";
import { formattedDate } from "../../shared/util/convertTime";
const PromotionAdmin = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(null);
  const [promotionId, setPromotionId] = useState(null);
  const [pvalue, setPValue] = useState();
  const { sendRequest, isLoading, error, clearError, setError, statusCode } =
    useHttpClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "http://localhost:2000/api/v1/admin/promotions",
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
        setPromotions(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [sendRequest, navigate, setError, statusCode, token]);
  const changeValueHandler = (e) => {
    setPValue(e.target.value);
  };
  const showFormAddHandler = () => {};
  const showFormEditHandler = (id) => {
    setPromotionId(+id);
    const p = promotions.find((item) => item.promotion_id === id);
    if (p) {
      setPValue(p.discount_value);
    }
    setShowFormEdit((prev) => !prev);
  };
  const editProductHandler = async () => {
    try {
      let body = JSON.stringify({
        value: pvalue.trim(),
      });
      const res = await sendRequest(
        `http://localhost:2000/api/v1/admin/promotions?proId=${promotionId}`,
        "PATCH",
        body,
        { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      );
      if (statusCode >= 500) {
        navigate("/error");
        return;
      }
      console.log(typeof statusCode, statusCode);
      if (statusCode === 200) {
        setShowSuccess(res.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setShowFormEdit((prev) => !prev);
    }
  };
  const hideSuccessMessage = () => {
    setShowSuccess(null);
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
      {showFormEdit && (
        <Modal
          onCancel={showFormEditHandler}
          title='Nhập thông tin để cập nhật mã giảm giá'
          action={
            <>
              <button className='btn btn-danger' onClick={showFormEditHandler}>
                Đóng
              </button>{" "}
              {"    "}
              <button className='btn btn-primary' onClick={editProductHandler}>
                Cập nhật
              </button>
            </>
          }>
          <div className='form-edit'>
            <div>
              <label className='d-block'>Phần trăm</label>
              <input
                onChange={changeValueHandler}
                type='number'
                value={pvalue}
              />
            </div>
          </div>
        </Modal>
      )}
      {showSuccess && (
        <Modal
          onCancel={hideSuccessMessage}
          message={showSuccess}
          title='Thông báo'
          action={
            <>
              <button className='btn btn-primary' onClick={hideSuccessMessage}>
                OK
              </button>{" "}
            </>
          }></Modal>
      )}
      <div className='main-container'>
        {promotions.length === 0 && promotions ? (
          <h3>Không có mã giảm giá</h3>
        ) : (
          <>
            <>
              <h3>Quản lý mã giảm giá</h3>
              <p className='btn btn-primary' onClick={showFormAddHandler}>
                Thêm mã giảm giá mới
              </p>
              <table className='tbl_products'>
                <tr>
                  <th>Mã giảm giá</th>
                  <th>Thời gian bắt đầu</th>
                  <th>Thời gian kết thúc</th>
                  <th>Giảm giá</th>
                  <th>Chức năng</th>
                </tr>
                {promotions &&
                  promotions.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{item.promotion_id}</th>
                        <th>{formattedDate(item.start_date)}</th>
                        <th>{formattedDate(item.end_date)}</th>
                        <th>{item.discount_value}</th>
                        <th>
                          <button
                            onClick={() =>
                              showFormEditHandler(item.promotion_id)
                            }
                            className={`btn btn-primary ${
                              item.is_lock ? "disabled" : ""
                            }`}>
                            Sửa thông tin
                          </button>
                        </th>
                      </tr>
                    );
                  })}
              </table>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default PromotionAdmin;
