import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
