import React, { useEffect, useState } from "react";
import "./slideOverlay.css";
import { useDispatch } from "react-redux";
import { FaCommentDots } from "react-icons/fa";
import { HiMiniBars3 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { fetchAsyncProductSingle } from "../../store/slices/productsSlice";

function SlideOverlay({ product, comment, setComment, setInfo }) {
  const dispatch = useDispatch();
  return (
    <div className="slide-overlay">
      <div className="container-wrapper">
        <div className="left-side">
          <div className="left-side-content">
            <div className="smart-wrapper">
              <div
                className="item"
                id={product && product._id}
                onClick={() => {
                  setComment((comment) => !comment);
                  dispatch(fetchAsyncProductSingle(product._id));
                }}
              >
                <FaCommentDots />
                <span>{product && product.comments.length}</span>
              </div>
            </div>
            <div className="smart-wrapper">
              <div
                className="item"
                onClick={() => {
                  setInfo(true);
                  dispatch(fetchAsyncProductSingle(product._id));
                }}
              >
                <HiMiniBars3 />
                <span>Info</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideOverlay;
