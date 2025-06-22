import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import CountryPage from "./pages/Country/CountriesPage";
import CountryDetails from "./pages/Country/CountryDetails";
import CountryFormPage from "./pages/Country/CreateEditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={<Dashboard />} />
            <Route path="/countries" element={<CountryPage />} />
            <Route path="/countries/:id" element={<CountryDetails />} />
            <Route
              path="/countries/create"
              element={<CountryFormPage isEdit={false} />}
            />
            <Route
              path="/countries/:id/edit"
              element={<CountryFormPage isEdit={true} />}
            />
            {/* Add other pages here */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
