import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useAsync } from "hook/useAsync";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addUserApi,
  editUserByAdminApi,
  fetchUserInfoApi,
} from "services/user";

export default function UserForm() {
  const [componentSize, setComponentSize] = useState("default");

  const navigate = useNavigate();

  const params = useParams();

  const [form] = Form.useForm();

  const { state: userInfo } = useAsync({
    service: () => fetchUserInfoApi(params.taiKhoan),
    dependecies: [params.taiKhoan],
    condition: !!params.taiKhoan,
  });

  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue({
        ...userInfo,
      });
    }
  }, [userInfo]);

  const onFormLayoutChange = (event) => {
    setComponentSize(event.target.value);
  };

  const handleSave = async (values) => {
    if (params.taiKhoan) {
      try {
        await editUserByAdminApi(values);
        notification.success({
          message: "Cập nhật người dùng thành công!",
        });
      } catch (errors) {
        notification.danger({
          message: errors.response.data.content,
        });
      }
    } else {
      try {
        await addUserApi(values);
        notification.success({
          message: "Thêm người dùng thành công!",
        });
        navigate("/admin");
      } catch (errors) {
        notification.warning({
          message: errors.response.data.content,
        });
      }
    }
  };

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
        taiKhoan: "",
        hoTen: "",
        email: "",
        soDT: "",
        matKhau: "",
        maNhom: "",
        maLoaiNguoiDung: "",
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
      <Form.Item label="Tài khoản" name="taiKhoan">
        <Input />
      </Form.Item>
      <Form.Item label="Họ tên" name="hoTen">
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Số điện thoại" name="soDT">
        <Input />
      </Form.Item>
      <Form.Item label="Mật khẩu" name="matKhau">
        <Input />
      </Form.Item>
      <Form.Item label="Mã nhóm" name="maNhom">
        <Input />
      </Form.Item>
      <Form.Item label="Loại người dùng" name="maLoaiNguoiDung">
        <Select placeholder="Chọn loại người dùng">
          <Select.Option value="QuanTri">Quản trị</Select.Option>
          <Select.Option value="KhachHang">Khách hàng</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item className="mt-3">
        <Button htmlType="submit" type="primary">
          SAVE
        </Button>
      </Form.Item>
    </Form>
  );
}
