import { Button, notification, Space, Table, Tag } from "antd";
import { useAsync } from "hook/useAsync";
import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteMovieApi, fetchMovieListApi } from "services/movie";
import { formatDate } from "utils/common";

export default function MovieTable() {
  const navigate = useNavigate();

  const { state: data = [] } = useAsync({
    service: () => fetchMovieListApi(),
  });

  const deleteMovie = async (maPhim) => {
    try {
      await deleteMovieApi(maPhim);
      notification.success({
        message: "Xóa phim thành công!",
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
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },

    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
    },

    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => {
        return (
          <img
            className="img-fluid"
            src={text}
            alt={text}
            width={100}
            height={70}
          />
        );
      },
    },

    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      render: (text, record) => {
        console.log({ text, record });
        return <span>{formatDate(text)}</span>;
      },
    },

    {
      title: "Đánh giá",
      dataIndex: "danhGia",
      key: "danhGia",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() =>
              navigate(`/admin/movie-management/${record.maPhim}/update-movie`)
            }
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
          <Button type="danger" onClick={() => deleteMovie(record.maPhim)}>
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
          onClick={() => navigate("/admin/movie-management/create-movie")}
        >
          CREATE MOVIE
        </Button>
      </div>
      <Table rowKey="maPhim" columns={columns} dataSource={data} />
    </>
  );
}
