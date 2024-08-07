import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  delVendor,
  getAllVendors,
  getVendors,
} from "../../store/slices/vendorsSlice";
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
import "./vendor.css";
import "../ordersList.css";
import { Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const Vendors = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { loading } = useSelector((state) => state.vendors);
  const { requetedVendors, status, error } = useSelector(
    (state) => state.vendors
  );
  const { admin } = useSelector((state) => state.auth);
  const vendors = useSelector(getAllVendors);
  const vendorsData = vendors ? vendors.result : null;
  // const id = `6686fc0af1610107d3a4fedd`;
  const id = admin[`Super Admin ID`];

  const [filteredVendors, setFilteredVendors] = useState([]);
  const [filters, setFilters] = useState({
    vendorName: "",
    brandName: "",
    vendorPhone: "",
  });

  useEffect(() => {
    dispatch(getVendors());
    console.log(vendors);
    console.log(id);
  }, []);

  /*filter */
  useEffect(() => {
    const filtered =
      vendors &&
      vendors.filter(
        (vendor) =>
          vendor.vendorName
            .toLowerCase()
            .includes(filters.vendorName.toLowerCase()) &&
          (filters.price === "" ||
            vendor.vendorPhone.toString().includes(filters.vendorPhone)) &&
          vendor.brandName
            .toLowerCase()
            .includes(filters.brandName.toLowerCase())
      );
    setFilteredVendors(filtered);
  }, [filters, vendors]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    document.title = "التجار";
  }, []);

  function sweetAlertDel(vendorId) {
    Swal.fire({
      title: "هل انت متأكد؟",
      text: "هل تريد حذف التاجر",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم حذف",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("تم حذف التاجر", {
          position: "top-left",
        });
        dispatch(delVendor(vendorId));
        setTimeout(() => {
          dispatch(getVendors());
        }, 1000);
      }
    });
  }

  return (
    <div className="vendor-main">
      <div className="container mt-5">
        <div className="vendor-orders">
          <Row>
            <Col lg="12">
              <div className="">
                <div className="filter-order p-3">
                  <div>
                    <label htmlFor="">اسم التاجر</label>
                    <input
                      type="text"
                      name="vendorName"
                      placeholder="اسم التاجر"
                      value={filters.vendorName}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="">اسم المتجر</label>
                    <input
                      type="text"
                      name="brandName"
                      placeholder="اسم المتجر"
                      value={filters.brandName}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="">رقم الجوال</label>
                    <input
                      type="text"
                      name="vendorPhone"
                      placeholder="رقم الجوال"
                      value={filters.vendorPhone}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <h2>التجار</h2>
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
                      <TableCell align="right">اسم التاجر</TableCell>
                      <TableCell align="right">اسم المتجر</TableCell>
                      <TableCell align="right">مقر التاجر</TableCell>
                      <TableCell align="right">الايميل</TableCell>
                      <TableCell align="right">رقم الجوال</TableCell>
                      <TableCell align="right">نوع الرخصة</TableCell>
                      <TableCell align="right">رقم الرخصة</TableCell>
                      <TableCell align="right">ملف الرخصة</TableCell>
                      <TableCell align="right">مسجل بالضريبة المضافة</TableCell>
                      <TableCell align="right">ملف الضريبة المضافة</TableCell>
                      <TableCell align="right">خيارات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vendors &&
                      filteredVendors.map((row) => (
                        <TableRow key={row._id}>
                          <TableCell component="th" scope="row" align="right">
                            {row.vendorName}
                          </TableCell>
                          <TableCell align="right">{row.brandName}</TableCell>
                          <TableCell align="right">
                            {row.vendorLocation}
                          </TableCell>
                          <TableCell align="right">{row.vendorEmail}</TableCell>
                          <TableCell align="right">{row.vendorPhone}</TableCell>
                          <TableCell align="right">
                            {row.typeOfLicense}
                          </TableCell>
                          <TableCell align="right">
                            {row.licenseNumber}
                          </TableCell>
                          <TableCell align="right">
                            <a
                              href={row.LicenseFile}
                              download={`${row.vendorName}.pdf`}
                              target="_blank"
                            >
                              Download File
                            </a>
                          </TableCell>
                          <TableCell align="right">
                            {row.registeredWithAddedTax ? "نعم" : "لا"}
                          </TableCell>
                          <TableCell align="right">
                            <a
                              href={row.AddedTaxFile}
                              download={`${row.vendorName}.pdf`}
                              target="_blank"
                            >
                              Download File
                            </a>
                          </TableCell>
                          <TableCell
                            align="right"
                            className="d-flex gap-2 justify-content-end align-items-center"
                          >
                            <span
                              className="del-btn"
                              onClick={() => sweetAlertDel(row._id)}
                            >
                              حذف
                            </span>
                            <span className="add-btn">تعديل</span>
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
      <ToastContainer />
    </div>
  );
};

export default Vendors;
