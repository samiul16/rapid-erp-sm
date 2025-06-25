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
import UsersPage from "./pages/users/UsersPage";
import UserCreateEditPage from "./pages/users/CreateEditPage";
import UserDetails from "./pages/users/UserDetails";
import UserMasterCreateEdit from "./pages/user-master/UserMasterCreateEdit";
import UserMasterDetails from "./pages/user-master/UserMasterDetails";
import UserMastersPage from "./pages/user-master/UserMastersPage";
import CityPage from "./pages/city/CitiesPage";
import CityDetails from "./pages/city/CityDetails";
import CityForm from "./pages/city/CreateEditPage";
import StateForm from "./pages/states/CreateEditPage";
import StatesPage from "./pages/states/StatesPage";
import StateDetails from "./pages/states/StateDetailsPage";
// import AreaPage from "./pages/area/AreaDataTable";
import AreaDetails from "./pages/area/AreaDetailsPage";
import AreaForm from "./pages/area/CreateEditPage";
import AreasPage from "./pages/area/AreasPage";

function App() {
  return (
    <div className="scroll-smooth">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
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
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route
                path="/users/create"
                element={<UserCreateEditPage isEdit={false} />}
              />
              <Route
                path="/users/:id/edit"
                element={<UserCreateEditPage isEdit={true} />}
              />
              <Route path="/user-master" element={<UserMastersPage />} />
              <Route
                path="/user-master/create"
                element={<UserMasterCreateEdit />}
              />
              <Route path="/user-master/:id" element={<UserMasterDetails />} />

              {/* Cities */}
              <Route path="/cities" element={<CityPage />} />
              <Route path="/cities/:id" element={<CityDetails />} />
              <Route
                path="/cities/create"
                element={<CityForm isEdit={false} />}
              />
              <Route
                path="/cities/:id/edit"
                element={<CityForm isEdit={true} />}
              />

              {/* States */}
              <Route path="/states" element={<StatesPage />} />
              <Route path="/states/:id" element={<StateDetails />} />
              <Route
                path="/states/create"
                element={<StateForm isEdit={false} />}
              />
              <Route
                path="/states/:id/edit"
                element={<StateForm isEdit={true} />}
              />

              {/* Areas */}
              <Route path="/areas" element={<AreasPage />} />
              <Route path="/areas/:id" element={<AreaDetails />} />
              <Route path="/areas/create" element={<AreaForm />} />
              <Route path="/areas/:id/edit" element={<AreaForm />} />
              {/* Add other pages here */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
