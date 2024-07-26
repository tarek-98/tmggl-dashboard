import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { IoPersonAddSharp } from "react-icons/io5";
import "./admin.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdmin,
  getAllAdmins,
  getAllSuperAdmins,
} from "../../store/slices/authSlice";
import Swal from "sweetalert2";

function Admin() {
  const dispatch = useDispatch();
  const { allAdmins, allSuperAdmins } = useSelector((state) => state.auth);
  const { status, admin } = useSelector((state) => state.auth);
  const id = admin[`Super Admin ID`];
  // const id = `6686fc0af1610107d3a4fedd`;

  useEffect(() => {
    dispatch(getAllAdmins(id));
    dispatch(getAllSuperAdmins(id));
  }, []);

  function handleDelete() {
    dispatch(deleteAdmin());
  }

  function handleAlert() {
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
        handleDelete();
      }
    });
  }

  useEffect(() => {
    document.title = "المدراء";
  }, []);

  return (
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>الايميل</th>
            <th>الحالة</th>
            <th>خيارات</th>
          </tr>
        </thead>
        {/*  <tbody>
          {allAdmins &&
            allAdmins.map((admin) => {
              return (
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>ادارة</td>
                  <td className="d-flex gap-3 del">
                    <span onClick={() => handleAlert()}>حذف</span>
                  </td>
                </tr>
              );
            })}
        </tbody> */}
      </Table>
      <hr />
      <div className="title">
        <h3>ادارة عليا</h3>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>الايميل</th>
            <th>الحالة</th>
            <th>خيارات</th>
          </tr>
        </thead>
        {/*  <tbody>
          {allSuperAdmins &&
            allSuperAdmins.map((admin) => {
              return (
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>ادارة</td>
                  <td className="d-flex gap-3 del">
                    <span onClick={() => handleAlert()} className="del-btn">حذف</span>
                  </td>
                </tr>
              );
            })}
        </tbody> */}
      </Table>
    </div>
  );
}

export default Admin;
