import { ROUTES } from "constants/contents/routes";
import { Route, Routes } from "react-router-dom";
import SecureRoutes from "hoc/SecureRoutes";
import ManageAuth from "modules/Dashboard/Pages/ManageAuth/ManageAuth";
import ManageDashboard from "modules/Dashboard/Pages/ManageDashboard/MangeDashboard";
import ManageProducts from "modules/Dashboard/Pages/ManageProducts/ManageProducts";
import ProductsRecord from "modules/Dashboard/Pages/ProductsRecord/ProductsRecord";
import Analytics from "modules/Dashboard/Pages/Analytics/Analytics";
import OrderPage from "modules/Dashboard/Pages/Orderpage/OrderPage";



const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.AUTH.SIGN_IN} element={<ManageAuth />} />
      <Route element={<SecureRoutes />}>
        <Route
          path={ROUTES.DASHBOARD.MANAGE_ADMIN}
          element={<ManageDashboard />}
        />
        <Route element={<SecureRoutes />}>
          <Route
            path={ROUTES.DASHBOARD.MANAGE_PRODUCTS}
            element={<ManageProducts />}
          />
          <Route
            path={ROUTES.DASHBOARD.PRODUCTS_RECORD}
            element={<ProductsRecord />}
          />
          <Route
            path={ROUTES.DASHBOARD.ORDER_RECORDS}
            element={<OrderPage />}
          />
          <Route path={ROUTES.DASHBOARD.ANALYTICS} element={<Analytics />} />
        </Route>
      </Route>
      
    </Routes>
  );
};

export default DashboardRoutes;
