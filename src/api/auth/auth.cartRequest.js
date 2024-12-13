import axiosClient from "../axiosClient";

export const cartsRequest = async ({ productId, quantity, userId }) => {
  try {
    console.log('Cart request data:', { productId, quantity, userId });
    const response = await axiosClient.post("/carts", {
      productId,
      quantity,
      userId,
    });

    return response;
  } catch (error) {
    console.error("Error in cartsRequest:", error);
    throw error;
  }
};