import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ProductPortfolio from "../Category/ProductPortfolio/ProductPortfolio";
import AttachProduct from "../Category/AttachProduct/AttachProduct";
import NewFeed from "../Category/NewFeed/NewFeed";
import "./ProductDetail.css";
import Spinner from "../../shared/components/UIElements/Spinner";
import Modal from "../../shared/components/UIElements/Modal";

const CATEGORIES = {
  1: "Điện thoại",
  2: "Tablet",
  3: "Laptop",
  4: "Phụ kiện",
  5: "Cữ giá rẻ",
};

const PRODUCTS = [
  {
    id: 1,
    img: "https://mauweb.monamedia.net/thegioididong/wp-content/uploads/2017/12/op-deo-hinh-thu-01.jpg",
    name: "Ốp Lưng Dẻo Cho iPhone 6 Plus/6s Plus – Gấu Kèm Thú Nổi",
    price: 90000,
    category: "phu-kien",
  },
  {
    id: 2,
    img: "https://mauweb.monamedia.net/thegioididong/wp-content/uploads/2017/12/uag-ipad-01.jpg",
    name: "Bao Da iPad Pro 10.5 inch UAG Metropolis – Hàng Chính Hãng",
    price: 1034000,
    category: "phu-kien",
  },
  {
    id: 3,
    img: "https://mauweb.monamedia.net/thegioididong/wp-content/uploads/2017/12/Kashimura-BL-40-01.jpg",
    name: "Thiết Bị Kết Nối Bluetooth Với Điện Thoại Kashimura BL-40 3.0i",
    price: 700000,
    category: "phu-kien",
  },
  {
    id: 4,
    img: "https://mauweb.monamedia.net/thegioididong/wp-content/uploads/2017/12/op-deo-hinh-thu-01.jpg",
    name: "Ốp Lưng Dẻo Cho iPhone 6 Plus/6s Plus – Gấu Kèm Thú Nổi",
    price: 90000,
    discount: 0.31,
    category: "phu-kien",
  },
  {
    id: 5,
    img: "https://mauweb.monamedia.net/thegioididong/wp-content/uploads/2017/12/op-deo-hinh-thu-01.jpg",
    name: "Ốp Lưng Dẻo Cho iPhone 6 Plus/6s Plus – Gấu Kèm Thú Nổi",
    price: 90000,
    discount: 0.31,
    category: "phu-kien",
  },
  {
    id: 6,
    img: "https://mauweb.monamedia.net/thegioididong/wp-content/uploads/2017/12/op-deo-hinh-thu-01.jpg",
    name: "Ốp Lưng Dẻo Cho iPhone 6 Plus/6s Plus – Gấu Kèm Thú Nổi",
    price: 90000,
    discount: 0.31,
    category: "phu-kien",
  },
];

