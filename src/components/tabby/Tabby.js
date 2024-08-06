import React, { Fragment, useEffect, useState } from "react";
import "../shipping/shipping.css";
import logo from "../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  IoIosArrowBack,
  IoIosArrowRoundForward,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaymentsMethods,
  togglePaymentsMethods,
} from "../../store/slices/tabbySlice";

const Tabby = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payments.methods);
  const status = useSelector((state) => state.payments.status);

  const [comOption, setComOption] = useState(false);
  const [idToggle, setIdToggle] = useState(0);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPaymentsMethods());
    }
  }, [status, dispatch]);

  const handleToggle = (id) => {
    dispatch(togglePaymentsMethods(id));
  };

  return (
    <div className="main-shipping">
      <div className="logo mb-3">
        <img src={logo} alt="" className="logo w-100" />
      </div>
      <div className="back">
        <Link
          to="/profile"
          className="d-flex flex-row-reverse align-items-center text-dark pe-1 text-black-50 fs-6 mb-3"
        >
          <IoIosArrowRoundForward />
          <span>الرجوع الي الحساب</span>
        </Link>
      </div>
      <div className="shipping-method">
        {payments.map((com) => {
          return (
            <Fragment>
              <div className="shipping-company" key={com.id}>
                <div
                  className="image"
                  onClick={() => {
                    setComOption((comOption) => !comOption);
                    setIdToggle(com.id);
                  }}
                >
                  <img src={com.image} alt="" srcset="" />
                </div>
                <div
                  className="name"
                  onClick={() => {
                    setComOption((comOption) => !comOption);
                    setIdToggle(com.id);
                  }}
                >
                  <p className="m-0 text-dark">{com.name}</p>
                </div>
                <div className="d-flex justify-content-center align-items-center sw-togg">
                  <FormControlLabel
                    className="text-dark"
                    control={
                      <Switch
                        checked={com.enabled}
                        onChange={() => handleToggle(com.id)}
                      />
                    }
                    label={com.enabled ? "الغاء التفعيل" : "تفعيل"}
                  />
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Tabby;
