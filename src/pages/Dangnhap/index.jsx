import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import Header from "../../layouts/Header";
import { useNavigate } from "react-router-dom";
import "./Dangnhap.css";
import { login } from "../../stores/slices/userSlice";
import dangki from "../../images/dangky.jpg";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
import Footer from "../../layouts/Footer";
import LoginRequest from "../../api/auth/auth.requestDangnhap";



const Dangnhap = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLogin") === "true";

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); 
    }
  }, [isLoggedIn, navigate]);

  const formikDangNhap = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Địa chỉ email không hợp lệ").required("Email là bắt buộc"),
      password: Yup.string().required("Mật khẩu là bắt buộc"),
    }),
    onSubmit: async (values) => {
      const result = await LoginRequest(values);
      if (!result) {
        localStorage.setItem("isLogin", "false");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tài khoản hoặc mật khẩu không chính xác!!",
        });
        return;
      }
      const { id, email, token, role } = result;
      dispatch(login({ id, email, token, role }));
      localStorage.setItem('idUser', id);
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("userRole", role);
      Swal.fire({
        icon: "success",
        title: "Thành công!",
        text: "Đăng nhập thành công!",
      });
      navigate("/");
    },
  });

  return (
    <>
      <Header />
      <div className="container-dang-nhap">
        <div className="anh-dang-nhap">
          <img src={dangki} alt="Hình ảnh đăng ký" />
        </div>
        <div className="noi-dung-dang-nhap">
          <form className="form-dang-nhap" onSubmit={formikDangNhap.handleSubmit}>
            <h2 style={{ fontFamily: "sans-serif", textAlign: "center" }}>ĐĂNG NHẬP</h2>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              margin="normal"
              onChange={formikDangNhap.handleChange}
              onBlur={formikDangNhap.handleBlur}
              value={formikDangNhap.values.email}
              error={formikDangNhap.touched.email && Boolean(formikDangNhap.errors.email)}
              helperText={formikDangNhap.touched.email && formikDangNhap.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Mật khẩu"
type="password"
              margin="normal"
              onChange={formikDangNhap.handleChange}
              onBlur={formikDangNhap.handleBlur}
              value={formikDangNhap.values.password}
              error={formikDangNhap.touched.password && Boolean(formikDangNhap.errors.password)}
              helperText={formikDangNhap.touched.password && formikDangNhap.errors.password}
              sx={{ marginBottom: "20px" }}
            />
            <Button
              variant="contained"
              type="submit"
              className="button-dang-nhap"
              sx={{
                color: "white",
                backgroundColor: "black",
                "&:hover": { backgroundColor: "#898282" },
              }}
            >
              Đăng nhập
            </Button>
            <Typography variant="body2" sx={{ mt: 3 }}>
              Bạn chưa có tài khoản?{" "}
              <a href="/dangky" style={{ textDecoration: "none" }}>
                Tạo tài khoản
              </a>
            </Typography>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dangnhap;