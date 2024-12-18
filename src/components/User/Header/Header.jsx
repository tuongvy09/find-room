import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../../createInstance";
import { logout } from "../../../redux/apiRequest";
import { logoutSuccess } from "../../../redux/authSlice";
import Notification from "../Notification/Notification";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsMenuAnchorEl, setNotificationsMenuAnchorEl] =
    useState(null);
  const [notifications, setNotifications] = useState([]);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const accessToken = currentUser?.accessToken;
  const id = currentUser?._id;
  const axiosJWT = createAxios(currentUser, dispatch, logoutSuccess);
  const [unreadCount, setUnreadCount] = useState(0);

  const notificationsList = currentUser?.notifications || [];
  const notificationCount = notificationsList.filter(
    (notification) => notification.status === "unread",
  ).length;

  const totalNotifications = notificationsList.length;

  useEffect(() => {
    if (currentUser && Array.isArray(currentUser.notifications)) {
      const sortedNotifications = [...currentUser.notifications].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setNotifications(sortedNotifications);
    } else {
      setNotifications([]);
    }
  }, [currentUser]);

  const handleUpdateUnreadCount = (count) => {
    setUnreadCount(count);
  };

  const handleLogout = () => {
    logout(dispatch, id, navigate, accessToken, axiosJWT);
    setUnreadCount(0);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotificationsMenuAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationsMenuAnchorEl(null);
  };

  const handleAddPost = () => {
    if (!currentUser) {
      alert("Bạn cần đăng nhập để đăng tin mới.");
      navigate("/login");
    } else {
      navigate("/AddPost");
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  return (
    <AppBar position="static" className="user-header-app-bar">
      <Toolbar className="user-header-tool-bar">
        <Typography
          variant="h6"
          className="header-title"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          PhongTroXinh.com
        </Typography>
        <Box className="header-container-btn">
          <Button className="user-header-btn" onClick={() => navigate("/")}>
            Trang Chủ
          </Button>
          <Button
            className="user-header-btn"
            onClick={() => navigate("/TinTuc")}
          >
            Tin Tức
          </Button>
          <Button className="user-header-btn" onClick={handleAddPost}>
            Đăng tin mới
          </Button>
          <Button className="user-header-btn" onClick={handleNotificationClick}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </Button>
          <Button className="user-header-btn" onClick={handleClick}>
            {currentUser ? `Hi, ${currentUser.username}` : "Tài khoản"}
          </Button>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        classes={{ paper: "menu" }}
      >
        {!currentUser ? (
          <>
            <MenuItem
              className="menu-item"
              onClick={() => {
                navigate("/login");
                setAnchorEl(null);
              }}
            >
              Đăng Nhập
            </MenuItem>
            <MenuItem
              className="menu-item"
              onClick={() => {
                navigate("/register");
                setAnchorEl(null);
              }}
            >
              Đăng Ký
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              className="menu-item"
              onClick={() => {
                navigate("/managerAc");
                setAnchorEl(null);
              }}
            >
              Quản lý tài khoản
            </MenuItem>
            <MenuItem className="menu-item" onClick={handleLogout}>
              Đăng Xuất
            </MenuItem>
          </>
        )}
      </Menu>
      <Notification
        notifications={notifications}
        anchorEl={notificationsMenuAnchorEl}
        onClose={handleNotificationClose}
        onNotificationClose={handleNotificationClose}
        markAsRead={markAsRead}
        accessToken={accessToken}
        onUpdateUnreadCount={handleUpdateUnreadCount}
      />
    </AppBar>
  );
};

export default Header;
