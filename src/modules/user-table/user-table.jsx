import { Button, notification } from "antd";
import { useAsync } from "hook/useAsync";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUserApi, fetchUserListApi } from "services/user";
import { Space, Table, Tag, Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";

export default function UserTable() {
  const navigate = useNavigate();

  const [searchState, setSearchState] = useState([]);

  const { Search } = Input;

  const { state: data } = useAsync({
    service: () => fetchUserListApi(),
  });

  const onSearch = (value) => {
    // console.log(value);
    let searchData = data.filter((ele) => {
      return (
        ele.hoTen.toLowerCase().trim().indexOf(value.toLowerCase().trim()) !==
        -1
      );
    });
    console.log(searchData);

    setSearchState(searchData);

    console.log(searchState);
  };

  // let searchData = data.filter((ele) => {
  //   return (
  //     ele.hoTen.toLowerCase().trim().indexOf(value.toLowerCase().trim()) !== -1
  //   );
  // });
  // console.log(searchData);

  // const deleteUser = async (taiKhoan) => {
  //   try {
  //     await deleteUserApi(taiKhoan);
  //     notification.success({
  //       message: "Xóa người dùng thành công!",
  //     });
  //     navigate("/admin");
  //   } catch (errors) {
  //     notification.warning({
  //       message: errors.response.data.content,
  //     });
  //   }
  // };

  const deleteUser = async (taiKhoan) => {
    await deleteUserApi(taiKhoan);
    notification.success({
      message: "Xóa người dùng thành công!",
    });
    navigate("/admin");
  };

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số đt",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Loại ND",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() =>
              navigate(`/admin/user-management/${record.taiKhoan}/update-user`)
            }
            type="primary"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
          <Button onClick={() => deleteUser(record.taiKhoan)} type="danger">
            <i className="fa-solid fa-trash"></i>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Space direction="vertical">
            <Search
              placeholder="Nhập họ tên cần tìm"
              onSearch={onSearch}
              enterButton
              name="keyword"
              allowClear
            />
          </Space>
        </div>

        <Button
          type="primary"
          onClick={() => navigate("/admin/user-management/create-user")}
        >
          CREATE USER
        </Button>
      </div>
      <Table
        rowKey="taiKhoan"
        columns={columns}
        dataSource={searchState.length > 0 ? searchState : data}
      />
    </>
  );
}
