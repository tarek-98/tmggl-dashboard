import React, { Fragment, useEffect } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import "./admin.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import {
  allAdmins,
  allSuperAdmins,
  deleteAdmin,
  getAllAdmins,
  getAllSuperAdmins,
} from "../../store/slices/authSlice";
import Swal from "sweetalert2";

function Admin() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const admins = useSelector(allAdmins);
  const superAdmins = useSelector(allSuperAdmins);
  const { status, admin } = useSelector((state) => state.auth);
  const id = admin && admin[`Super Admin ID`];
  // const id = `6686fc0af1610107d3a4fedd`;

  useEffect(() => {
    dispatch(getAllAdmins(id));
    dispatch(getAllSuperAdmins(id));
  }, []);

  function handleDelete(delId) {
    dispatch(deleteAdmin({ id, delId }));
    dispatch(getAllAdmins(id));
    dispatch(getAllSuperAdmins(id));
  }

  function handleAlert(delId) {
    Swal.fire({
      title: "هل انت متأكد",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(delId);
      }
    });
  }

  useEffect(() => {
    document.title = "المدراء";
  }, []);

  return (
    <div className="admin-main">
      <div className="container pt-5 admin">
        <div className="add d-flex justify-content-end">
          <Link
            to="/admins/addAdmin"
            className="d-flex flex-column justify-content-center align-items-center add-item text-decoration-none"
          >
            <IoPersonAddSharp className="fs-3" />
            <span className="fs-4">اضافة</span>
          </Link>
        </div>
        <div className="title">
          <h3>ادمن</h3>
        </div>
        {status === "loading" ? (
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
                      <TableCell align="right">ID</TableCell>
                      <TableCell align="right">الايميل</TableCell>
                      <TableCell align="right">الحالة</TableCell>
                      <TableCell align="right">خيارات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {admins &&
                      admins.map((row) => (
                        <TableRow key={row._id}>
                          <TableCell component="th" scope="row" align="right">
                            {row._id}
                          </TableCell>
                          <TableCell align="right">{row.Email}</TableCell>
                          <TableCell align="right">ادارة</TableCell>
                          <TableCell align="right">
                            <span
                              className="del-btn"
                              onClick={() => handleAlert(row._id)}
                            >
                              حذف
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
        <hr />
        <div className="title">
          <h3>ادارة عليا</h3>
        </div>
        {status === "loading" ? (
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
                      <TableCell align="right">ID</TableCell>
                      <TableCell align="right">الايميل</TableCell>
                      <TableCell align="right">الحالة</TableCell>
                      <TableCell align="right">خيارات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {superAdmins &&
                      superAdmins.map((row) => (
                        <TableRow key={row._id}>
                          <TableCell component="th" scope="row" align="right">
                            {row._id}
                          </TableCell>
                          <TableCell align="right">{row.Email}</TableCell>
                          <TableCell align="right">ادارة عليا</TableCell>
                          <TableCell align="right">
                            <span
                              className="del-btn"
                              onClick={() => handleAlert(row._id)}
                            >
                              حذف
                            </span>
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
}

export default Admin;
