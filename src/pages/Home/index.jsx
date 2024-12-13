import React from "react";
import Header from "../../layouts/Header";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Footer from "../../layouts/Footer";

const Home = () => {
  const items1 = [
    {
      title: "BÁNH GẠO LỨT ĐẬU ĐỎ",
      price: "53.000 VND",
      image:
        "https://vn-live-01.slatic.net/p/cc083d1ad0a1bd59185f058e1f246cbd.jpg",
    },
    {
      title: "NƯỚC ÉP CẦN TÂY",
      price: "20.000 VND",
      image:
        "https://rcc.vn/wp-content/uploads/2021/01/nuoc-ep-can-tay-loai-thuc-uong-healthy-bo-duong-nuoc-ep-can-tay-5.jpg",
    },
    {
      title: "BÁNH HẠT DINH DƯỠNG",
      price: "68.000 VND",
      image:
        "https://healthyfarm.com.vn/wp-content/uploads/2023/04/Banh-Hat.jpg",
    },
    {
      title: "DETOX NHÀ LÀM",
      price: "35.000 VND",
      image:
        "https://nvhphunu.vn/wp-content/uploads/2023/12/Hoc-Pha-Che-Do-Uong-Healthy-Kham-pha-lop-day-pha-che.jpeg",
    },
  ];

  const items2 = [
    {
      title: "TRÁI CÂY SẤY KHÔ HEALTHY",
      price: "55.000 VND",
      image:
        "https://salt.tikicdn.com/cache/w1200/ts/product/a0/15/d5/e4debaacaeac46f8c68184ce71597a54.png",
    },
    {
      title: "BÁNH QUY MIX HẠT DINH DƯỠNG",
      price: "59.000 VND",
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lpxghi7klv4ic5",
    },
    {
      title: "SỮA HẠT",
      price: "20.000 VND",
      image:
        "https://file.hstatic.net/1000357530/article/dong_gia_sua_hat-01_8c1007ea96254ad7a757632d5e0f7fcf.jpg ",
    },
    {
      title: "SỮA CHUA",
      price: "13.000 VND",
      image:
        "https://viethealthy.com/images/Uploads/sp_suachuahylap_1kg.jpg",
    },
  ];
 

  return (
    <>
      <Header />
      <div>
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            position: "relative",
          }}
        >
          <Grid container sx={{ height: "100vh", width: "100vw" }}>
            {/* Cột bên trái chứa ảnh nước*/}
            <Grid item xs={6}>
              <Box
                component="img"
                src="https://th.bing.com/th/id/OIP.cFJ2jl1kzvE94dIzuwp40AHaHa?rs=1&pid=ImgDetMain"
                alt="Flower Vase"
                sx={{
                  width: "100%",
                  height: "100vh",
                  objectFit: "cover",
                }}
              />
            </Grid>

            {/* Cột bên phải chứa ảnh thức ăn */}
            <Grid item xs={6}>
              <Box
                component="img"
                src="https://danang.plus/wp-content/uploads/2021/06/koko.jpg"
                alt="Ceramic Pots"
                sx={{
                  width: "100%",
                  height: "100vh",
                  objectFit: "cover",
                }}
              />
            </Grid>

            {/* Văn bản NƯỚC UỐNG & THỨC ĂN đặt chính giữa */}
            <Box
              sx={{
                position: "absolute",
                textAlign: "center",
                zIndex: 1,
                color: "black",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                padding: "10px 20px",
                borderRadius: "5px",
                whiteSpace: "nowrap",
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{ letterSpacing: "2px", fontWeight: "bold" }}
              >
                NƯỚC UỐNG & THỨC ĂN
              </Typography>
            </Box>
          </Grid>
        </Box>

        {/* Section for the new items */}
        <Box component={"section"} sx={{ padding: "35px 0" }}>
          <Typography variant="h4" align="left" gutterBottom>
            BEST SELLERS
          </Typography>
        
          <Grid container spacing={4}>
            {items1.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    transition: "transform 0.3s, box-shadow 0.3s", // Transition effect
                    "&:hover": {
                      transform: "scale(1.05)", // Scale up on hover
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Shadow effect on hover
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={item.title}
                    height="250"
                    image={item.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ width: "100vw", height: "100vh" }}>
          <Grid container sx={{ width: "100%", height: "100%" }}>
            {/* Left Section with Teapot */}
            <Grid item xs={6}>
              <Box
                component="img"
                src="https://media.istockphoto.com/id/1457433817/vi/anh/nh%C3%B3m-th%E1%BB%B1c-ph%E1%BA%A9m-l%C3%A0nh-m%E1%BA%A1nh-cho-ch%E1%BA%BF-%C4%91%E1%BB%99-%C4%83n-u%E1%BB%91ng-linh-ho%E1%BA%A1t.jpg?s=612x612&w=0&k=20&c=zU_6MNK-Nt9uddS9IrycJ7lgJvTNv44t_jz5QEm-rSI="
                alt="Teapot and Cups"
                sx={{
                  width: "100%",
                  height: "100vh",
                  objectFit: "cover",
                }}
              />
            </Grid>

            {/* Right Section with Accessories Text */}
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src="https://m1jjn.com/wp-content/uploads/2021/12/the-healthy-life.jpg"
                  alt="Accessories Vase"
                  sx={{
                    width: "100%",
                    height: "100vh",
                    objectFit: "cover",
                  }}
                />
                {/* Overlay Text */}
                <Box
                  sx={{
                    position: "absolute",
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  <Typography variant="h2" component="h1" sx={{ fontWeight: "bold" }}>
                    HEALTHY
                  </Typography>
                  <Typography variant="body1" component="p" sx={{ letterSpacing: "1px" }}>
                    Ăn và giảm cân là điều tôi thích
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      <Box>
        {/* Section for the new items */}
        <Box component={"section"} sx={{ padding: "35px 0" }}>
          <Typography variant="h4" align="left" gutterBottom>
            SẢN PHẨM YÊU THÍCH
          </Typography>
        
          <Grid container spacing={4}>
            {items2.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    transition: "transform 0.3s, box-shadow 0.3s", // Transition effect
                    "&:hover": {
                      transform: "scale(1.05)", // Scale up on hover
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Shadow effect on hover
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={item.title}
                    height="250"
                    image={item.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

    
      </div>
      <Footer/>
    </>
  );
};

export default Home;
