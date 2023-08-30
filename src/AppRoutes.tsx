import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/globalStyle.scss";
import PrivateRoute from "./Core/Components/PrivateRoute";

// components
import ContactBanner from "./Component/ContactBanner/ContactBanner";
import Header from "./Component/Header/Header";
import GoToTopButton from "./Component/GoToTop/GoToTopButton";
import Footer from "./Component/Footer/Footer";
const ErrorPage = lazy(() => import("./Component/ErrorPage/ErrorPage"));

// pages
const Home = lazy(() => import("./Pages/Home"));
const Categories = lazy(() => import("./Pages/Categories"));
const Deals = lazy(() => import("./Pages/Deals"));
const Delivery = lazy(() => import("./Pages/Delivery"));
const Cart = lazy(() => import("./Pages/Cart"));
const ProductDetail = lazy(() => import("./Pages/ProductDetail"));
const OrderNow = lazy(() => import("./Pages/OrderNow"));
const Wishlist = lazy(() => import("./Pages/Wishlist"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));

const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignUp = location.pathname === "/signup";
  const isForgotPassword = location.pathname === "/forgot-password";

  return (
    <>
      {!isLoginPage && !isSignUp && !isForgotPassword && (
        <>
          <ContactBanner />
          <Header />
        </>
      )}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/order-now" element={<OrderNow />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {!isLoginPage && !isSignUp && !isForgotPassword && (
        <>
          <GoToTopButton />
          <Footer />
        </>
      )}
    </>
  );
};

export default AppRoutes;
