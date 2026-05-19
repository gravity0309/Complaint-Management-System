import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import AdminPanelPage from "./pages/AdminPanelPage";
import AiAnalysisPage from "./pages/AiAnalysisPage";
import ComplaintDetailsPage from "./pages/ComplaintDetailsPage";
import ComplaintListPage from "./pages/ComplaintListPage";
import ComplaintRegistrationPage from "./pages/ComplaintRegistrationPage";
import ComplaintStatusUpdatePage from "./pages/ComplaintStatusUpdatePage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/login" element={<LoginPage />} />

        {/* Direct routes without ProtectedRoute */}
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route
          path="/complaints/new"
          element={<ComplaintRegistrationPage />}
        />

        <Route
          path="/complaints"
          element={<ComplaintListPage />}
        />

        <Route
          path="/complaints/:id"
          element={<ComplaintDetailsPage />}
        />

        <Route
          path="/complaints/:id/status"
          element={<ComplaintStatusUpdatePage />}
        />

        <Route
          path="/ai-analysis/:id"
          element={<AiAnalysisPage />}
        />

        <Route path="/admin" element={<AdminPanelPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;