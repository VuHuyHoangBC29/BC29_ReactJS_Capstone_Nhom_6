import React, { useRef, useState } from "react";
import { useEffect } from "react";
import {
  addUserApi,
  deleteUserApi,
  fetchAccountInfoApi,
  fetchUserInfoApi,
  fetchUserListApi,
} from "../../services/user";
import { Button, Modal, notification } from "antd";
import { useNavigate, Link } from "react-router-dom";
import UserTable from "modules/user-table/user-table";

export default function UserManagement() {
  return (
    <div>
      <UserTable />
    </div>
  );
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const navigate = useNavigate();

  // const formRef = useRef();

  // const [state, setState] = useState({
  //   values: {
  //     taiKhoan: "",
  //     matKhau: "",
  //     email: "",
  //     soDt: "",
  //     maNhom: "",
  //     maLoaiNguoiDung: "",
  //     hoTen: "",
  //   },
  //   errors: {
  //     taiKhoan: "",
  //     matKhau: "",
  //     email: "",
  //     soDt: "",
  //     maNhom: "",
  //     maLoaiNguoiDung: "",
  //     hoTen: "",
  //   },
  // });

  // const [userList, setUserList] = useState();

  // useEffect(() => {
  //   fetchUserList();
  // }, []);

  // const fetchUserList = async () => {
  //   const result = await fetchUserListApi();
  //   setUserList(result.data.content);
  // };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   setState({
  //     ...state,
  //     values: { ...state.values, [name]: value },
  //   });
  // };

  // const handleBlur = (event) => {
  //   const {
  //     name,
  //     value,
  //     title,
  //     minLength,
  //     maxLength,
  //     validity: { valueMissing, patternMismatch, tooLong, tooShort },
  //   } = event.target;

  //   let message = "";

  //   if (patternMismatch) {
  //     message = `${title} không đúng định dạng.`;
  //   }

  //   if (tooShort || tooLong) {
  //     message = `${title} phải nằm trong khoảng ${minLength} - ${maxLength} ký tự.`;
  //   }

  //   if (valueMissing) {
  //     message = `${title} không thể bỏ trống.`;
  //   }

  //   setState({
  //     ...state,
  //     errors: {
  //       ...state.errors,
  //       [name]: message,
  //     },
  //   });
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!event.target.checkValidity()) {
  //     return;
  //   }

  //   try {
  //     await addUserApi(state.values);
  //     notification.success({ message: "Thêm người dùng thành công!" });
  //     navigate("/admin");
  //   } catch (errors) {
  //     notification.warning({ message: errors.response.data.content });
  //   }

  //   console.log(state.values);
  // };

  // const deleteUser = async (taiKhoan) => {
  //   try {
  //     await deleteUserApi(taiKhoan);
  //     notification.success({ message: "Xóa người dùng thành công!" });
  //     navigate("/admin");
  //   } catch (errors) {
  //     console.log(errors.response);
  //     notification.warning({ message: errors.response.data.content });
  //   }
  // };

  // const userInfo = async (taiKhoan) => {
  //   const result = await fetchUserInfoApi(taiKhoan);
  //   console.log(result);
  // };

  // const [selectedUser, setSelectedUser] = useState({});

  // console.log(selectedUser);

  // const handleSelectedUser = (user) => {
  //   setSelectedUser({
  //     user,
  //   });
  //   console.log(selectedUser);
  // };

  // // const accountInfo = async () => {
  // //   const result = await fetchAccountInfoApi();
  // //   console.log(result);
  // // };

  // const renderContent = () => {
  //   return userList?.map((ele) => {
  //     return (
  //       <tr key={ele.taiKhoan}>
  //         <td>{ele.taiKhoan}</td>
  //         <td>{ele.hoTen}</td>
  //         <td>{ele.email}</td>
  //         <td>{ele.soDT}</td>
  //         <td>{ele.maLoaiNguoiDung}</td>
  //         <td>
  //           <button
  //             onClick={() => handleSelectedUser(ele)}
  //             className="btn btn-warning mr-1"
  //           >
  //             <i className="fa-solid fa-pen-to-square"></i>
  //           </button>
  //           <button
  //             onClick={() => deleteUser(ele.taiKhoan)}
  //             className="btn btn-danger"
  //           >
  //             <i className="fa-solid fa-trash"></i>
  //           </button>
  //         </td>
  //       </tr>
  //     );
  //   });
  // };

  // return (
  //   <div>
  //     <Button type="primary" onClick={showModal}>
  //       Thêm người dùng
  //     </Button>
  //     <table className="table table-bordered mt-3">
  //       <thead>
  //         <tr style={{ color: "#007bff", fontSize: 20 }}>
  //           <th>Tài khoản</th>
  //           <th>Họ tên</th>
  //           <th>Email</th>
  //           <th>Số điện thoại</th>
  //           <th>Loại </th>
  //           <th>Hành động</th>
  //         </tr>
  //       </thead>
  //       <tbody>{renderContent()}</tbody>
  //     </table>
  //     <Modal
  //       title="Thêm người dùng"
  //       visible={isModalVisible}
  //       onOk={handleOk}
  //       onCancel={handleCancel}
  //       footer={null}
  //     >
  //       <div className="w-100 mx-auto">
  //         <div>
  //           <div className="card-body">
  //             <form ref={formRef} noValidate onSubmit={handleSubmit}>
  //               <div className="row">
  //                 <div className="col-12">
  //                   <div className="form-group">
  //                     <label>Tài khoản</label>
  //                     <input
  //                       title="Tài khoản"
  //                       required
  //                       minLength={5}
  //                       maxLength={20}
  //                       type="text"
  //                       name="taiKhoan"
  //                       className="form-control"
  //                       onChange={handleChange}
  //                       onBlur={handleBlur}
  //                     />
  //                     {state.errors.taiKhoan && (
  //                       <span className="text-danger">
  //                         {state.errors.taiKhoan}
  //                       </span>
  //                     )}
  //                   </div>
  //                 </div>
  //                 <div className="col-12">
  //                   <div className="form-group">
  //                     <label>Họ tên</label>
  //                     <input
  //                       title="Họ tên"
  //                       required
  //                       minLength={3}
  //                       maxLength={20}
  //                       name="hoTen"
  //                       type="text"
  //                       className="form-control"
  //                       pattern='^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
  //             "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
  //             "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
  //                       onChange={handleChange}
  //                       onBlur={handleBlur}
  //                     />
  //                     {state.errors.hoTen && (
  //                       <span className="text-danger">
  //                         {state.errors.hoTen}
  //                       </span>
  //                     )}
  //                   </div>
  //                 </div>
  //                 <div className="col-12">
  //                   <div className="form-group">
  //                     <label>Mật khẩu</label>
  //                     <input
  //                       title="Mật khẩu"
  //                       required
  //                       name="matKhau"
  //                       type="text"
  //                       className="form-control"
  //                       onChange={handleChange}
  //                       onBlur={handleBlur}
  //                     />
  //                     {state.errors.matKhau && (
  //                       <span className="text-danger">
  //                         {state.errors.matKhau}
  //                       </span>
  //                     )}
  //                   </div>
  //                 </div>
  //                 <div className="col-12">
  //                   <div className="form-group">
  //                     <label>Số điện thoại:</label>
  //                     <input
  //                       required
  //                       title="Số điện thoại"
  //                       name="soDt"
  //                       type="text"
  //                       className="form-control"
  //                       pattern="^[0-9]+$"
  //                       onChange={handleChange}
  //                       onBlur={handleBlur}
  //                     />
  //                     {state.errors.soDt && (
  //                       <span className="text-danger">{state.errors.soDt}</span>
  //                     )}
  //                   </div>
  //                 </div>
  //                 <div className="col-12">
  //                   <div className="form-group">
  //                     <label>Email</label>
  //                     <input
  //                       required
  //                       name="email"
  //                       title="Email"
  //                       type="text"
  //                       pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
  //                       className="form-control"
  //                       onChange={handleChange}
  //                       onBlur={handleBlur}
  //                     />
  //                     {state.errors.email && (
  //                       <span className="text-danger">
  //                         {state.errors.email}
  //                       </span>
  //                     )}
  //                   </div>
  //                 </div>
  //                 <div className="col-12">
  //                   <div className="form-group">
  //                     <label>Mã nhóm</label>
  //                     <input
  //                       required
  //                       title="Mã nhóm"
  //                       name="maNhom"
  //                       className="form-control"
  //                       onChange={handleChange}
  //                       onBlur={handleBlur}
  //                     />
  //                     {state.errors.maNhom && (
  //                       <span className="text-danger">
  //                         {state.errors.maNhom}
  //                       </span>
  //                     )}
  //                   </div>
  //                 </div>
  //                 <div className="col-12">
  //                   <div className="form-group">
  //                     <label>Mã loại người dùng</label>
  //                     <select
  //                       required
  //                       title="Mã loại người dùng"
  //                       name="maLoaiNguoiDung"
  //                       className="form-control"
  //                       onChange={handleChange}
  //                       onBlur={handleBlur}
  //                     >
  //                       <option value="QuanTri">Quản trị</option>
  //                       <option value="KhachHang">Khách Hàng</option>
  //                     </select>
  //                     {state.errors.maLoaiNguoiDung && (
  //                       <span className="text-danger">
  //                         {state.errors.maLoaiNguoiDung}
  //                       </span>
  //                     )}
  //                   </div>
  //                 </div>
  //               </div>
  //               <button
  //                 disabled={!formRef.current?.checkValidity()}
  //                 className="btn btn-success mr-2"
  //                 type="submit"
  //               >
  //                 Thêm
  //               </button>
  //               <button type="reset" className="btn btn-outline-dark mr-2">
  //                 RESET
  //               </button>
  //               <Button type="primary" danger onClick={handleCancel}>
  //                 Hủy
  //               </Button>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </Modal>
  //   </div>
  // );
}
