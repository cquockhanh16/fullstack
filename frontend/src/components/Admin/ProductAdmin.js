import React, { useEffect, useState, useRef } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./ProductAdmin.css";

import ProductItemAdmin from "./ProductItemAdmin";
import Spinner from "../../shared/components/UIElements/Spinner";
import Modal from "../../shared/components/UIElements/Modal";

const ProductAdmin = (props) => {
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectCate, setSelectCate] = useState(1);
  const navigate = useNavigate();
  const pnameRef = useRef();
  const pcateRef = useRef();
  const psupRef = useRef();
  const ppromRef = useRef();
  const pfileRef = useRef();
  const ppriceRef = useRef();
  const pquantityRef = useRef();
  const pisnewRef = useRef();
  const posRef = useRef();
  const pscreenRef = useRef();
  const pchipRef = useRef();
  const promRef = useRef();
  const pramRef = useRef();
  const pcameraRef = useRef();
  const ppinRef = useRef();
  const pconnectRef = useRef();
  const paccoryRef = useRef();
  const pcardRef = useRef();
  const pcardRamRef = useRef();
  const psizeRef = useRef();
  const pweightRef = useRef();
  const pskuRef = useRef();
  const { isLoading, sendRequest, error, clearError, setError, statusCode } =
    useHttpClient();
  useEffect(() => {
    const token = Cookies.get("token");
    const fetchProducts = async () => {
      try {
        const res = await sendRequest(
          "http://localhost:2000/api/v1/admin/products",
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
        setProducts(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    const fetchPromotions = async () => {
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
    const fetchSuppliers = async () => {
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
    const fetchCategories = async () => {
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
        setCategories(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProducts();
    fetchPromotions();
    fetchSuppliers();
    fetchCategories();
  }, [sendRequest, navigate]);
  const showFormAddHandler = () => {
    setShowForm((prev) => !prev);
  };
  const addProductHandler = async () => {
    try {
      const token = Cookies.get("token");
      const file = pfileRef.current.files[0];
      if (!file) {
        throw new Error("Bạn cần chọn một file ảnh");
      }
      let formData = new FormData();
      formData.append("name", pnameRef.current.value.trim());
      formData.append("cate_id", pcateRef.current.value.trim());
      formData.append("sup_id", psupRef.current.value.trim());
      formData.append("promotion_id", ppromRef.current.value.trim());
      formData.append("file", file);
      formData.append("price", ppriceRef.current.value.trim());
      formData.append("quantity", pquantityRef.current.value.trim());
      formData.append("is_new", pisnewRef.current.value.trim());
      if (selectCate === 1 || selectCate === 3) {
        formData.append("os", posRef.current.value.trim());
        formData.append("screen", pscreenRef.current.value.trim());
        formData.append("chip", pchipRef.current.value.trim());
        formData.append("rom", promRef.current.value.trim());
        formData.append("ram", pramRef.current.value.trim());
        formData.append("camera", pcameraRef.current.value.trim());
        formData.append("pin", ppinRef.current.value.trim());
        formData.append("connect", pconnectRef.current.value.trim());
        formData.append("accory", paccoryRef.current.value.trim());
        if (selectCate === 3) {
          formData.append("card", pcardRef.current.value.trim());
          formData.append("cardRam", pcardRamRef.current.value.trim());
        }
      } else if (selectCate === 4) {
        formData.append("size", psizeRef.current.value.trim());
        formData.append("weight", pweightRef.current.value.trim());
        formData.append("sku", pskuRef.current.value.trim());
      }
      const res = await sendRequest(
        `http://localhost:2000/api/v1/admin/product`,
        "POST",
        formData,
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
  const onChangeCateHandler = (e) => {
    const sel = Number(e.target.value);
    switch (sel) {
      case 1:
      case 2:
        setSelectCate(1);
        break;
      case 3:
        setSelectCate(3);
        break;
      case 4:
        setSelectCate(4);
        break;
      default:
        setSelectCate(1);
        break;
    }
  };
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className='main-container'>
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
          title='Nhập thông tin để thêm sản phẩm'
          action={
            <>
              <button className='btn btn-danger' onClick={showFormAddHandler}>
                Hủy
              </button>{" "}
              {"    "}
              <button className='btn btn-success' onClick={addProductHandler}>
                Thêm sản phẩm
              </button>
            </>
          }>
          <div className='d-flex form_add gap-4'>
            <div>
              <div className='form_add-group'>
                <label className='d-block'>Loại sản phẩm</label>
                <select ref={pcateRef} onChange={onChangeCateHandler}>
                  <option value={"0"}>------Loại sản phẩm------</option>
                  {categories &&
                    categories.map((prom, index) => {
                      return (
                        <option key={index} value={prom.categories_id}>
                          {prom.categories_name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className='form_add-group'>
                <label className='d-block'>Mã giảm giá</label>
                <select ref={ppromRef}>
                  <option value={"0"}>------Loại giảm giá------</option>
                  {promotions &&
                    promotions.map((prom, index) => {
                      return (
                        <option key={index} value={prom.promotion_id}>
                          {prom.promotion_name + " " + prom.discount_value} %
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className='form_add-group'>
                <label className='d-block'>Nhà sản xuất</label>
                <select ref={psupRef}>
                  <option value={"0"}>------Chọn nhà sản xuất------</option>
                  {suppliers &&
                    suppliers.map((prom, index) => {
                      return (
                        <option key={index} value={prom.supplier_id}>
                          {prom.supplier_name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className='form_add-group'>
                <label className='d-block'>Tên sản phẩm</label>
                <input type='text' ref={pnameRef} />
              </div>
              <div className='form_add-group'>
                <label className='d-block'>Giá</label>
                <input type='number' ref={ppriceRef} />
              </div>
              <div className='form_add-group'>
                <label className='d-block'>Số lượng</label>
                <input type='number' ref={pquantityRef} />
              </div>
              <div className='form_add-group'>
                <label className='d-block'>Ảnh</label>
                <input type='file' ref={pfileRef} />
              </div>
              <div className='form_add-group'>
                <label className='d-block'>Tình trạng</label>
                <select ref={pisnewRef}>
                  <option value={0}>Cũ</option>
                  <option value={1}>Mới</option>
                </select>
              </div>
            </div>
            <div>
              {(selectCate === 1 || selectCate === 3) && (
                <>
                  <div className='form_add-group'>
                    <label className='d-block'>Hệ điều hành</label>
                    <input type='text' ref={posRef} />
                  </div>
                  <div className='form_add-group'>
                    <label className='d-block'>Màn hình</label>
                    <input type='text' ref={pscreenRef} />
                  </div>
                  <div className='form_add-group'>
                    <label className='d-block'>Chip</label>
                    <input type='text' ref={pchipRef} />
                  </div>
                  <div className='form_add-group'>
                    <label className='d-block'>Bộ nhớ trong</label>
                    <input type='text' ref={promRef} />
                  </div>
                  <div className='form_add-group'>
                    <label className='d-block'>Ram</label>
                    <input type='text' ref={pramRef} />
                  </div>
                  <div className='form_add-group'>
                    <label className='d-block'>Camera</label>
                    <input type='text' ref={pcameraRef} />
                  </div>
                  <div className='form_add-group'>
                    <label className='d-block'>Pin</label>
                    <input type='text' ref={ppinRef} />
                  </div>
                  <div className='form_add-group'>
                    <label className='d-block'>Các loại kết nối</label>
                    <input type='text' ref={pconnectRef} />
                  </div>
                  <div className='form_add-group'>
                    <label className='d-block'>Phụ kiện đi kèm</label>
                    <input type='text' ref={paccoryRef} />
                  </div>
                </>
              )}
              {selectCate === 3 && (
                <>
                  <div className='form_add-group'>
                    <label className='d-block'>Card đồ họa</label>
                    <input type='text' ref={pcardRef} />
                  </div>
                  <div className='form_add-group'>
                    <label className='d-block'>Dung lượng card đồ họa</label>
                    <input type='text' ref={pcardRamRef} />
                  </div>
                </>
              )}
              {selectCate === 4 && (
                <>
                  <div className='form_add-group'>
                    <label className='d-block'>Kích thước</label>
                    <input type='text' ref={psizeRef} />
                  </div>
                  <div className='form_add-group'>
                    <label className='d-block'>Trọng lượng</label>
                    <input type='text' ref={pweightRef} />
                  </div>
                  <div className='form_add-group'>
                    <label className='d-block'>SKU</label>
                    <input type='text' ref={pskuRef} />
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
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
      {products.length === 0 ? (
        <h3>Không có sản phẩm</h3>
      ) : (
        <>
          <h3>Quản lý sản phẩm</h3>
          <button className='btn btn-primary mb-4' onClick={showFormAddHandler}>
            Thêm sản phẩm mới
          </button>
          <table className='tbl_products'>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Loại sản phẩm</th>
              <th>Ảnh</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Chức năng</th>
            </tr>
            {products &&
              products.map((item, index) => {
                return (
                  <tr key={index}>
                    <ProductItemAdmin item={item} />
                  </tr>
                );
              })}
          </table>
        </>
      )}
    </div>
  );
};

export default ProductAdmin;
