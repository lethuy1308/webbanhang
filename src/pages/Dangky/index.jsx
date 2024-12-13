import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { dangKiRequest } from "../../api/auth/auth.requestDangki";
import axiosClient from "../../api/axiosClient";
import Header from "../../layouts/Header";
import { useNavigate } from "react-router-dom";
import "./Dangky.css";
//import ảnh vào
import dangki from "../../images/dangky.jpg";

import Swal from "sweetalert2";
import Footer from "../../layouts/Footer";

const DangKy = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLogin") === "true";

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const formikDangKy = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Tên tài khoản là bắt buộc"),
      fullname: Yup.string().required("Họ và tên là bắt buộc"),
      email: Yup.string()
        .email("Địa chỉ email không hợp lệ")
        .required("Email là bắt buộc"),
      password: Yup.string().required("Mật khẩu là bắt buộc"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Mật khẩu không khớp")
        .required("Xác nhận mật khẩu là bắt buộc"),
    }),
    onSubmit: async (values) => {
      const result = await dangKiRequest(values);
      if (!result) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tài khoản đã tồn tại!",
        });
        return;
      }
      try {
        await axiosClient.post("/users", values);
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Đăng ký thành công!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/login");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Vui lòng thử lại sau!",
        });
      }
    },
  });

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="dangky-container">
          <div className="dangky-image">
            <img src={dangki} alt="Đăng ký" />
          </div>
          <div className="dangky-content">
            <form onSubmit={formikDangKy.handleSubmit} className="dangky-form">
              <h2>ĐĂNG KÝ</h2>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Tên tài khoản"
                margin="normal"
                onChange={formikDangKy.handleChange}
                onBlur={formikDangKy.handleBlur}
                value={formikDangKy.values.username}
                error={
                  formikDangKy.touched.username &&
                  Boolean(formikDangKy.errors.username)
                }
                helperText={
                  formikDangKy.touched.username && formikDangKy.errors.username
                }
              />
              <TextField
                fullWidth
                id="fullname"
                name="fullname"
                label="Họ và tên"
                margin="normal"
                onChange={formikDangKy.handleChange}
                onBlur={formikDangKy.handleBlur}
                value={formikDangKy.values.fullname}
                error={
                  formikDangKy.touched.fullname &&
                  Boolean(formikDangKy.errors.fullname)
                }
                helperText={
                  formikDangKy.touched.fullname && formikDangKy.errors.fullname
                }
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                margin="normal"
                onChange={formikDangKy.handleChange}
                onBlur={formikDangKy.handleBlur}
                value={formikDangKy.values.email}
                error={
                  formikDangKy.touched.email &&
                  Boolean(formikDangKy.errors.email)
                }
                helperText={
                  formikDangKy.touched.email && formikDangKy.errors.email
                }
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Mật khẩu"
                type="password"
                margin="normal"
                onChange={formikDangKy.handleChange}
                onBlur={formikDangKy.handleBlur}
                value={formikDangKy.values.password}
                error={
                  formikDangKy.touched.password &&
                  Boolean(formikDangKy.errors.password)
                }
                helperText={
                  formikDangKy.touched.password && formikDangKy.errors.password
                }
              />
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                type="password"
                margin="normal"
                onChange={formikDangKy.handleChange}
                onBlur={formikDangKy.handleBlur}
                value={formikDangKy.values.confirmPassword}
                error={
                  formikDangKy.touched.confirmPassword &&
                  Boolean(formikDangKy.errors.confirmPassword)
                }
                helperText={
                  formikDangKy.touched.confirmPassword &&
                  formikDangKy.errors.confirmPassword
                }
                sx={{ marginBottom: "20px" }}
              />
              <Button
                variant="contained"
                type="submit"
                className="dangky-button"
                sx={{
                  color: "white",
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "#898282" },
                }}
              >
                ĐĂNG KÝ
              </Button>
              <Typography variant="body2" sx={{ mt: 3 }}>
                Bạn đã có tài khoản?{" "}
                <a href="/dangnhap" style={{ textDecoration: "none" }}>
                  Đăng nhập ngay
                </a>
              </Typography>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DangKy;
