import React, { useEffect, useState } from "react";
import "./ordersList.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, getAllOrders } from "../store/slices/ordersSlice";
import logo from "../assets/images/logo1.png";
import { Link } from "react-router-dom";

function OrdersList() {
  const orders = useSelector(getAllOrders);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    id: "",
    shipping_status: "",
    order_date: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.id === "" || order.id.toString().includes(filters.id)) &&
        order.shipping_status
          .toLowerCase()
          .includes(filters.shipping_status.toLowerCase()) &&
        (filters.order_date === "" ||
          order.order_date.toLowerCase().includes(filters.order_date))
    );
    setFilteredOrders(filtered);
  }, [filters, orders]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    document.title = "الطلبات";
  }, []);

  return (
    <div className="vendor-orders pt-5 pe-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-5">
            <div className="filter-order">
              <div>
                <label htmlFor="">رقم الطلب</label>
                <input
                  type="text"
                  name="id"
                  placeholder="رقم الطلب"
                  value={filters.id}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label htmlFor="">اسم العميل</label>
                <input
                  type="text"
                  name="name"
                  placeholder="اسم العميل"
                  value={filters.name}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label htmlFor="">حالة الطلب</label>
                <input
                  type="text"
                  name="shipping_status"
                  placeholder="حالة الطلب"
                  value={filters.statu}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label htmlFor="">تاريخ الاضافة</label>
                <input
                  type="date"
                  name="order_date"
                  placeholder="تاريخ الاضافة"
                  value={filters.date}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="orders-table pt-2 pb-3">
              <h4 className="mb-5 p-3 text-dark">
                قائمة الطلبات ( <span>{filteredOrders.length} طلب )</span>
              </h4>
              {filteredOrders.map((order) => {
                return (
                  <Link
                    key={order.id}
                    className="mb-4 order-item ps-3 pe-3 pt-2 pb-2"
                    to={`/profile/orderslist/${order.id}`}
                  >
                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="row">
                          <div className="col-8 col-sm-4">
                            <div className="d-flex align-items-center">
                              <div className="logo ms-4">
                                <img src={logo} alt="" srcset="" />
                              </div>
                              <div className="order-info">
                                <div className="name-user-order mb-2">
                                  <span>{order.user.name}</span>
                                </div>
                                <div className="num-order d-flex gap-2">
                                  <span className="fw-bold">{order.id}#</span>
                                  <span>{order.shipping_status}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-2 col-sm-4 d-flex align-items-center justify-content-center">
                            <span>{order.total_amount} ر.س</span>
                          </div>
                          <div className="col-2 col-sm-4 d-flex align-items-center justify-content-center">
                            <span>{order.order_date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersList;
