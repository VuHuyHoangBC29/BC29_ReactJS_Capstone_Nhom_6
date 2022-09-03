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
  fetchUserTypeApi,
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

  console.log(userInfo);

  const { state: userType } = useAsync({
    service: () => fetchUserTypeApi(),
  });

  console.log(userType);

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
        navigate("/admin/user-management");
      } catch (errors) {
        notification.warning({
          message: errors.response.data.content,
        });
      }
    } else {
      try {
        await addUserApi(values);
        notification.success({
          message: "Thêm người dùng thành công!",
        });
        navigate("/admin/user-management");
      } catch (errors) {
        notification.warning({
          message: errors.response.data.content,
        });
      }
    }

    // console.log(values);
  };

  return (
    <div>
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
          <Radio.Group
            defaultValue={componentSize}
            onChange={onFormLayoutChange}
          >
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Tài khoản"
          name="taiKhoan"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Tài khoản không được bỏ trống.",
            },
            {
              min: 5,
              message: "Tài khoản phải dài hơn hoặc bằng 5 ký tự.",
              type: "string",
            },
            {
              max: 20,
              message: "Tài khoản phải nhỏ hơn hơn hoặc bằng 20 ký tự.",
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Họ tên"
          name="hoTen"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Họ tên không được bỏ trống.",
            },
            {
              pattern:
                "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
              message: "Họ tên không đúng định dạng.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Email không được bỏ trống.",
            },
            {
              pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
              message: "Email không đúng định dạng.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="soDT"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Số điện thoại không được bỏ trống.",
            },
            {
              pattern: /^[0-9]+$/,
              message: "Số điện thoại không đúng định dạng.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Mật khẩu không được bỏ trống.",
            },
            {
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message:
                "Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ số, 1 chữ in hoa, 1 chữ thường.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Mã nhóm"
          name="maNhom"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Mã nhóm không được bỏ trống.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Loại người dùng"
          name="maLoaiNguoiDung"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Loại người dùng không được bỏ trống.",
            },
          ]}
        >
          <Select placeholder="Chọn loại người dùng">
            {userType?.map((ele) => {
              return (
                <Select.Option
                  key={ele.maLoaiNguoiDung}
                  value={ele.maLoaiNguoiDung}
                >
                  {ele.tenLoai}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

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
    </div>
  );
}
