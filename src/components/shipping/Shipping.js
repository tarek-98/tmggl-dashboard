import React, { Fragment, useEffect, useState } from "react";
import "./shipping.css";
import logo from "../../assets/images/logo.jpeg";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  IoIosArrowBack,
  IoIosArrowRoundBack,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShippingMethods,
  toggleShippingMethod,
  updateShippingMethodPrice,
} from "../../store/slices/shippingSlice";
import { Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { daDK } from "@mui/x-data-grid";
import { dark } from "@mui/material/styles/createPalette";

function Shipping() {
  const dispatch = useDispatch();
  const methods = useSelector((state) => state.shipping.methods);
  const status = useSelector((state) => state.shipping.status);

  const [comOption, setComOption] = useState(false);
  const [idToggle, setIdToggle] = useState(0);
  const [prices, setPrices] = useState({});
  const [priceForVendor, setPriceForVendor] = useState("");

  const [activeSpan, setActiveSpan] = useState(1);
  function toggleSpan(type) {
    if (type === 1) {
      setActiveSpan(1);
    } else {
      setActiveSpan(2);
    }
  }

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchShippingMethods());
    }
  }, [status, dispatch]);
  useEffect(() => {
    const pricesObj = {};
    methods.forEach((method) => {
      pricesObj[method.id] = method.priceForVendor;
    });
    setPrices(pricesObj);
  }, [methods]);
  const handleChange = (event, id) => {
    const { value } = event.target;
    setPrices((prevPricesForVendor) => ({
      ...prevPricesForVendor,
      [id]: value,
    }));
  };

  const handleSave = (id, com) => {
    dispatch(updateShippingMethodPrice({ id, priceForVendor: prices[id] }));
    axios({
      method: "put",
      url: `http://localhost:9000/shipping-methods/${id}`,
      data: {
        ...com,
        priceForVendor: prices[id],
      },
    }).then((data) => {
      toast.success("تم تعديل البيانات", {
        position: "top-left",
      });
    });
    setComOption((comOption) => !comOption);
  };

  const handleToggle = (id) => {
    dispatch(toggleShippingMethod(id));
  };

  return (
    <div className="main-shipping">
      <div className="logo mb-3">
        <img src={logo} alt="" className="logo w-100" />
      </div>
      <div className="shipping-method">
        {methods.map((com) => {
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
                  <IoIosArrowBack
                    className="me-3 fw-bold text-dark"
                    onClick={() => {
                      setComOption((comOption) => !comOption);
                      setIdToggle(com.id);
                    }}
                  />
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

              <div
                className={
                  comOption && idToggle === com.id
                    ? "com-option"
                    : "com-option-hide"
                }
              >
                <div className="container">
                  <div className="close">
                    <IoIosCloseCircleOutline
                      className="text-dark"
                      onClick={() => {
                        setComOption((comOption) => !comOption);
                        setActiveSpan(1);
                      }}
                    />
                    <p className="m-0 text-dark">{com.name}</p>
                  </div>
                  <div className="option-nav d-flex justify-content-end">
                    <span
                      className={
                        activeSpan === 1 ? "active text-dark" : "text-dark"
                      }
                      onClick={() => toggleSpan(1)}
                    >
                      تسعيرة الشحن
                    </span>
                  </div>
                  <div
                    className={
                      activeSpan === 1 ? "co-content" : "co-content-hide"
                    }
                  >
                    <div className="p-3 price-vendor">
                      <h5 className="mb-3 text-dark">تكلفة الشحن للتاجر</h5>
                      <div className="d-flex gap-3 align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <TextField
                            label={com.name}
                            type="number"
                            value={prices[com.id]}
                            onChange={(e) => handleChange(e, com.id)}
                            variant="outlined" // Use the outlined variant to see the border
                            sx={{
                              "& .MuiInputBase-input": {
                                color: "#000", // Dark color for the text
                              },
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "#000", // Dark color for the border
                                },
                                "&:hover fieldset": {
                                  borderColor: "#000", // Dark color for the border on hover
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#000", // Dark color for the border when focused
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "#000", // Dark color for the label
                              },
                              "& .MuiInputLabel-root.Mui-focused": {
                                color: "#000", // Dark color for the label when focused
                              },
                            }}
                          />
                          <span className="text-dark">ر.س</span>
                        </div>
                        <p className="m-0 info-ship d-flex flex-wrap align-items-center justify-content-center text-black-50">
                          لاول 25 كجم حسب (الوزن الفعلي او الحجمي ايهما اكبر).
                          <span className="ms-2 me-2 text-dark">
                            2 ر.س لكل كجم اضافي
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleSave(com.id, com)}
                    class="btn-24 me-auto ms-auto"
                  >
                    <span>حفظ</span>
                  </Button>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Shipping;
