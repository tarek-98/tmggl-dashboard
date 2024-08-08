import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleVendor,
  getSingleVendor,
  selectVendorById,
} from "../../store/slices/vendorsSlice";

function VendorChatInfo({ vendorId }) {
  const dispatch = useDispatch();
  const vendordata = useSelector(getSingleVendor);
  const vendor = useSelector((state) => selectVendorById(state, vendorId));
  // const vendor = vendordata && vendordata.result;

  useEffect(() => {
    if (vendorId) {
      dispatch(fetchSingleVendor(vendorId));
    }
  }, [dispatch, vendorId]);

  return <span className="">{vendor && vendor.vendorName}</span>;
}

export default VendorChatInfo;
