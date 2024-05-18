import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider, { AuthContext } from "context/authContext";
import ContextProvider from "context/themeContext";
import DashboardRoutes from "core/DashboardRouter/DashboardRoutes";
import Routers from "core/Routers/Routers";
import Layout from "layout";
import { useContext } from "react";
// import Routers from "core/Routers/Routers";
// import Layout from "layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

function App() {
  const useAuthContext = useContext(AuthContext);
  const { user, isLoggedIn } = useAuthContext;

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <AuthContextProvider>
          {user.role === "Administrator" && isLoggedIn && <DashboardRoutes />}
            <Routers />
        </AuthContextProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
