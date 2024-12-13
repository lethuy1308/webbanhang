import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Pagination,
  TableHead,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import axiosClient from "../../api/axiosClient";
import { fetchOrders } from "../../stores/slices/orderSlice";

const AdminOrder = () => {
  const [page, setPage] = useState(1);
  const limit = 12;
  const dispatch = useDispatch();
 const isLogin = localStorage.getItem("isLogin") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLogin){
      navigate("/dangnhap");
    }
    dispatch(fetchOrders());
  }, [dispatch]);

  const { orders, loading } = useSelector((state) => state.orderState);
  console.log("🚀 ~ AdminOrder ~ orders:", orders);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Bạn sẽ không thể khôi phục lại đơn hàng này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, xóa nó!",
    });

    if (result.isConfirmed) {
      try {
        await axiosClient.delete(`/orders/${id}`);
        Swal.fire("Đã xóa!", "Đơn hàng đã được xóa thành công.", "success");
        dispatch(fetchOrders());
      } catch (error) {
        console.log(error);
        Swal.fire("Lỗi!", "Có lỗi xảy ra khi xóa đơn hàng.", "error");
      }
    }
  };

  const verifyOrder = async (id) => {
    try {
      const response = await axiosClient.get(`/orders/${id}`);
      const currentOrder = response;
      const updatedOrder = {
        ...currentOrder,
        status: "Đã xác nhận",
        dateUpdate: new Date().toISOString(),
      };
      await axiosClient.put(`/orders/${id}`, updatedOrder);

      await Swal.fire({
        title: "Thành công!",
        text: "Đơn hàng đã được xác nhận thành công.",
        icon: "success",
        timer: 1500,
      });
      dispatch(fetchOrders());
    } catch (error) {
      console.error("Error verifying order:", error);
      await Swal.fire({
        title: "Lỗi!",
        text: "Không thể xác nhận đơn hàng.",
        icon: "error",
      });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flex: 1, paddingTop: "102px" }}>
        <Box sx={{ flex: "1", padding: "0 30px" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "center",
              mx: "auto",
              fontWeight: "bold",
              fontFamily: "monospace",
              padding: "20px 0",
            }}
          >
            Quản lý đơn hàng
          </Typography>

          {loading ? (
            <Typography variant="h6">Đang tải...</Typography>
          ) : orders && orders.length > 0 ? (
            <TableContainer
              component={Paper}
              sx={{ boxShadow: 3, borderRadius: "8px" }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#092441", color: "white" }}>
                    <TableCell
                      sx={{ fontWeight: "bold", color: "white", width: "10%" }}
                    >
                      Mã đơn hàng
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      Thông tin người dùng
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      Sản phẩm
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      Ngày đặt
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      Trạng thái
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      Ngày xác nhận
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      Tổng tiền
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order.id}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                    >
                      <TableCell>{order.id}</TableCell>
                      <TableCell>
                        Họ tên: {order.fullName} <br />
                        Email: {order.email} <br />
                        Số điện thoại: {order.phone} <br />
                        Địa chỉ: {order.address} <br />
                        {order.note
                          ? `Ghi chú: ${order.note}`
                          : "Ghi chú: Không có"}
                      </TableCell>
                      <TableCell>
                        {order.products.map((product, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "8px",
                              padding: "8px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {product.img && (
                              <img
                                src={product.img}
                                alt={`Sản phẩm ID: ${product.productId}`}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  marginRight: "10px",
                                  borderRadius: "4px",
                                  boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                                }}
                              />
                            )}
                            <Typography sx={{ marginRight: "8px" }}>
                              {product.nameProduct}
                            </Typography>
                            <Typography>X{product.quantity}</Typography>
                          </Box>
                        ))}
                      </TableCell>
                      <TableCell>
                        {moment(order.date).format("DD/MM/YYYY HH:mm:ss")}
                      </TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        {order.dateUpdate && order.status === "Đã xác nhận"
                          ? moment(new Date(order.dateUpdate)).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )
                          : "Chưa xác nhận"}
                      </TableCell>
                      <TableCell>
                        {order.totalAmount} VND
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <IconButton
                            onClick={() => verifyOrder(order.id.toString())}
                            sx={{
                              color: "#4CAF50",
                              backgroundColor: "rgba(76, 175, 80, 0.1)",
                              padding: "8px",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: "rgba(76, 175, 80, 0.2)",
                                transform: "scale(1.05)",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              },
                              "&:active": {
                                transform: "scale(0.95)",
                              },
                            }}
                          >
                            <CheckCircleOutlineIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(order.id.toString())}
                            sx={{
                              color: "#fff",
                              backgroundColor: "#f44336",
                              padding: "8px",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: "#d32f2f",
                                transform: "scale(1.05)",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              },
                              "&:active": {
                                transform: "scale(0.95)",
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="h6">Không tìm thấy đơn hàng nào.</Typography>
          )}

          <Stack spacing={2} sx={{ margin: "20px 0", alignItems: "center" }}>
            <Pagination
              page={page}
              count={Math.ceil((orders?.length || 0) / limit)}
              variant="outlined"
              shape="rounded"
              onChange={(event, value) => setPage(value)}
              sx={{
                "& .MuiPaginationItem-root": {
                  height: "30px",
                  borderRadius: 0,
                  border: "1px solid black",
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                },
              }}
            />
          </Stack>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminOrder;
