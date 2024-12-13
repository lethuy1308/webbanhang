import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  InputBase,
  Link,

} from "@mui/material";
import { ShoppingBag, Person, Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {


  const isLogin = localStorage.getItem("isLogin") === "true";
  const navigate = useNavigate();
  const dangxuat = () => {
    localStorage.setItem("isLogin", "false");
    window.location.reload();
    navigate("/dangnhap");

  }
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#e3ded9", boxShadow: "none" }}
    >
      <Toolbar style={{ justifyContent: "space-between" }}>
        {/* Left Section */}
        <Box display="flex">
          <Button color="inherit" style={{ color: "#1a1a1a" }} onClick={() => navigate("/") }>
            HOME
          </Button>
          <Button color="inherit" style={{ color: "#1a1a1a" }}  onClick={() => navigate("/sanpham")}>
            ALL SHOP
          </Button>
          <Button color="inherit" style={{ color: "#1a1a1a" }}  onClick={() => navigate("/buy")}>
            Giỏ hàng
          </Button>
          <Button color="inherit" style={{ color: "#1a1a1a" }}  onClick={() => navigate("/order")}>
            Đơn hàng
          </Button>
          <Button color="inherit" style={{ color: "#1a1a1a" }}  onClick={() => navigate("/admin")}>
            Admin
          </Button>
          
        </Box>
        <Box>
          <Typography
            variant="body1"
            style={{
              color: "#1a1a1a", // Set color to black
              marginRight: "20px",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "Times New Roman",
              fontSize: "40px",
            }}
          >
            D.U.T
          </Typography>
        </Box>
        {/* Right Section */}
        <Box display="flex" alignItems="center">
          <InputBase
            placeholder="Tìm kiếm..."
            sx={{
              borderBottom: "1px solid black", // Set the border to black
              color: "black", // Set input text color to black
              padding: "0 10px",
              width: "200px",
              marginRight: "10px",
            }}
          />
          <IconButton
            color="inherit"
            sx={{ color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }} // Set icon color to black
          >
            <SearchIcon />
          </IconButton>
          {isLogin ? (
            <IconButton
              color="inherit"
              style={{ color: "#000" }}
              onClick={dangxuat}
            >
              <Person />
              <Typography
                variant="body2"
                style={{ marginRight: "10px", color: "#000" }}
              >
                Log Out
              </Typography>
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              style={{ color: "#000" }}
              onClick={() => navigate("/dangnhap")}
            >
              <Person />
              <Typography
                variant="body2"
                style={{ marginRight: "10px", color: "#000" }}
              >
                Log In
              </Typography>
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