const ProductDetail = (props) => {
  const { id, category } = useParams();
  const [item, setItem] = useState(null);
  const [itemDetail, setItemDetail] = useState(null);
  const [countP, setCountP] = useState(1);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, setError, clearError, statusCode } =
    useHttpClient();
  const fetchData = useCallback(async () => {
    try {
      const res = await sendRequest(
        `http://localhost:2000/api/v1/shop/detail/${category}/${id}`
      );
      if (statusCode >= 500) {
        navigate("/error");
        return;
      }
      if (!res.data) {
        return "/";
      }
      setItem(res.data);
      setItemDetail(res.data);
    } catch (error) {
      setError(error.message);
    }
  }, [category, id, sendRequest]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const addProductToCartHandler = () => {
    let discount = item.Product?.Promotion?.discount_value ?? 0;
    let product = {
      product_id: item.Product.product_id,
      product_name: item.Product.product_name,
      product_image_url: item.Product.product_image_url,
      product_price: (1 - +discount / 100) * +item.Product.product_price,
      discount_value: discount / 100,
      count: countP,
    };
    props.addToCart(product);
  };
  const incrementCountHandler = () => {
    setCountP((prev) => ++prev);
  };
  const decrementCountHandler = () => {
    setCountP((prev) => {
      if (prev === 1) return prev;
      return --prev;
    });
  };
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (!item) {
    navigate("/");
  }
  const Product = item?.Product ?? null;
  if (!Product) {
    navigate("/");
    return;
  }
  const {
    Promotion,
    Category,
    categories_id,
    product_name,
    product_image_url,
    product_price,
    quantity,
    is_new,
    Supplier,
  } = Product;

  if (!Product || !Category || !Supplier) {
    navigate("/");
    return;
  }
  const { categories_name } = Category;
  const { supplier_name } = Supplier;
  let discount_value = Promotion !== null ? Promotion.discount_value : 0;
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
      <div className='product-detail'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-12 d-lg-block d-none'>
              <ProductPortfolio category={category} />
              <AttachProduct items={PRODUCTS} category={category} />
              <NewFeed />
            </div>
            <div className='col-lg-9 col-12'>
              <div className='row'>
                <div className='col-lg-5 col-12 text-center detail-img'>
                  <img
                    src={"http://localhost:2000/uploads/" + product_image_url}
                    alt=''
                  />
                  {discount_value !== 0 && <span>-{+discount_value}%</span>}
                </div>
                <div className='col-lg-6 col-12'>
                  <p>TRANG CHỦ / {categories_name.toUpperCase()}</p>
                  <h2>{product_name}</h2>
                  <hr></hr>
                  <h4>
                    <span
                      className={`${discount_value !== 0 ? "discount" : ""}`}>
                      {(+product_price).toLocaleString()} đ
                    </span>
                    {discount_value !== 0 && (
                      <span>
                        {(
                          (1 - +discount_value / 100) *
                          product_price
                        ).toLocaleString()}{" "}
                        đ
                      </span>
                    )}
                  </h4>
                  <ul className='detail'>
                    <li>
                      {is_new
                        ? "Chính hãng, nguyên seal, mới 100%, chưa Active"
                        : "Hàng đã qua sử dụng"}
                    </li>
                    <li>Miễn phí giao hàng toàn quốc</li>

                    {categories_id === 1 ||
                    categories_id === 2 ||
                    categories_id === 3 ? (
                      <li>
                        Màn hình:{" "}
                        {itemDetail?.mobile_screen
                          ? itemDetail.mobile_screen
                          : itemDetail.laptop_screen}
                      </li>
                    ) : (
                      ""
                    )}
                    {categories_id === 1 ||
                    categories_id === 2 ||
                    categories_id === 3 ? (
                      <li>
                        Camera:
                        {itemDetail?.mobile_camera
                          ? itemDetail.mobile_camera
                          : itemDetail.laptop_camera}
                      </li>
                    ) : (
                      ""
                    )}
                    {categories_id === 1 ||
                    categories_id === 2 ||
                    categories_id === 3 ? (
                      <li>
                        CPU:
                        {itemDetail?.mobile_chip
                          ? itemDetail.mobile_chip
                          : itemDetail.laptop_chip}
                      </li>
                    ) : (
                      ""
                    )}
                    {categories_id === 1 ||
                    categories_id === 2 ||
                    categories_id === 3 ? (
                      <li>
                        Bộ nhớ:
                        {itemDetail?.mobile_rom
                          ? itemDetail.mobile_rom
                          : itemDetail.laptop_rom}
                      </li>
                    ) : (
                      ""
                    )}
                    {categories_id === 1 ||
                    categories_id === 2 ||
                    categories_id === 3 ? (
                      <li>
                        RAM:
                        {itemDetail?.mobile_ram
                          ? itemDetail.mobile_ram
                          : itemDetail.laptop_ram}
                      </li>
                    ) : (
                      ""
                    )}

                    <li>
                      Số lượng: {quantity === 0 ? "Hết hàng" : "Còn hàng"}
                    </li>
                  </ul>
                  <div className='d-flex align-items-center gap-4'>
                    <p className='m-0'>
                      <b>Màu</b>
                    </p>
                    <select>
                      <option value='0'>Đen</option>
                      <option value='1'>Xanh</option>
                      <option value='2'>Đỏ</option>
                      <option value='3'>Vàng</option>
                    </select>
                  </div>
                  <div className='d-flex align-items-center gap-4 count mt-4'>
                    <p className='m-0'>
                      <button onClick={decrementCountHandler}>-</button>{" "}
                      {countP}{" "}
                      <button onClick={incrementCountHandler}>+</button>
                    </p>
                    <button
                      onClick={addProductToCartHandler}
                      className='btn btn-primary'>
                      THÊM VÀO GIỎ HÀNG
                    </button>
                  </div>
                </div>
              </div>
              <div className='p-5 infor-detail'>
                <h5>THÔNG TIN CHI TIẾT</h5>
                <table className='w-100'>
                  <tbody>
                    <tr className='row'>
                      <td className='col-5'>Thương hiệu</td>
                      <td className='col-7'>{supplier_name}</td>
                    </tr>
                    <tr className='row'>
                      <td className='col-5'>Mã part</td>
                      <td className='col-7'>Mã Quốc Tế</td>
                    </tr>
                    {itemDetail &&
                    (categories_id === 1 ||
                      categories_id === 2 ||
                      categories_id === 3) ? (
                      <tr className='row'>
                        <td className='col-5'>Hệ điều hành</td>
                        <td className='col-7'>
                          {itemDetail?.mobile_os
                            ? itemDetail.mobile_os
                            : itemDetail.laptop_os}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {itemDetail &&
                    (categories_id === 1 ||
                      categories_id === 2 ||
                      categories_id === 3) ? (
                      <tr className='row'>
                        <td className='col-5'>
                          Loại màn hình (Công nghệ màn hình)
                        </td>
                        <td className='col-7'>
                          {itemDetail?.mobile_screen
                            ? itemDetail.mobile_screen
                            : itemDetail.laptop_screen}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {itemDetail &&
                    (categories_id === 1 ||
                      categories_id === 2 ||
                      categories_id === 3) ? (
                      <tr className='row'>
                        <td className='col-5'>Camera</td>
                        <td className='col-7'>
                          {itemDetail?.mobile_camera
                            ? itemDetail.mobile_camera
                            : itemDetail.laptop_camera}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {itemDetail &&
                    (categories_id === 1 ||
                      categories_id === 2 ||
                      categories_id === 3) ? (
                      <tr className='row'>
                        <td className='col-5'>Bộ Nhớ RAM</td>
                        <td className='col-7'>
                          {itemDetail?.mobile_ram
                            ? itemDetail.mobile_ram
                            : itemDetail.laptop_ram}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    {itemDetail &&
                    (categories_id === 1 ||
                      categories_id === 2 ||
                      categories_id === 3) ? (
                      <tr className='row'>
                        <td className='col-5'>Bộ nhớ trong (ROM)</td>
                        <td className='col-7'>
                          {itemDetail?.mobile_rom
                            ? itemDetail.mobile_rom
                            : itemDetail.laptop_rom}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    {itemDetail &&
                    (categories_id === 1 ||
                      categories_id === 2 ||
                      categories_id === 3) ? (
                      <tr className='row'>
                        <td className='col-5'>Pin</td>
                        <td className='col-7'>
                          {itemDetail?.mobile_pin
                            ? itemDetail.mobile_pin
                            : itemDetail.laptop_pin}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    {itemDetail?.laptop_card_graphic ? (
                      <tr className='row'>
                        <td className='col-5'>Card đồ họa</td>
                        <td className='col-7'>
                          {itemDetail?.laptop_card_graphic ??
                            itemDetail.laptop_card_graphic}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {itemDetail?.laptop_card_ram ? (
                      <tr className='row'>
                        <td className='col-5'>Dung lượng đồ họa</td>
                        <td className='col-7'>
                          {itemDetail?.laptop_card_ram ??
                            itemDetail.laptop_card_ram}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    {itemDetail &&
                    (categories_id === 1 ||
                      categories_id === 2 ||
                      categories_id === 3) ? (
                      <tr className='row'>
                        <td className='col-5'>Các loại kết nối</td>
                        <td className='col-7'>
                          {itemDetail?.mobile_connect
                            ? itemDetail.mobile_connect
                            : itemDetail.laptop_connect}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    {itemDetail &&
                    (categories_id === 1 ||
                      categories_id === 2 ||
                      categories_id === 3) ? (
                      <tr className='row'>
                        <td className='col-5'>Phụ kiện đi kèm</td>
                        <td className='col-7'>
                          {itemDetail?.mobile_accessory
                            ? itemDetail.mobile_accessory
                            : itemDetail.laptop_accessory}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {itemDetail?.accessory_size ? (
                      <tr className='row'>
                        <td className='col-5'>Kích thước</td>
                        <td className='col-7'>
                          {itemDetail?.accessory_size ??
                            itemDetail.accessory_size}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {itemDetail?.accessory_sku ? (
                      <tr className='row'>
                        <td className='col-5'>Model</td>
                        <td className='col-7'>
                          {itemDetail?.accessory_sku ??
                            itemDetail.accessory_sku}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {itemDetail?.accessory_weight ? (
                      <tr className='row'>
                        <td className='col-5'>Trọng lượng</td>
                        <td className='col-7'>
                          {itemDetail?.accessory_weight ??
                            itemDetail.accessory_weight}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </tbody>
                </table>
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
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) =>
    dispatch({ type: "ADD_PRODUCT", payload: { product } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
