import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncProductSingle,
  getAllRequestedProducts,
  getRequestProducts,
} from "../../store/slices/productsSlice";
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
import "./addProduct.css";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { MdOutlineSlideshow } from "react-icons/md";
import { Col, Row } from "react-bootstrap";

function NewRequest() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { loading } = useSelector((state) => state.products);
  const { admin } = useSelector((state) => state.auth);
  const data = useSelector(getAllRequestedProducts);
  const products = data;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    price: "",
    status: "",
  });

  useEffect(() => {
    dispatch(getRequestProducts());
    console.log(admin);
    console.log(products);
  }, []);

  /*filter */
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.price === "" ||
          product.price.toString().includes(filters.price)) &&
        product.status.toLowerCase().includes(filters.status.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  /* */

  useEffect(() => {
    document.title = "طلبات اضافة منتج";
  }, []);

  return (
    <div className="product-main">
      <div className="container mt-5 ">
        <div className="vendor-orders">
          <Row>
            <Col lg="12">
              <div className="">
                <div className="filter-order p-3">
                  <div>
                    <label htmlFor="">سعر المنتج</label>
                    <input
                      type="text"
                      name="price"
                      placeholder="سعر المنتج"
                      value={filters.price}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="">اسم المنتج</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="اسم المنتج"
                      value={filters.name}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="">حالة المنتج</label>
                    <input
                      type="text"
                      name="status"
                      placeholder="حالة المنتج"
                      value={filters.status}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <h2>المنتجات</h2>
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
                      <TableCell align="right">ID</TableCell>
                      <TableCell align="right">اسم المنتج</TableCell>
                      <TableCell align="right">السعر</TableCell>
                      <TableCell align="right">الحالة</TableCell>
                      <TableCell align="right">مشاهدة</TableCell>
                      <TableCell align="right">خيارات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products &&
                      filteredProducts.map((row) => (
                        <TableRow key={row._id}>
                          <TableCell component="th" scope="row" align="right">
                            {row._id}
                          </TableCell>
                          <TableCell align="right">{row.name}</TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                          <TableCell align="right">{row.status}</TableCell>
                          <TableCell
                            align="right"
                            onClick={() =>
                              dispatch(fetchAsyncProductSingle(row._id))
                            }
                          >
                            <Link
                              className="edit me-2"
                              to={`/product/${row._id}`}
                            >
                              <MdOutlineSlideshow
                                className="fs-4"
                                onClick={() =>
                                  dispatch(fetchAsyncProductSingle(row._id))
                                }
                              />
                            </Link>
                          </TableCell>
                          <TableCell align="right" className="">
                            <span className="ms-3 add-btn">موافقة</span>
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
}

export default NewRequest;
