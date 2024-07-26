import React, { Fragment } from "react";
import "./bottomOption.css";
import "./addProduct.css";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { fetchAsyncProductSingle } from "../../store/slices/productsSlice";

function BottomOption({ product, setAddProduct }) {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="bottomOption">
        <Button
          variant="contained"
          className="add-cart"
          onClick={() => {
            setAddProduct(true);
            dispatch(fetchAsyncProductSingle(product._id));
          }}
        >
          عرض التفاصيل
        </Button>
      </div>
    </Fragment>
  );
}

export default BottomOption;
