import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Private route
import PrivateRoutes from "./utils/PrivateRoutes";

// Pages
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  PasswordResetPage,
} from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Private routes (Requires authentication token) */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route
          path="/passwordReset/:resetToken"
          element={<PasswordResetPage />}
        />

        {/* If the user enters an invalid path in the URL it automatically redirects them to the homepage */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
