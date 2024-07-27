import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClients, getUsers } from "../store/slices/usersSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Grid } from "@mui/material";
import { Col, Row } from "react-bootstrap";

const Users = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { loading } = useSelector((state) => state.users);
  const users = useSelector(getAllClients);
  const { status, admin } = useSelector((state) => state.auth);
  const id = admin && admin[`Super Admin ID`];
  // const id = `6686fc0af1610107d3a4fedd`;

  useEffect(() => {
    dispatch(getUsers(id));
    console.log(users);
  }, []);

  useEffect(() => {
    document.title = "العملاء";
  }, []);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
  });

  /*filter */
  useEffect(() => {
    const filtered =
      users &&
      users.filter(
        (user) =>
          user.FirstName.toLowerCase().includes(
            filters.FirstName.toLowerCase()
          ) &&
          user.LastName.toLowerCase().includes(
            filters.LastName.toLowerCase()
          ) &&
          user.Email.toLowerCase().includes(filters.Email.toLowerCase()) &&
          (filters.PhoneNumber === "" ||
            user.PhoneNumber.toString().includes(filters.PhoneNumber))
      );
    setFilteredUsers(filtered);
  }, [filters, users]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="vendor-main">
      <div className="container mt-5">
        <div className="vendor-orders">
          <Row>
            <Col lg="12">
              <div className="">
                <div className="filter-order p-3">
                  <div>
                    <label htmlFor="">الاسم الاول</label>
                    <input
                      type="text"
                      name="FirstName"
                      placeholder="الاسم الاول"
                      value={filters.FirstName}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="">الاسم الاخير</label>
                    <input
                      type="text"
                      name="LastName"
                      placeholder="الاسم الاخير"
                      value={filters.LastName}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="">رقم الجوال</label>
                    <input
                      type="text"
                      name="PhoneNumber"
                      placeholder="رقم الجوال"
                      value={filters.PhoneNumber}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="">الايميل</label>
                    <input
                      type="email"
                      name="Email"
                      placeholder="الايميل"
                      value={filters.Email}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <h2>المستخدمين</h2>
        {loading ? (
          <Fragment>
            <div className="d-flex align-items-center justify-content-center">
              <CircularProgress
                sx={{
                  color:
                    theme.palette.mode === "dark" ? "white" : "primary.main",
                }}
              />
            </div>
          </Fragment>
        ) : (
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label="responsive table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">اسم العميل</TableCell>
                      <TableCell align="right">رقم الجوال</TableCell>
                      <TableCell align="right">الايميل</TableCell>
                      <TableCell align="right">خيارات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users &&
                      filteredUsers.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row" align="right">
                            {row.FirstName} {row.LastName}
                          </TableCell>
                          <TableCell align="right">{row.PhoneNumber}</TableCell>
                          <TableCell align="right">{row.Email}</TableCell>
                          <TableCell align="right">
                            <span className="del-btn">حذف</span>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Users;
