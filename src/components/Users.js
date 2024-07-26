import React, { Fragment, useEffect } from "react";
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

const Users = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { users, loading } = useSelector((state) => state.users);
  const data = useSelector(getAllClients);
  const id = `6686fc0af1610107d3a4fedd`;

  useEffect(() => {
    dispatch(getUsers(id));
    console.log(data);
  }, []);

  useEffect(() => {
    document.title = "العملاء";
  }, []);

  return (
    <div className="container mt-5">
      <h2>المستخدمين</h2>
      {loading ? (
        <Fragment>
          <div className="d-flex align-items-center justify-content-center">
            <CircularProgress
              sx={{
                color: theme.palette.mode === "dark" ? "white" : "primary.main",
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
                  {/*  {data &&
                    data.data.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.vendorName}
                        </TableCell>
                        <TableCell>{row.brandName}</TableCell>
                        <TableCell align="right">{row.vendorPhone}</TableCell>
                        <TableCell align="right">{row.typeOfLicense}</TableCell>
                        <TableCell align="right">{row.licenseNumber}</TableCell>
                        <TableCell align="right">
                          <a href={row.LicenseFile} download="MyFile.pdf">
                            Download File
                          </a>
                        </TableCell>
                        <TableCell align="right">
                          {row.registeredWithAddedTax ? "نعم" : "لا"}
                        </TableCell>
                        <TableCell align="right">
                          <a href={row.AddedTaxFile} download="MyFile.pdf">
                            Download File
                          </a>
                        </TableCell>
                        <TableCell align="right">
                          <span>اضافة</span>
                          <span>حذف</span>
                        </TableCell>
                      </TableRow>
                    ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Users;
