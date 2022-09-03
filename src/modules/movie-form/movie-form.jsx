import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { GROUP_ID } from "constants/common";
import { useAsync } from "hook/useAsync";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addMovieUploadImage,
  fetchMovieDetailApi,
  updateMovieUploadImage,
} from "services/movie";
import moment from "moment";
import _, { isEmpty } from "lodash";

export default function MovieForm() {
  const [componentSize, setComponentSize] = useState("default");

  const [image, setImage] = useState();

  const [file, setFile] = useState();

  const params = useParams();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { state: movieDetail } = useAsync({
    service: () => fetchMovieDetailApi(params.movieId),
    dependecies: [params.movieId],
    condition: !!params.movieId,
  });

  useEffect(() => {
    if (movieDetail) {
      form.setFieldsValue({
        ...movieDetail,
        ngayKhoiChieu: moment(movieDetail.ngayKhoiChieu),
      });

      setImage(movieDetail.hinhAnh);
    }
  }, [movieDetail]);

  console.log(movieDetail);

  const onFormLayoutChange = (event) => {
    setComponentSize(event.target.value);
  };

  const handleSave = async (values) => {
    values.ngayKhoiChieu = values.ngayKhoiChieu.format("DD/MM/YYYY");

    values.maNhom = GROUP_ID;

    const formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }

    file && formData.append("File", file, file.name);

    params.movieId && formData.append("maPhim", params.movieId);

    if (params.movieId) {
      await updateMovieUploadImage(formData);
    } else {
      await addMovieUploadImage(formData);
    }

    notification.success({
      message: "Successfully!",
    });

    navigate("/admin/movie-management");
  };

  const handleChangeImage = (event) => {
    const file = event.target.files[0];

    console.log(event.target.files);
    console.log(file);

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (e) => {
      console.log(e.target.result);
      setImage(e.target.result);
      setFile(file);
      // console.log({image, file});
    };
  };
  console.log(image);

  return (
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="vertical"
      initialValues={{
        tenPhim: "",
        trailer: "",
        moTa: "",
        ngayKhoiChieu: "",
        sapChieu: true,
        dangChieu: true,
        hot: "",
        danhGia: "",
        maPhim: "",
      }}
      onFinish={handleSave}
      size={componentSize}
    >
      <Form.Item label="Form Size">
        <Radio.Group defaultValue={componentSize} onChange={onFormLayoutChange}>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Tên phim"
        name="tenPhim"
        validateTrigger={["onBlur"]}
        rules={[
          {
            required: true,
            message: "Tên phim không được bỏ trống.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Trailer"
        name="trailer"
        validateTrigger={["onBlur"]}
        rules={[
          {
            required: true,
            message: "Trailer không được bỏ trống.",
          },
          {
            pattern: "https?://.+",
            message: "Trailer không đúng định dạng.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="moTa"
        validateTrigger={["onBlur"]}
        rules={[
          {
            validator: (rules, value) => {
              if (isEmpty(value)) {
                return Promise.reject("Mô tả không được bỏ trống.");
              }

              return Promise.resolve();
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Ngày khởi chiếu"
        name="ngayKhoiChieu"
        validateTrigger={["onBlur"]}
        rules={[
          {
            required: true,
            message: "Tên phim không được bỏ trống.",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked" name="dangChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked" name="sapChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked" name="hot">
        <Switch />
      </Form.Item>
      <Form.Item
        label="Số sao"
        name="danhGia"
        validateTrigger={["onBlur"]}
        rules={[
          { required: true, message: "Vui lòng điền số sao." },
          {
            pattern: /^[0-9]+$/,
            message: "Số sao không đúng định dạng",
          },
          { min: 1, message: "Số sao phải lớn hơn 0", type: "number" },
          {
            max: 10,
            message: "Số sao phải không được lớn hơn 10",
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <Input type="file" onChange={handleChangeImage} />
      </Form.Item>
      <Image src={image} />
      <Form.Item shouldUpdate className="mt-3">
        {() => {
          return (
            <Button
              htmlType="submit"
              type="primary"
              disabled={
                !form.isFieldsTouched() ||
                form.getFieldsError().some((ele) => ele.errors.length > 0)
              }
            >
              SAVE
            </Button>
          );
        }}
      </Form.Item>
    </Form>
  );
}
