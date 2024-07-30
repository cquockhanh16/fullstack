import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SupplierAdmin.css";

import Cookies from "js-cookie";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Modal from "../../shared/components/UIElements/Modal";
import Spinner from "../../shared/components/UIElements/Spinner";

const SupplierAdmin = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [sname, setEname] = useState({});
  const [semail, setSemail] = useState("");
  const [sphone, setSphone] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [supplierId, setSupplierId] = useState(null);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const snameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const detailRef = useRef();
  const { sendRequest, isLoading, error, clearError, setError, statusCode } =
    useHttpClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "http://localhost:2000/api/v1/admin/suppliers",
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
        setSuppliers(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [sendRequest, navigate, setError, statusCode, token]);
  const showFormEditHandler = (id) => {
    setShowFormEdit((prev) => !prev);
    const sup = suppliers.find((item) => item.supplier_id === id);
    if (sup) {
      setSupplierId(+id);
      setEname(sup.contact_name);
      setSemail(sup.contact_email);
      setSphone(sup.contact_phone);
    }
  };
  const changeProductNameHandler = (e) => {
    setEname(e.target.value);
  };
  const changeProductEmailHandler = (e) => {
    setSemail(e.target.value);
  };
  const changeProductPhoneHandler = (e) => {
    setSphone(e.target.value);
  };
  const hideSuccessMessage = () => {
    setShowSuccess(null);
  };
  const showFormAddHandler = () => {
    setShowForm((prev) => !prev);
  };
  const addSupplierHandler = async () => {
    try {
      const token = Cookies.get("token");
      let body = JSON.stringify({
        sname: snameRef.current.value.trim(),
        name: nameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        phone: phoneRef.current.value.trim(),
        address: addressRef.current.value.trim(),
        detail: detailRef.current.value.trim(),
      });
      const res = await sendRequest(
        `http://localhost:2000/api/v1/admin/suppliers`,
        "POST",
        body,
        { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      );
      if (statusCode >= 500) {
        navigate("/error");
        return;
      }
      if (statusCode === 200) {
        setShowSuccess(res.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setShowForm((prev) => !prev);
    }
  };
  const editProductHandler = async () => {
    try {
      let body = JSON.stringify({
        name: sname.trim(),
        email: semail.trim(),
        phone: sphone.trim(),
      });
      const res = await sendRequest(
        `http://localhost:2000/api/v1/admin/suppliers?supId=${supplierId}`,
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
          onCancel={showFormAddHandler}
          // width={1000}
          title='Nhập thông tin để thêm hãng sản xuất mới'
          action={
            <>
              <button className='btn btn-danger' onClick={showFormAddHandler}>
                Hủy
              </button>{" "}
              {"    "}
              <button className='btn btn-success' onClick={addSupplierHandler}>
                Thêm hãng mới
              </button>
            </>
          }>
          <div className=' form_add'>
            <div className='form_add-group'>
              <label className='d-block'>Tên hãng sản xuẩt</label>
              <input type='text' ref={snameRef} />
            </div>
            <div className='form_add-group'>
              <label className='d-block'>Tên người đại diện</label>
              <input type='text' ref={nameRef} />
            </div>
            <div className='form_add-group'>
              <label className='d-block'>Email</label>
              <input type='text' ref={emailRef} />
            </div>
            <div className='form_add-group'>
              <label className='d-block'>Số điện thoại</label>
              <input type='text' ref={phoneRef} />
            </div>
            <div className='form_add-group'>
              <label className='d-block'>Địa chỉ</label>
              <input type='text' ref={addressRef} />
            </div>
            <div className='form_add-group'>
              <label className='d-block'>Mô tả</label>
              <textarea
                ref={detailRef}
                cols='100'
                rows='5'
                placeholder='Thông tin về hãng'></textarea>
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
      {showFormEdit && (
        <Modal
          onCancel={showFormEditHandler}
          title='Nhập thông tin để hãng sản xuất'
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
              <label className='d-block'>Tên người đại diện</label>
              <input
                onChange={changeProductNameHandler}
                type='text'
                value={sname}
              />
            </div>
            <div>
              <label className='d-block'>Email</label>
              <input
                onChange={changeProductEmailHandler}
                type='email'
                value={semail}
              />
            </div>
            <div>
              <label className='d-block'>Số điện thoại</label>
              <input
                onChange={changeProductPhoneHandler}
                type='text'
                value={sphone}
              />
            </div>
          </div>
        </Modal>
      )}
      <div className='main-container'>
        {suppliers.length === 0 && suppliers ? (
          <h3>Không có tài khoản</h3>
        ) : (
          <>
            <>
              <h3>Quản lý hãng sản xuất</h3>
              <p className='btn btn-primary' onClick={showFormAddHandler}>
                Thêm hãng sản xuất mới
              </p>
              <table className='tbl_products'>
                <tr>
                  <th>Mã hãng sản xuất</th>
                  <th>Tên hãng</th>
                  <th>Người đại diện</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Chức năng</th>
                </tr>
                {suppliers &&
                  suppliers.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{item.supplier_id}</th>
                        <th>{item.supplier_name}</th>
                        <th>{item.contact_name}</th>
                        <th>{item.contact_email}</th>
                        <th>{item.contact_phone}</th>
                        <th>
                          <button
                            onClick={() =>
                              showFormEditHandler(item.supplier_id)
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

export default SupplierAdmin;
