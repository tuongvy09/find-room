import {
  ArrowForward,
  Email,
  Facebook,
  Info,
  Instagram,
  LinkedIn,
  LocationOn,
  MailOutline,
  NewReleases,
  Phone,
  Policy,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <Box className="footer">
      <Box className="footer-logo-description">
        <Typography variant="h6" className="footer-logo">
          PHÒNG TRỌ XINH
        </Typography>
        <Typography variant="body2" className="footer-description">
          Tìm phòng trọ chưa bao giờ dễ dàng đến thế! Hãy đến với Phòng trọ xinh
          - vô vàn thông tin hữu ích được mang lại.
        </Typography>
        <Box className="footer-social">
          <Button
            className="social-button"
            startIcon={
              <Facebook style={{ color: "#4caf50", fontSize: "50px" }} />
            }
          ></Button>
          <Button
            className="social-button"
            startIcon={
              <Instagram style={{ color: "#4caf50", fontSize: "50px" }} />
            }
          ></Button>
          <Button
            className="social-button"
            startIcon={
              <LinkedIn style={{ color: "#4caf50", fontSize: "50px" }} />
            }
          ></Button>
        </Box>
      </Box>

      <Box className="footer-links">
        <Typography variant="h6">Liên kết</Typography>
        <Box className="footer-link-item">
          <Info style={{ color: "#4caf50", marginRight: "10px" }} />
          <Typography variant="body2">Về chúng tôi</Typography>
        </Box>
        <Box className="footer-link-item" onClick={() => window.open("/TinTuc")}>
          <NewReleases style={{ color: "#4caf50", marginRight: "10px" }} />
          <Typography variant="body2">Tin tức mới</Typography>
        </Box>
        <Box className="footer-link-item">
          <Policy style={{ color: "#4caf50", marginRight: "10px" }} />
          <Typography variant="body2">Điều khoản chính sách</Typography>
        </Box>
      </Box>

      <Box className="footer-newsletter">
        <Typography variant="h6">Bản tin</Typography>
        <Typography variant="body2">
          🏡 Đăng ký ngay để nâng cao trải nghiệm tìm phòng trọ nào 😎
        </Typography>
        <Button onClick={() => window.open("/register")} endIcon={<ArrowForward />} className="newsletter-button">
          Đăng ký
        </Button>
        <Box className="newsletter-icon">
          <MailOutline fontSize="large" style={{ color: "#4caf50" }} />
        </Box>
      </Box>

      <Box className="footer-contact">
        <Typography variant="h6">Liên hệ</Typography>
        <Typography variant="body2">
          <Phone style={{ color: "#4caf50" }} />{" "}
          <a href="tel:+840313728397" className="home-link-phone">
            (+84) 0313-728-397
          </a>
        </Typography>
        <Typography variant="body2">
          <Email style={{ color: "#4caf50" }} /> PhongTroXinh@gmail.com
        </Typography>
        <Typography variant="body2">
          <LocationOn style={{ color: "#4caf50" }} /> 01 Đ. Võ Văn Ngân, Linh
          Chiểu, Thủ Đức, Hồ Chí Minh
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
