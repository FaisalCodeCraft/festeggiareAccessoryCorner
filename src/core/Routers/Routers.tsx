import { LANDING_ROUTES } from "constants/contents/routes";
import Layout from "layout";
import About from "modules/LandingPage/About";
import Home from "modules/LandingPage/Home";
import Orders from "modules/LandingPage/Orders/Orders";
import Product from "modules/LandingPage/Product";
import { Route, Routes } from "react-router-dom";

const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={"/"} element={<Home />} />
        <Route path={LANDING_ROUTES.HOME_PAGE} element={<Home />} />
        <Route path={LANDING_ROUTES.ABOUT_PAGE} element={<About />} />
        <Route path={LANDING_ROUTES.PRODUCTS_PAGE} element={<Product />} />
        <Route path={LANDING_ROUTES.ORDER_PAGE} element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default Routers;
