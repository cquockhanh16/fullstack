import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryAdmin.css";

import Cookies from "js-cookie";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Modal from "../../shared/components/UIElements/Modal";
import Spinner from "../../shared/components/UIElements/Spinner";
import { formattedDate } from "../../shared/util/convertTime";

const CategoryAdmin = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [cates, setCates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const cname = useRef();
  const cdes = useRef();
  const { sendRequest, isLoading, error, clearError, setError, statusCode } =
    useHttpClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "http://localhost:2000/api/v1/admin/categories",
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
        setCates(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [sendRequest, navigate, setError, statusCode, token]);
  const showFormAddHandler = () => {
    setShowForm((prev) => !prev);
  };
  const addCategoryHandler = async () => {
    try {
      const token = Cookies.get("token");
      const cn = cname.current.value.trim();
      const cd = cdes.current.value.trim();
      if (cn === "" || cd === "") {
        setError("Các trường dữ liệu không được để trống!!");
      }
      const formData = JSON.stringify({
        cname: cn,
        cdes: cd,
      });
      const res = await sendRequest(
        `http://localhost:2000/api/v1/admin/categories`,
        "POST",
        formData,
        { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
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
          onCancel={showFormAddHandler}
          // width={1000}
          title='Nhập thông tin để danh mục mới'
          action={
            <>
              <button className='btn btn-danger' onClick={showFormAddHandler}>
                Hủy
              </button>{" "}
              {"    "}
              <button className='btn btn-success' onClick={addCategoryHandler}>
                Thêm danh mục
              </button>
            </>
          }>
          <div className='d-flex form_add gap-4'>
            <div>
              <div className='form_add-group'>
                <label className='d-block'>Tên danh mục</label>
                <input
                  type='text'
                  ref={cname}
                  placeholder='Điện thoại, laptop...'
                />
              </div>
              <div className='form_add-group'>
                <label className='d-block'>Mô tả</label>
                <textarea
                  rows={4}
                  cols={35}
                  ref={cdes}
                  placeholder='Mô tả về danh mục cần thêm'
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className='main-container'>
        {cates.length === 0 && cates ? (
          <h3>Không có danh mục nào</h3>
        ) : (
          <>
            <>
              <h3>Quản lý danh mục</h3>
              <button
                className='btn btn-primary mb-4'
                onClick={showFormAddHandler}>
                Thêm danh mục mới
              </button>
              <table className='tbl_products'>
                <tr>
                  <th>Mã danh mục</th>
                  <th>Tên danh mục</th>
                  <th>Mô tả</th>
                  <th>Tạo lúc</th>
                  <th>Sửa lúc</th>
                  <th>Chức năng</th>
                </tr>
                {cates &&
                  cates.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{item.categories_id}</th>
                        <th>{item.categories_name}</th>
                        <th>{item.categories_description}</th>
                        <th>{formattedDate(item.createdAt)}</th>
                        <th>{formattedDate(item.updatedAt)}</th>
                        <th>
                          <button
                            className='btn btn-info mb-2'
                            // onClick={showFormEditHandler}
                          >
                            Sửa
                          </button>{" "}
                          <button
                            className='btn btn-danger'
                            disabled
                            // onClick={deleteProductHandler}
                          >
                            Xóa
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

export default CategoryAdmin;
