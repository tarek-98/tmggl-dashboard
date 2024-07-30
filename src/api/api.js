import axios from "axios";

const API_URL = "https://tager-dpsl.onrender.com";

export const fetchProducts = () => axios.get(`${API_URL}/products/getall`);
export const fetchUsers = () => axios.get(`${API_URL}/users`);
export const fetchVendors = () =>
  axios.get(`${API_URL}/admin/all-vendors/666fd3459c2125e4d2bb34d9`);
export const fetchOrders = () => axios.get(`${API_URL}/orders`);

export const fetchNumberOfProducts = () =>
  axios.get(`${API_URL}/products/numberofproducts`);
export const fetchNumberOfUsers = () =>
  axios.get(`${API_URL}/admin/clients-num`);
export const fetchNumberOfVendors = () =>
  axios.get(`${API_URL}/vendor/numberofvendors`);
export const fetchNumberOfOrders = () =>
  axios.get(`${API_URL}/order/numberoforders`);

export const fetchRequestVendors = () =>
  axios.get(`${API_URL}/admin/new-vendors-requests`);

export const fetchEditVendors = () =>
  axios.get(`${API_URL}/admin/edit-vendors-requests/666fd3459c2125e4d2bb34d9`);
