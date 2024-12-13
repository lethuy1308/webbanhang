import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";


function convertCategoryToQuery(categories) {
  if (categories.length === 0) return "";
  return categories
    .map((category, index) => {
      return `categoryId=${category}`;
    })
    .join("&");
}

const convertData = (payload) => {
  const _page = payload._page;
  const _limit = payload._limit;
  if (payload._categoryId) {
    const _categoryId = payload._categoryId;
    return `?categoryId=${_categoryId}`;
  } else {
    const category = payload.category;
    const newCategory = convertCategoryToQuery(category);
    return `?_page=${_page}&_limit=${_limit}&${newCategory}`;
  }
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (payload, thunkAPI) => {
    const query = convertData(payload);
    try {
      const response = await axiosClient.get(`/products${query}`);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const initialValue = {
    products: [],
    loading: false,
    category: [],
  };
  

export const ProductSlice = createSlice({
  name: "productSlice",
  initialState: initialValue,
  reducers: {
    addCategory: (state, action) => {
      state.category = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      console.log("Fetching users rejected. Error:", action.error.message);
    });
  },
});
export const { addCategory } = ProductSlice.actions;
export default ProductSlice.reducer;