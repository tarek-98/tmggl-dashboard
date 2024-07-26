import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./list.css";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getAllOrders } from "../../store/slices/ordersSlice";

const List = () => {
  const orders = useSelector(getAllOrders);
  const { loading, error } = useSelector((state) => state.orders);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="list">
      <Box sx={{ overflowX: "auto" }}>
        <Paper sx={{ minWidth: 650 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell text-center">
                    رقم التتبع
                  </TableCell>
                  <TableCell className="tableCell text-center">
                    المنتج
                  </TableCell>
                  <TableCell className="tableCell text-center">
                    العميل
                  </TableCell>
                  <TableCell className="tableCell text-center">
                    التاريخ
                  </TableCell>
                  <TableCell className="tableCell text-center">
                    الكمية
                  </TableCell>
                  <TableCell className="tableCell text-center">
                    طريقة الدفع
                  </TableCell>
                  <TableCell className="tableCell text-center">
                    الحالة
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="tableCell">{order.id}</TableCell>
                    <TableCell className="tableCell">
                      <div className="cellWrapper">
                        <img src={order.img} alt="" className="image" />
                        {order.product}
                      </div>
                    </TableCell>
                    <TableCell className="tableCell">
                      {order.customer}
                    </TableCell>
                    <TableCell className="tableCell">{order.date}</TableCell>
                    <TableCell className="tableCell">{order.amount}</TableCell>
                    <TableCell className="tableCell">{order.method}</TableCell>
                    <TableCell className="tableCell">
                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
};

export default List;
