import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const fetchCarts = createAsyncThunk(
  'cart/fetchCarts', 
  async (userId, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/carts?_expand=product&userId=${userId}&_expand=user`);
      return response; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  }
);

const initialState = {
  carts: [], 
  loading: false,
};

export const CartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.carts = action.payload;
      state.loading = false; 
    },
    buy(state, action) {
      const existingCartItem = state.carts.find(
        (item) => item.productId === action.payload.productId 
      );
      
      if (existingCartItem && existingCartItem.quantity > 0) {
        existingCartItem.quantity -= 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCarts.fulfilled, (state, action) => {
      state.loading = false; 
      state.carts = action.payload; 
    });
    builder.addCase(fetchCarts.rejected, (state, action) => {
      state.loading = false; 
      console.error("Fetching carts rejected. Error:", action.error.message);
    });
  },
});

// Export actions and reducer
export const { setProducts, buy } = CartSlice.actions;
export default CartSlice.reducer;