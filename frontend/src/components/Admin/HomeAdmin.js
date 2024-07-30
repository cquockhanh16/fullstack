import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillDuffleFill,
  BsFillCartFill,
  BsGiftFill,
  BsBookHalf,
} from "react-icons/bs";
import { Link } from "react-router-dom";

function HomeAdmin() {
  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>Trang chủ</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <Link to={"/admin/san-pham"}>
            <div>
              <div className='card-inner'>
                <h3>SẢN PHẨM</h3>
                <BsFillArchiveFill className='card_icon' />
              </div>
              {/* <h1>300</h1> */}
              <h1>
                <br></br>
              </h1>
            </div>
          </Link>
        </div>

        <div className='card'>
          <Link to={"/admin/danh-muc"}>
            <div>
              <div className='card-inner'>
                <h3>DANH MỤC</h3>
                <BsFillGrid3X3GapFill className='card_icon' />
              </div>
              {/* <h1>12</h1> */}
              <h1>
                <br></br>
              </h1>
            </div>
          </Link>
        </div>
        <div className='card'>
          <Link to={"/admin/tai-khoan"}>
            <div>
              <div className='card-inner'>
                <h3>TÀI KHOẢN</h3>
                <BsPeopleFill className='card_icon' />
              </div>
              {/* <h1>33</h1> */}
              <h1>
                <br></br>
              </h1>
            </div>
          </Link>
        </div>
        <div className='card'>
          <Link to={"/admin/hang-san-xuat"}>
            <div>
              <div className='card-inner'>
                <h3>NHÀ CUNG CẤP</h3>
                <BsFillDuffleFill className='card_icon' />
              </div>
              {/* <h1>42</h1> */}
              <h1>
                <br></br>
              </h1>
            </div>
          </Link>
        </div>
        <div className='card'>
          <Link to={"/admin/tin-tuc"}>
            <div>
              <div className='card-inner'>
                <h3>TIN TỨC</h3>
                <BsBookHalf className='card_icon' />
              </div>
              {/* <h1>42</h1> */}
              <h1>
                <br></br>
              </h1>
            </div>
          </Link>
        </div>
        <div className='card'>
          <Link to={"/admin/khuyen-mai"}>
            <div>
              <div className='card-inner'>
                <h3>KHUYẾN MÃI</h3>
                <BsGiftFill className='card_icon' />
              </div>
              {/* <h1>42</h1> */}
              <h1>
                <br></br>
              </h1>
            </div>
          </Link>
        </div>
        <div className='card'>
          <Link to={"/admin/don-hang"}>
            <div>
              <div className='card-inner'>
                <h3>ĐƠN HÀNG</h3>
                <BsFillCartFill className='card_icon' />
              </div>
              {/* <h1>42</h1> */}
              <h1>
                <br></br>
              </h1>
            </div>
          </Link>
        </div>
      </div>

      {/* <div className='charts'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='pv' fill='#8884d8' />
            <Bar dataKey='uv' fill='#82ca9d' />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='pv'
              stroke='#8884d8'
              activeDot={{ r: 8 }}
            />
            <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
          </LineChart>
        </ResponsiveContainer>
      </div> */}
    </main>
  );
}

export default HomeAdmin;
