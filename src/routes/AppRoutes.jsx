import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import VerifyOtp from "../pages/auth/VerifyOtp";

import Dashboard from "../pages/Dashboard/Dashboard";
import Overview from "../pages/Admin/Overview";          {/* ← fixed casing: admin → Admin */}
import Voter from "../pages/Voter/Voter";
import Results from "../pages/Results/Results";
import CreateElection from "../pages/Admin/CreateElection";
import ElectionsList from "../pages/Admin/ElectionsList";
import ProtectedRoute from "./ProtectedRoute";
import CastVote from "../pages/Voter/CastVote";
import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";




function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      

      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />

      <Route
        path="/admin"
        element={<ProtectedRoute allowedRoles={["admin"]}><Overview /></ProtectedRoute>}
      />

      <Route
        path="/admin/elections/create"
        element={<ProtectedRoute allowedRoles={["admin"]}><CreateElection /></ProtectedRoute>}
      />

      <Route
        path="/voter"
        element={<ProtectedRoute allowedRoles={["voter"]}><Voter /></ProtectedRoute>}
      />

      <Route path="/voter/elections/:id"
      element={<ProtectedRoute allowedRoles={["voter"]}><CastVote /></ProtectedRoute>} />

      <Route
        path="/admin/elections"
        element={<ProtectedRoute allowedRoles={["admin"]}><ElectionsList /></ProtectedRoute>}
        />

      <Route path="/results/:id" element={<ProtectedRoute><Results /></ProtectedRoute>} />

      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="*" element = {<NotFound/>}/>
    </Routes>
  );
}

export default AppRoutes;