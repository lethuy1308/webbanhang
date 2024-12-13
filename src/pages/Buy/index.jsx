import React, { useEffect } from "react";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { Box, Button } from "@mui/material";

import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { fetchCarts } from "../../stores/slices/cartSlices";
import axiosClient from "../../api/axiosClient";

const Buy = () => {
  const userId = localStorage.getItem("idUser");
  const isLogin = localStorage.getItem("isLogin") === "true";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId && !isLogin) {
      navigate("/dangnhap");
      return;
    }
    dispatch(fetchCarts(userId));
  }, [dispatch, userId, isLogin, navigate]);

  const carts = useSelector((state) => state.cartState.carts) || [];
  const shippingFee = 10;

  const deleteCartUser = async (carts) => {
    try {
      await Promise.all(
        carts.map(async (cart) => await axiosClient.delete(`/carts/${cart.id}`))
      );
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  const calculateTotalAmount = (carts) => {
    return carts.reduce((total, cart) => {
      const price = Number(cart.product.price);
      return total + price * cart.quantity;
    }, 0);
  };

  const totalAmount = calculateTotalAmount(carts);
  const finalTotal = totalAmount + shippingFee;

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      note: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Họ và tên là bắt buộc"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
      phone: Yup.string().required("Số điện thoại là bắt buộc"),
      address: Yup.string().required("Địa chỉ là bắt buộc"),
      note: Yup.string(),
    }),
    onSubmit: async (values) => {
      const orderData = {
        ...values,
        userId: userId,
        products: carts.map((cart) => ({
          img: cart.product.image,
          productId: cart.productId,
          quantity: cart.quantity,
          userId: cart.userId,
          nameProduct: cart.product.name,
        })),
        totalAmount: finalTotal,
        date: new Date().toISOString(),
        status: "chờ xác nhận ",
        dateUpdate: new Date().toISOString()
      };

      try {
        await axiosClient.post("/orders", orderData);
        await deleteCartUser(carts);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Bạn đã đặt hàng thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Lưu đơn không thành công! Vui lòng thử lại.",
        });
      }
    },
  });

  const renderCartItem = (cart) => {
    const price = Number(cart.product.price);

    return (
      <Box
        key={cart.id}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={cart.product.image}
            alt={cart.product.name}
            style={{
              borderRadius: "8px",
              marginRight: "16px",
              width: "50px",
              height: "50px",
            }}
          />
          <Typography variant="body1">{cart.product.name}</Typography>
        </Box>
        <Typography variant="body1">
          {cart.quantity} x {price.toFixed(3)} VND
        </Typography>
      </Box>
    );
  };

  return (
    <>
      <Header />
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={3}
          sx={{ marginTop: "100px", padding: "20px" }}
        >
          <Grid item xs={12} md={7}>
            <Paper sx={{ padding: "20px" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 3 }}
              >
                Thông Tin Giao Hàng
              </Typography>
              <TextField
                label="Họ và Tên"
                fullWidth
                sx={{ marginBottom: 2 }}
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Số điện thoại"
                    fullWidth
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Địa chỉ"
                fullWidth
                sx={{ marginBottom: 2 }}
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
              <TextField
                label="Ghi chú"
                fullWidth
                multiline
                rows={4}
                sx={{ marginBottom: 2 }}
                name="note"
                value={formik.values.note}
                onChange={formik.handleChange}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ padding: "20px", backgroundColor: "#f7f7f7" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Giỏ Hàng Của Bạn
              </Typography>

              {carts.map(renderCartItem)}

              <Box sx={{ marginTop: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Tạm tính:
                  </Typography>
                  <Typography variant="body1">
                    {Number(totalAmount).toFixed(3)} VND
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Phí vận chuyển:
                  </Typography>
                  <Typography variant="body1">
                    {Number(shippingFee).toFixed(3)} VND
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Tổng cộng:
                  </Typography>
                  <Typography variant="body1">
                    {Number(finalTotal).toFixed(3)} VND
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "right" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      width: "150px",
                      marginTop: 2,
                      alignSelf: "flex-end",
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid black",
                      },
                    }}
                  >
                    Đặt Hàng
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </form>
      <Footer />
    </>
  );
};

export default Buy;
