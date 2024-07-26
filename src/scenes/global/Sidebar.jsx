import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import DiscountIcon from "@mui/icons-material/Discount";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SendIcon from "@mui/icons-material/Send";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import InfoIcon from "@mui/icons-material/Info";
import { right } from "@popperjs/core";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} className="side-bar">
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  TMGGL
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="لوحة التحكم"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              textAlign={right}
              paddingRight={5}
            >
              العملاء
            </Typography>
            <Item
              title="العملاء"
              to="/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="التجار"
              to="/vendors"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="طلبات اضافة التجار"
              to="/vendors/newRequest"
              icon={<PersonAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="طلبات تعديل التجار"
              to="/vendors/vendorsEdit"
              icon={<EditIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              textAlign={right}
              paddingRight={5}
            >
              واجهة المتجر
            </Typography>
            <Item
              title="المنتجات"
              to="/products"
              icon={<ShoppingCartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="طلبات اضافة المنتجات"
              to="/products/newRequest"
              icon={<AddShoppingCartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="الطلبات"
              to="/orders"
              icon={<AddShoppingCartIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              textAlign={right}
              paddingRight={5}
            >
              التسويق
            </Typography>
            <Item
              title="قسائم التخفيض"
              to="/coupons"
              icon={<DiscountIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="قسائم الهدايا"
              to="/coupons"
              icon={<CardGiftcardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="ارسال ميل"
              to="/sendmail"
              icon={<SendIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              textAlign={right}
              paddingRight={5}
            >
              التقارير
            </Typography>
            <Item
              title="تقارير المبيعات"
              to="/coupons"
              icon={<DiscountIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="تقارير المنتجات"
              to="/coupons"
              icon={<CardGiftcardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="تقارير العملاء"
              to="/sendmail"
              icon={<SendIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              textAlign={right}
              paddingRight={5}
            >
              المعلومات
            </Typography>
            <Item
              title="سياسة الخصوصية"
              to="/form"
              icon={<PrivacyTipIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="سياسة الشحن و الاسترجاع"
              to="/form"
              icon={<KeyboardReturnIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="عن تمقل"
              to="/form"
              icon={<InfoIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="التقويم"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              textAlign={right}
              paddingRight={5}
            >
              الضبط
            </Typography>
            <Item
              title="المدراء"
              to="/admins"
              icon={<AdminPanelSettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
