import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ProductsList from "./Products/ProductList";
// import AccessoryList from "./Accessories/AccessoryList";
import SynthesisProduct from "./SynthesisProduct/SynthesisProduct";
import Show from "./Show/Show";
import "./Main.css";
import QuickSearch from "./QuickSearch/QuickSearch";
import Spinner from "../../shared/components/UIElements/Spinner";
import Modal from "../../shared/components/UIElements/Modal";

const Main = (props) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, setError, statusCode, clearError } =
    useHttpClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sendRequest(
          "http://localhost:2000/api/v1/shop/products"
        );
        if (statusCode >= 500) {
          navigate("/error");
          return;
        }
        setProducts(data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [sendRequest, setError, navigate, statusCode]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className='container main'>
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
      <Show />
      <ProductsList
        items={products}
        classNameItem='boxShadow'
        row='row g-3'
        col='col-6 col-md-4'
      />
      <SynthesisProduct />
      <QuickSearch />
    </div>
  );
};

export default Main;
