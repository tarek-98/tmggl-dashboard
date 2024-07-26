import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClients,
  getAllOrders,
  getAllProducts,
  getAllVendors,
  getOrdersNumber,
  getProductsNumber,
  getUsersNumber,
  getVendorsNumber,
} from "../../store/slices/statisticsSlice";
import { useEffect } from "react";
import List from "../../components/list/List";
import { Col, Row } from "react-bootstrap";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const ordersNumber = useSelector(getAllOrders);
  const productsNumber = useSelector(getAllProducts);
  const vendorsNumber = useSelector(getAllVendors);
  const usersNumber = useSelector(getAllClients);

  const id = `6686fc0af1610107d3a4fedd`;

  useEffect(() => {
    dispatch(getOrdersNumber());
    dispatch(getProductsNumber());
    dispatch(getVendorsNumber());
    dispatch(getUsersNumber(id));
    console.log(usersNumber);
  }, []);

  useEffect(() => {
    document.title = "لوحة التحكم";
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="تمقل" subtitle="لوحة التحكم" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            gridColumn: {
              xs: "span 12", // Small screens
              sm: "span 6", // Medium screens
              md: "span 3", // Large screens
            },
          }}
        >
          <StatBox
            title={usersNumber[`number of clients`]}
            subtitle="عدد العملاء"
            linkText="المزيد"
            link="/users"
            icon={
              <PersonIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            gridColumn: {
              xs: "span 12", // Small screens
              sm: "span 6", // Medium screens
              md: "span 3", // Large screens
            },
          }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={ordersNumber.data}
            subtitle="عدد الطلبات"
            linkText="المزيد"
            link="/orders"
            icon={
              <AddShoppingCartIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            gridColumn: {
              xs: "span 12", // Small screens
              sm: "span 6", // Medium screens
              md: "span 3", // Large screens
            },
          }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={productsNumber.Number_of_products}
            subtitle="عدد المنتجات"
            linkText="المزيد"
            link="/products"
            icon={
              <ShoppingBagIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            gridColumn: {
              xs: "span 12", // Small screens
              sm: "span 6", // Medium screens
              md: "span 3", // Large screens
            },
          }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={vendorsNumber.data}
            subtitle="عدد التجار"
            linkText="المزيد"
            link="/vendors"
            icon={
              <PersonIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}

        <Box
          sx={{
            gridColumn: {
              xs: "span 12", // Small screens
              sm: "span 6", // Medium screens
              md: "span 6", // Large screens
            },
          }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          sx={{
            gridColumn: {
              xs: "span 12", // Small screens
              sm: "span 6", // Medium screens
              md: "span 6", // Large screens
            },
          }}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="10px"
        >
          <div className="listContainer">
            <div className="listTitle mb-3 fs-4">اخر الطلبات</div>
            <List />
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
