import { Button, Input, notification, Space, Table, Tag } from "antd";
import { useAsync } from "hook/useAsync";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMovieApi, fetchMovieListApi } from "services/movie";
import { formatDate } from "utils/common";

export default function MovieTable() {
  const navigate = useNavigate();

  const [searchState, setSearchState] = useState([]);

  const { Search } = Input;

  const { state: data } = useAsync({
    service: () => fetchMovieListApi(),
  });

  const onSearch = (value) => {
    // console.log(value);
    let searchData = data.filter((ele) => {
      return (
        ele.tenPhim.toLowerCase().trim().indexOf(value.toLowerCase().trim()) !==
        -1
      );
    });
    console.log(searchData);

    setSearchState(searchData);

    console.log(searchState);
  };

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
          <a
            title="Update movie"
            className="text-warning"
            style={{ fontSize: 20 }}
            onClick={() =>
              navigate(`/admin/movie-management/${record.maPhim}/update-movie`)
            }
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </a>
          <a
            title="Delete movie"
            className="text-danger"
            style={{ fontSize: 20 }}
            onClick={() => deleteMovie(record.maPhim)}
          >
            <i className="fa-solid fa-trash"></i>
          </a>
          <a
            title="Create schedule"
            className="text-success"
            style={{ fontSize: 20 }}
            onClick={() =>
              navigate(
                `/admin/movie-management/${record.maPhim}/movie-schedule`
              )
            }
          >
            <i className="fa-solid fa-calendar-days"></i>
          </a>
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
              placeholder="Nhập tên phim cần tìm"
              onSearch={onSearch}
              enterButton
              name="keyword"
              allowClear
            />
          </Space>
        </div>

        <Button
          type="primary"
          onClick={() => navigate("/admin/movie-management/create-movie")}
        >
          CREATE MOVIE
        </Button>
      </div>
      <Table
        rowKey="maPhim"
        columns={columns}
        dataSource={searchState.length > 0 ? searchState : data}
      />
    </>
  );
}
