import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// Tạo asyncThunk để fetch lịch sử đơn hàng
export const fetchOrderHistory = createAsyncThunk(
  "orderHistory/fetchOrderHistory",
  async (userId, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/orders?userId=${userId}`);
      return response; // Đảm bảo chỉ trả về dữ liệu cần thiết
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Đã xảy ra lỗi");
    }
  }
);

// Khởi tạo state cho lịch sử đơn hàng
const initialState = {
  orders: [], // Danh sách đơn hàng
  loading: false, // Trạng thái tải dữ liệu
};

// Tạo slice cho lịch sử đơn hàng
const orderHistorySlice = createSlice({
  name: "orderHistorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Gán dữ liệu từ payload vào state.orders
      })
      .addCase(fetchOrderHistory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderHistorySlice.reducer;