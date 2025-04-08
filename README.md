# test_BeesGroup

# npm start : App Development Test

# live server : Logic Test

# tham khảo : Grok, Antd solution, ...

Logic Test : chú thích ở trong processWithDeplay.ts

App Development Test: + Dùng Antd để có lấy Table và ColumnsType + Gồm có sort (name , balance, registration, ) và filter (name, status) + Field Action có edit và delete  
 . Edit item trên UI -> ShowModal
. Delete item trên UI + Scroll cố định scroll={{ x: true, y: 700 }} chưa đúng yêu cầu (infinite scroll)

    + Fecth API : https://randomuser.me/api/?results=150
        . data map theo TUser[]
    + Mode toggle : ConfigProvider từ Antd lấy mode theme
    + Hiển thị thông báo lỗi khi không có data lấy xuống
    + dùng Spin từ Antd để loading khi data đang lấy xuống

    -- Ban đầu làm UI random cố định các field dạng tĩnh ở User.ts theo bài test
    -- Sau khi fetch API những field ko lấy xuống data được thì vẫn chủ động tính toán random

# Cảm ơn các anh chị của công ty ạ!

# Em chỉ có đủ 2 3 ngày full thời gian cho bài test này ạ!

# Em không đủ thời gian làm JS thuần ạ!
