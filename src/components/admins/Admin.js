import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { IoPersonAddSharp } from "react-icons/io5";
import "./admin.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
            <th>ID</th>
            <th>الايميل</th>
            <th>الحالة</th>
            <th>خيارات</th>
          </tr>
        </thead>
        <tbody>
          {admins &&
            admins.map((admin) => {
              return (
                <tr>
                  <td>{admin._id}</td>
                  <td>{admin.Email}</td>
                  <td>ادارة</td>
                  <td className="d-flex gap-3 del">
                    <span
                      onClick={() => handleAlert(admin._id)}
                      className="del-btn"
                    >
                      حذف
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
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
        <tbody>
          {superAdmins &&
            superAdmins.map((admin) => {
              return (
                <tr>
                  <td>{admin._id}</td>
                  <td>{admin.Email}</td>
                  <td>ادارة عليا</td>
                  <td className="d-flex gap-3 del">
                    <span
                      onClick={() => handleAlert(admin._id)}
                      className="del-btn"
                    >
                      حذف
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default Admin;
