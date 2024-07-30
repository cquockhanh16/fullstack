import React, { useState } from "react";
import NewsList from "./NewsList";
import NewFeed from "../Category/NewFeed/NewFeed";
import QuickSearch from "../Main/QuickSearch/QuickSearch";

import "./News.css";

const NEWS = [
  {
    id: 1313,
    title: "Trọn bộ hình nền Huawei Mate 10 đẹp “miễn chê” cho mọi smartphone",
    description:
      "Huawei đã ra mắt bộ đôi sản phẩm dòng Mate series tới người dùng vào tháng 10 năm nay là Mate 10 và Mate 10 Pro. Cả 2 điện thoại đều có thiết kế đẹp mắt đi kèm với thông số kỹ thuật hàng đầu và thiết lập camera thương hiệu Leica trứ danh. Hiện tại, chúng ta khó có thể tiếp cận được Mate 10 hay Mate 10 Pro vì Huawei chỉ bán giới hạn tại một số thị trường nhất định. Tuy nhiên, chúng ta có hình nền của các điện thoại này.",
    img: "https://mauweb.monamedia.net/thegioididong/wp-content/uploads/2017/12/hinh-nen-mate-10-pro-.jpg",
    date: "16/10/2003",
    link: "https://mauweb.monamedia.net/thegioididong/tron-bo-hinh-nen-huawei-mate-10-dep-mien-che-cho-moi-smartphone/",
  },
  {
    id: 13213,
    title:
      "Rò rỉ thông tin Nokia 6 (2018): Màn hình tràn viền, tỉ lệ 18:9, Snapdragon 6XX, RAM 4GB",
    description:
      "Theo trang NokiaPowerUser, dường như HMD Global đang lên kế hoạch phát triển thế hệ thứ hai cho dòng sản phẩm Nokia. Cụ thể, không lâu sau khi xuất hiện thông tin cho thấy chiếc Nokia 8 2018 sẽ được trình làng vào ngày 19/1 thì bây giờ đến lượt chiếc Nokia 6 2018 cũng bắt đầu rò rỉ những thông tin đầu tiên.",
    img: "https://mauweb.monamedia.net/thegioididong/wp-content/uploads/2017/12/Nokia-6-TA-1054-cover-300x150.jpg",
    date: "16/10/2003",
    link: "https://mauweb.monamedia.net/thegioididong/tron-bo-hinh-nen-huawei-mate-10-dep-mien-che-cho-moi-smartphone/",
  },
];

const News = (props) => {
  const [news, setNews] = useState(NEWS);
  return (
    <>
      <div className='news'>
        <div className='container'>
          <h5 className='text-center p-3'>TIN TỨC</h5>
          <div className='row'>
            <div className='col-12 col-md-8'>
              <NewsList items={news} />
            </div>
            <div className='col-12 col-md-4'>
              <NewFeed />
            </div>
          </div>
        </div>
      </div>
      <QuickSearch className='container' />
    </>
  );
};

export default News;
