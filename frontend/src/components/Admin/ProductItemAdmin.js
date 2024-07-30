import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductItemAdmin.css";
import Cookies from "js-cookie";
import Modal from "../../shared/components/UIElements/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Spinner from "../../shared/components/UIElements/Spinner";

const ProductItemAdmin = (props) => {
  const { sendRequest, isLoading, error, clearError, setError, statusCode } =
    useHttpClient();
  const {
    product_id,
    categories_id,
    product_name,
    product_price,
    product_image_url,
    quantity,
    Category,
  } = props.item;
  const navigate = useNavigate();
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [promotions, setPromotions] = useState(null);
  const [product, setProduct] = useState({});
  const [pname, setPname] = useState("");
  const [pprice, setPprice] = useState("");
  const [pquantity, setPquantity] = useState("");
  const pfile = useRef();
  const ppromotion = useRef();
  const token = Cookies.get("token");
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
  }, [sendRequest, navigate]);
  const showFormEditHandler = () => {
    setShowFormEdit((prev) => !prev);
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          `http://localhost:2000/api/v1/admin/product/${product_id}`,
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
        setProduct(res.data);
        setPname(res.data.product_name);
        setPprice(res.data.product_price);
        setPquantity(res.data.quantity);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
    console.log(product);
  };
  const changeProductNameHandler = (e) => {
    setPname(e.target.value);
  };
  const changeProductPriceHandler = (e) => {
    setPprice(e.target.value);
  };
  const changeProductQuantityHandler = (e) => {
    setPquantity(e.target.value);
  };
  const editProductHandler = async () => {
    try {
      const file = pfile.current.files[0];
      const promotion_id = ppromotion.current.value;
      console.log(promotion_id);
      if (!file) {
        throw new Error("Bạn cần chọn một file ảnh");
      }
      let formData = new FormData();
      formData.append("name", pname);
      formData.append("price", pprice);
      formData.append("quantity", pquantity);
      formData.append("file", file);
      formData.append("promotion_id", promotion_id);
      const res = await sendRequest(
        `http://localhost:2000/api/v1/admin/products?id=${product_id}`,
        "PATCH",
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
      setShowFormEdit((prev) => !prev);
    }
  };
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  const deleteProductHandler = () => {};
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
          title='Nhập thông tin để sửa sản phẩm'
          action={
            <>
              <button className='btn btn-primary' onClick={showFormEditHandler}>
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
              <label className='d-block'>Tên sản phẩm</label>
              <input
                onChange={changeProductNameHandler}
                type='text'
                value={pname}
              />
            </div>
            <div>
              <label className='d-block'>Giá</label>
              <input
                onChange={changeProductPriceHandler}
                type='number'
                value={pprice}
              />
            </div>
            <div>
              <label className='d-block'>Số lượng</label>
              <input
                onChange={changeProductQuantityHandler}
                type='number'
                value={pquantity}
              />
            </div>
            <div>
              <label className='d-block'>Ảnh</label>
              <input ref={pfile} type='file' />
            </div>
            <div>
              <label className='d-block'>Mã giảm giá</label>
              <select ref={ppromotion}>
                <option value={"0"}>Chọn mã giảm giá</option>
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
          </div>
        </Modal>
      )}
      <td>{product_id}</td>
      <td>{product_name}</td>
      <td>{Category.categories_name}</td>
      <td className='pro_img'>
        <img
          src={"http://localhost:2000/uploads/" + product_image_url}
          alt={product_name}
        />
      </td>
      <td>{(+product_price).toLocaleString()} đ</td>
      <td>{quantity}</td>
      <td>
        <button className='btn btn-info mb-2' onClick={showFormEditHandler}>
          Sửa
        </button>{" "}
        <button
          className='btn btn-danger'
          disabled
          onClick={deleteProductHandler}>
          Xóa
        </button>
      </td>
    </>
  );
};

export default ProductItemAdmin;
