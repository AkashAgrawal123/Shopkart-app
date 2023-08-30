import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import SnackbarProvider from "./Contexts/SnackbarProvider";
import AuthProvider from "./Contexts/AuthContext";

const App = () => {
  return (
    <React.Suspense fallback={<p>Laoding...</p>}>
      <SnackbarProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </SnackbarProvider>
    </React.Suspense>
  );
};

export default App;
