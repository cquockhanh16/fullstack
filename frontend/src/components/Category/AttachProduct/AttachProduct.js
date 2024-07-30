import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import "./AttachProduct.css";
import AttachPrList from "./AttachPrList";
import Modal from "../../../shared/components/UIElements/Modal";

const AttachProduct = (props) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { error, sendRequest, statusCode, setError, clearError } =
    useHttpClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "http://localhost:2000/api/v1/shop/categories"
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
    fetchData();
  }, [sendRequest, setError, navigate, statusCode]);
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
      <div className='attach-product mt-5'>
        <h5>SẢN PHẨM</h5>
        <div className='line'></div>
        <AttachPrList items={products} />
      </div>
    </>
  );
};

export default AttachProduct;
