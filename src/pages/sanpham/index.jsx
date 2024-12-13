import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import {
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Footer from "../../layouts/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../stores/slices/productSlice";
import { Link } from "react-router-dom";

const Sanpham = () => {
    const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productState.products);
  useEffect(() => {
    const payload = {
      page: 1,
      _limit: 12,
      category:[],
    
    };
    dispatch(fetchProducts(payload));
  },[dispatch])
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginBottom: "40px",
        }}
      >
        
        <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ textAlign:"center", padding:"30px" ,fontSize:"35px"}}>
              SẢN PHẨM
            </Typography>
          

          <Grid container>
            {productList.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={0} sx={{ position: "relative" }}>
                    <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: "none" ,color:"black"}}>
                  <CardMedia
                    component="img"
                    height="380px"
                    image={product.image}
                    alt={product.name}
                  />
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      color: "black",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    {product.label}
                  </Typography>
                  <CardContent style={{ textAlign: "left" }}>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      style={{ marginTop: "10px" }}
                    >
                      {product.price}0 VND
                    </Typography>
                  </CardContent>
                  </Link>
                </Card>
               
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Sanpham;