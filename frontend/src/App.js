import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Main from "./components/Main/Main";
import Category from "./components/Category/Category";
import News from "./components/News/News";
import NewsDetail from "./components/News/NewsDetail";
import Question from "./components/Question/Question";
import Cart from "./components/Cart/Cart";
import ProductDetail from "./components/Detail/ProductDetail";
import Footer from "./shared/components/Footer/Footer";
import Pay from "./components/Pay/Pay";
import DetailPayment from "./components/DetailPayment/DetailPayment";
import MainAdmin from "./components/Admin/MainAdmin";
import Auth from "./components/Auth/Auth";
import Search from "./components/Search/Search";
import ProductAdmin from "./components/Admin/ProductAdmin";
import HomeAdmin from "./components/Admin/HomeAdmin";
import OrderAdmin from "./components/Admin/OrderAdmin";
import ErrorServer from "./components/ErrorServer/ErrorServer";
import Orders from "./components/Orders/Orders";
import Information from "./components/Information/Information";
import CategoryAdmin from "./components/Admin/CategoryAdmin";
import AccountAdmin from "./components/Admin/AccountAdmin";
import SupplierAdmin from "./components/Admin/SupplierAdmin";
import PromotionAdmin from "./components/Admin/PromotionAdmin";
import NewAdmin from "./components/Admin/NewAdmin";

function App(props) {
  const isAdminProps = props.isAdmin || false;
  const navigate = useNavigate();
  const location = useLocation();
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);
  useEffect(() => {
    if (isAdminProps && !location.pathname.startsWith("/admin")) {
      setHideHeaderFooter(true);
      navigate("/admin");
    } else {
      setHideHeaderFooter(false);
    }
    const token = Cookies.get("token");
    const uid = Cookies.get("uid") || props.uid;
    const isLogin = Cookies.get("isLogin") === "true" || props.isLogin;
    const isAdmin = Cookies.get("isAdmin") === "true" || isAdminProps;

    if (token && uid && isLogin) {
      // Tự động đăng nhập lại người dùng
      props.login(uid, isAdmin); // Giả sử login là action bạn sử dụng để thiết lập trạng thái đăng nhập
    }
  }, [props]);
  return (
    <>
      {!isAdminProps && <MainNavigation />}
      <main>
        <Routes>
          <Route path='/' exact element={<Main />}></Route>
          <Route
            path='/danh-muc/:category'
            exact
            element={<Category />}></Route>
          <Route path='/category/tin-tuc' exact element={<News />}></Route>
          <Route path='/tin-tuc/:id' exact element={<NewsDetail />}></Route>
          <Route path='/hoi-dap' exact element={<Question />}></Route>
          <Route path='/gio-hang' exact element={<Cart />}></Route>
          <Route path='/thanh-toan' exact element={<Pay />}></Route>
          {isAdminProps && (
            <>
              <Route path='/admin' element={<MainAdmin />}>
                <Route index element={<HomeAdmin />} />
                <Route path='san-pham' element={<ProductAdmin />} />
                <Route path='don-hang' element={<OrderAdmin />} />
                <Route path='danh-muc' element={<CategoryAdmin />} />
                <Route path='tai-khoan' element={<AccountAdmin />} />
                <Route path='hang-san-xuat' element={<SupplierAdmin />} />
                <Route path='khuyen-mai' element={<PromotionAdmin />} />
                <Route path='tin-tuc' element={<NewAdmin />} />
              </Route>
            </>
          )}
          <Route path='/dang-nhap' exact element={<Auth />}></Route>
          <Route path='/thong-tin' exact element={<Information />}></Route>
          <Route path='/don-hang' exact element={<Orders />}></Route>
          <Route path='/search/:keyword' element={<Search />}></Route>
          <Route
            path='/order-received/:order_id'
            exact
            element={<DetailPayment />}></Route>
          <Route
            path='/san-pham/:category/:id'
            element={<ProductDetail />}></Route>
          <Route path='/error' element={<ErrorServer />}></Route>
        </Routes>
      </main>
      {!isAdminProps && <Footer />}
    </>
  );
}

const mapStateToProps = (state) => ({
  uid: state.uid,
  isLogin: state.isLogin,
  isAdmin: state.isAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  login: (uid, isAdmin) =>
    dispatch({ type: "LOGIN", payload: { uid, isAdmin } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
