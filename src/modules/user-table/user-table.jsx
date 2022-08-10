import { Button, notification } from "antd";
import { useAsync } from "hook/useAsync";
import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteUserApi, fetchUserListApi } from "services/user";
import { Space, Table, Tag } from "antd";

export default function UserTable() {
  const navigate = useNavigate();

  const { state: data } = useAsync({
    service: () => fetchUserListApi(),
  });

  const deleteUser = async (taiKhoan) => {
    try {
      await deleteUserApi(taiKhoan);
      notification.success({
        message: "Xóa người dùng thành công!",
      });
      navigate("/admin");
    } catch (errors) {
      notification.warning({
        message: errors.response.data.content,
      });
    }
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
      <div className="text-right mb-3">
        <Button
          type="primary"
          onClick={() => navigate("/admin/user-management/create-user")}
        >
          CREATE USER
        </Button>
      </div>
      <Table rowKey="taiKhoan" columns={columns} dataSource={data} />
    </>
  );
}
