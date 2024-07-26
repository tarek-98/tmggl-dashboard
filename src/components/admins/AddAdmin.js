import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin, addSuperAdmin } from "../../store/slices/authSlice";
import "./admin.css";
import { toast, ToastContainer } from "react-toastify";

function AddAdmin() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [superAdmin, setSuperAdmin] = useState(false);
  const { status, admin } = useSelector((state) => state.auth);
  const id = admin[`Super Admin ID`];
  // const id = `6686fc0af1610107d3a4fedd`;

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "super Admin Added") {
      toast.success("تم اضافة الادمن", {
        position: "top-left",
      });
    } else if (status === "Admin Added") {
      toast.success("تم اضافة الادمن", {
        position: "top-left",
      });
    }
  }, [status]);

  useEffect(() => {
    document.title = "اضافة مدير";
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (superAdmin) {
        dispatch(addSuperAdmin({ id, email, password }));
        setPassword("");
        setEmail("");
      } else {
        dispatch(addAdmin({ id, email, password }));
        setPassword("");
        setEmail("");
      }
    }

    event.preventDefault();
    setValidated(true);
  };

  return (
    <div className="add-admin-main">
      <div className="container">
        <div className="admin-type">
          <div className="admin-type-admin d-flex flex-row-reverse justify-content-end align-items-center">
            <label htmlFor="flexCheckDefault" className="form-check-label fs-4">
              ادمن
            </label>
            <input
              className="form-check-input ms-2"
              type="radio"
              name="admin"
              id="flexCheckDefault"
              onChange={() => setSuperAdmin(false)}
            />
          </div>
          <div className="admin-type-super d-flex flex-row-reverse justify-content-end align-items-center">
            <label
              htmlFor="flexCheckDefault01"
              className="form-check-label fs-4"
            >
              ادارة عليا
            </label>
            <input
              className="form-check-input ms-2"
              type="radio"
              name="admin"
              id="flexCheckDefault01"
              onChange={() => setSuperAdmin(true)}
            />
          </div>
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3 flex-column w-100 mb-4">
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
              <Form.Label className="mb-3 fs-4">الايميل</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="الايميل"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                اكتب الايميل
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label className="mb-3 fs-4 mt-3">كلمة السر</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="كلمة السر"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                اكتب كلمة السر
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {superAdmin ? (
            <Button type="submit">انشاء ادمن ( ادارة عليا)</Button>
          ) : (
            <Button type="submit">انشاء ادمن</Button>
          )}
        </Form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddAdmin;
