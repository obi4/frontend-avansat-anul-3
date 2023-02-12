import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import { Route, Routes } from "react-router";
import { CreateProfile } from "./Pages/CreateProfile/CreateProfile";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { RegisterPage } from "./Pages/RegisterPage/RegisterPage";
import ProtectedRoutes from "./ProtectedRoutes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createProfile" element={<CreateProfile />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </UserContextProvider>
  </BrowserRouter>
);
