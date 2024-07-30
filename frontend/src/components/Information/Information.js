import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { formattedDate } from "../../shared/util/convertTime";
import "./Information.css";
import Spinner from "../../shared/components/UIElements/Spinner";
import Modal from "../../shared/components/UIElements/Modal";

const Information = () => {
  const [userInfor, setUserInfor] = useState();
  const { isLoading, error, setError, sendRequest, statusCode, clearError } =
    useHttpClient();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "http://localhost:2000/api/v1/infor",
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        if (statusCode >= 500) {
          navigate("/error");
          return;
        }
        setUserInfor(res.user);
        console.log(res.user);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [navigate, sendRequest, token, setError, statusCode]);
  if (isLoading) {
    return <Spinner />;
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
      {userInfor && (
        <div className='information'>
          <div className='container'>
            <div className='text-center'>
              <h3 className='mb-2 text-center'>Thông tin tài khoản</h3>
              <div className='user_img'>
                {userInfor.account_image ? (
                  <img
                    src={
                      "http://localhost:2000/uploads/" + userInfor.account_image
                    }
                    alt=''
                  />
                ) : (
                  <img
                    src={"https://freesvg.org/img/abstract-user-flat-4.png"}
                    alt=''
                  />
                )}
              </div>
              <p>
                Tên tài khoản: <span>{userInfor.username}</span>
              </p>
              <p>
                Được tạo lúc: <span>{formattedDate(userInfor.createdAt)}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
    // <></>
  );
};

export default Information;
