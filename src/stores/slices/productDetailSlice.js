import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id, thunkAPI) => {
      const query = `?id=${id}`;
      try {
        const response = await axiosClient.get(`/products${query}`);
        return response;
      } catch (error) {
        return error;
      }
    }
);

const initialValue = {
    loading: false,
    productDetail: null,
  };
  

const detailSlice = createSlice({
    name: "productDetailSlice",
    initialState: initialValue,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProductById.pending, (state) => {
          state.loading = true; // Set loading to true when the request starts
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
          state.loading = false; // Set loading to false when the request completes successfully
          state.productDetail = action.payload; // Store the details of the fetched product
        })
        .addCase(fetchProductById.rejected, (state) => {
          state.loading = false; // Set loading to false on error
          console.error("Failed to fetch product detail"); // Log the error
        });
    },
  });
  
  export default detailSlice.reducer;