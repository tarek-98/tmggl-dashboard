import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import { useSelector } from "react-redux";
import Login from "./components/auth/Login";
import CouponPage from "./components/coupon/CouponPage";
import Admin from "./components/admins/Admin";
import NewVendorRequest from "./components/vendors/NewVendorRequest";
import VendorsEdit from "./components/vendors/VendorsEdit";
import ShippingMethod from "./components/shipping/ShippingMethod";
import Tabby from "./components/shipping/Tabby";
import AddAdmin from "./components/admins/AddAdmin";
import NewRequest from "./components/products/NewRequest";
import EmailForm from "./components/sendMail/EmailForm";
import ProductSingle from "./components/singleProduct/ProductSingle";
import Products from "./components/Products";
import Users from "./components/Users";
import Vendors from "./components/vendors/Vendors";
import Orders from "./components/Orders";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(isLoggedIn);
  });

  if (isLoggedIn === false) {
    return (
      <div className="app justify-content-center align-items-center">
        <div className="container d-flex justify-content-center align-items-center">
          <Login />
        </div>
      </div>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app flex-row-reverse">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductSingle />} />
              <Route path="/products/newRequest" element={<NewRequest />} />
              <Route path="/users" element={<Users />} />
              <Route path="/admins" element={<Admin />} />
              <Route path="/admins/addAdmin" element={<AddAdmin />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route
                path="/vendors/newRequest"
                element={<NewVendorRequest />}
              />
              <Route path="/vendors/vendorsEdit" element={<VendorsEdit />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/coupons" element={<CouponPage />} />
              <Route path="/sendmail" element={<EmailForm />} />
              <Route path="/shippingMethod" element={<ShippingMethod />} />
              <Route path="/tabby" element={<Tabby />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
