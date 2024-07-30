import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountAdmin.css";

import Cookies from "js-cookie";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Modal from "../../shared/components/UIElements/Modal";
import Spinner from "../../shared/components/UIElements/Spinner";
import { formattedDate } from "../../shared/util/convertTime";

const AccountAdmin = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { sendRequest, isLoading, error, clearError, setError, statusCode } =
    useHttpClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "http://localhost:2000/api/v1/admin/accounts",
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
        setAccounts(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [sendRequest, navigate, setError, statusCode, token]);
  const showFormLock = (accountId) => {
    setShowForm((prev) => !prev);
    setAccountId(+accountId);
  };

  const lockAccountHandler = async () => {
    try {
      const token = Cookies.get("token");
      const res = await sendRequest(
        `http://localhost:2000/api/v1/admin/accounts?accId=${accountId}`,
        "PATCH",
        null,
        { Authorization: `Bearer ${token}` }
      );
      if (statusCode >= 500) {
        navigate("/error");
        return;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setShowForm((prev) => !prev);
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
      {showForm && (
        <Modal
          onCancel={showFormLock}
          title='Bạn chắc chắn muốn khóa tài khoản này không'
          action={
            <>
              <button className='btn btn-danger' onClick={showFormLock}>
                Đóng
              </button>{" "}
              <button className='btn btn-primary' onClick={lockAccountHandler}>
                Khóa tài khoản
              </button>
            </>
          }></Modal>
      )}
      <div className='main-container'>
        {accounts.length === 0 && accounts ? (
          <h3>Không có tài khoản</h3>
        ) : (
          <>
            <>
              <h3>Quản lý tài khoản</h3>
              <table className='tbl_products'>
                <tr>
                  <th>Mã tài khoản</th>
                  <th>Tên tài khoản</th>
                  <th>Ảnh</th>
                  <th>Tạo lúc</th>
                  <th>Chức năng</th>
                </tr>
                {accounts &&
                  accounts.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{item.account_id}</th>
                        <th>{item.username}</th>
                        <th>
                          <img
                            style={{ width: 100 }}
                            src={`${
                              item.account_image
                                ? "http://localhost:2000/uploads/" +
                                  item.account_image
                                : "https://freesvg.org/img/abstract-user-flat-4.png"
                            }`}
                            alt='Đăng nhập'
                          />
                        </th>
                        <th>{formattedDate(item.createdAt)}</th>
                        <th>
                          <button
                            onClick={() => showFormLock(item.account_id)}
                            className={`btn btn-primary ${
                              item.is_lock ? "disabled" : ""
                            }`}>
                            Khóa tài khoản
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

export default AccountAdmin;
