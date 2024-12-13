import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "40px 0",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* SHOP Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              SHOP
            </Typography>
            <Box>
              <Link href="#" underline="hover" color="inherit" display="block">
                ALL SHOP
              </Link>
              <Link href="#" underline="hover" color="inherit" display="block">
                ĐỒ ĂN
              </Link>
              <Link href="#" underline="hover" color="inherit" display="block">
                NƯỚC UỐNG
              </Link>
            
            </Box>
          </Grid>

          {/* HELPFUL LINKS Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              LIÊN KẾT HỮU ÍCH
            </Typography>
            <Box>
              <Link href="#" underline="hover" color="inherit" display="block">
                Chính sách vận chuyển
              </Link>
              <Link href="#" underline="hover" color="inherit" display="block">
                Chính sách hoàn tiền
              </Link>
              <Link href="#" underline="hover" color="inherit" display="block">
                Chính sách thanh toán
              </Link>
             
            </Box>
          </Grid>

          {/* CONTACT US Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              LIÊN HỆ
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Địa chỉ: 138 Nguyễn Văn Linh <br />
              Số điện thoại: 028-413-8951 <br />
              Email: dut@gmail.com
    
            </Typography>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box
          mt={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Terms & Conditions / Privacy Policy */}
          <Box>
            <Link href="#" underline="hover" color="inherit" mr={2}>
              Điều khoản & điều kiện
            </Link> <br />
            <Link href="#" underline="hover" color="inherit">
              Chính sách bảo mật
            </Link>
          </Box>

          {/* Social Icons */}
          <Box>
            <IconButton href="#" aria-label="Facebook" color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton href="#" aria-label="Instagram" color="inherit">
              <InstagramIcon />
            </IconButton>
            <IconButton href="#" aria-label="Twitter" color="inherit">
              <TwitterIcon />
            </IconButton>
            <IconButton href="#" aria-label="LinkedIn" color="inherit">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>

        
      </Container>
    </Box>
  );
};

export default Footer;
