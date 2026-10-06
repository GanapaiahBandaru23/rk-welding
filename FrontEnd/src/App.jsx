
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import Works from "./pages/Works/Works";
import WorkDetails from "./pages/WorkDetails/WorkDetails";
import About from "./pages/About/About";
import Experience from "./pages/Experience/Experience";
import Videos from "./pages/Videos/Videos";
import HowWeWork from "./pages/HowWeWork/HowWeWork";
import Contact from "./pages/Contact/Contact";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProtectedRoute from "./pages/Admin/AdminProtectedRoute";
import AddWork from "./pages/Admin/AddWork";
import Categories from "./pages/Admin/Categories";
import ManageWorks from "./pages/Admin/ManageWorks";
import ManageWorkMedia from "./pages/Admin/ManageWorkMedia";
import EditWork from "./pages/Admin/EditWork";

import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <Routes>

          {/* =========================
              PUBLIC WEBSITE
          ========================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/works"
            element={<Works />}
          />

          <Route
            path="/works/:workId"
            element={<WorkDetails />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/experience"
            element={<Experience />}
          />

          <Route
            path="/videos"
            element={<Videos />}
          />

          <Route
            path="/how-we-work"
            element={<HowWeWork />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />


          {/* =========================
              ADMIN LOGIN
          ========================= */}

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />


          {/* =========================
              ADMIN DASHBOARD
          ========================= */}

          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />


          {/* =========================
              ADD NEW WORK
          ========================= */}

          <Route
            path="/admin/add-work"
            element={
              <AdminProtectedRoute>
                <AddWork />
              </AdminProtectedRoute>
            }
          />


          {/* =========================
              MANAGE WORKS
          ========================= */}

          <Route
            path="/admin/manage-works"
            element={
              <AdminProtectedRoute>
                <ManageWorks />
              </AdminProtectedRoute>
            }
          />


          {/* =========================
              MANAGE CATEGORIES
          ========================= */}

          <Route
            path="/admin/categories"
            element={
              <AdminProtectedRoute>
                <Categories />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/manage-works/:workId"
            element={
              <AdminProtectedRoute>
                <ManageWorkMedia />
              </AdminProtectedRoute>
            }
          />

          {/* EDIT WORK */}
          <Route
            path="/admin/edit-work/:workId"
            element={
              <AdminProtectedRoute>
                <EditWork />
              </AdminProtectedRoute>
            }
          />

        </Routes>


        {/* =========================
            FOOTER
        ========================= */}

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;

