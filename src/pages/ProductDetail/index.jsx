import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  Rating,
  CircularProgress,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Swal from "sweetalert2";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { cartsRequest } from "../../api/auth/auth.cartRequest";
import { fetchCarts } from "../../stores/slices/cartSlices";
import { fetchProductById } from "../../stores/slices/productDetailSlice";



const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const productDetail = useSelector(
    (state) => state.productDetailState.productDetail
  );
  const product = Array.isArray(productDetail)
    ? productDetail[0]
    : productDetail;

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddCart = async () => {
    try {
      const userId = localStorage.getItem("idUser");

      if (!userId) {
        Swal.fire({
          icon: "warning",
          title: "Please Login",
          text: "You need to login to add items to cart",
        });
        navigate("/dangnhap");
        return;
      }

      if (!product || !product.id) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Product information is missing",
        });
        return;
      }

      console.log("Adding to cart:", {
        productId: product.id,
        quantity,
        userId,
      });

      const result = await cartsRequest({
        productId: product.id,
        quantity,
        userId,
      });

      if (result) {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Sản phẩm đã được thêm vào giỏ hàng",
        });
        dispatch(fetchCarts(userId));
      } else {
        throw new Error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add item to cart. Please try again.",
      });
    }
  };

  if (!product) {
    return (
      <>
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ padding: "70px 40px", marginBottom: "40px" }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ paddingTop: "109px" }}
        >
          <Grid item xs={12} sm={6}>
            <Card
              sx={{ borderRadius: 3, position: "relative", overflow: "hidden" }}
            >
              <CardMedia
                component="img"
                height="400"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: "contain", maxWidth: "100%", height: "400" }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "24px",
                color: "rgb(var(--color_15))",
                letterSpacing: "0.05em",
              }}
            >
              {product.name}
            </Typography>

            <Rating
              name="read-only"
              value={product.rating || 4.5}
              precision={0.5}
              readOnly
              sx={{ color: "red", paddingTop: "10px" }}
            />

            <Typography variant="caption" color="textSecondary">
              {product.reviewCount || 10}
            </Typography>

            <Typography
              variant="body2"
              mt={2}
              color="textSecondary"
              fontSize={{ fontSize: "18px" }}
            >
              Price: {product.price} VND
            </Typography>

            <Typography
              variant="caption"
              color="textSecondary"
              mt={3}
              sx={{ fontSize: "14px" }}
            >
              {product.description}
            </Typography>

            <Typography variant="subtitle1" mt={2}>
              Số lượng:
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity <= 1}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1" mx={2}>
                {quantity}
              </Typography>
              <IconButton onClick={() => handleQuantityChange("increase")}>
                <AddIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item>
                <Button
                  onClick={handleAddCart}
                  variant="outlined"
                  sx={{
                    backgroundColor: "black",
                    border: "1px solid black",
                    color: "white",
                    padding: "7px 90px",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid black",
                    },
                  }}
                >
                  <AddShoppingCartIcon sx={{ marginRight: "10px" }} />
                  Thêm vào giỏ hàng
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default ProductDetail;
