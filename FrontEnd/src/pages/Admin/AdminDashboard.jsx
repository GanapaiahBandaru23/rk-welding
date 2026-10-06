import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");

    navigate("/admin/login");
  };

  return (
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-container">

        {/* HEADER */}
        <div className="admin-dashboard-header">
          <p className="admin-dashboard-label">
            RK WELDING
          </p>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage your welding and fabrication website.
          </p>
        </div>


        {/* DASHBOARD CARDS */}
        <div className="admin-dashboard-grid">

          {/* MANAGE WORKS */}
          <div className="admin-dashboard-card">
            <h2>
              Manage Works
            </h2>

            <p>
              Add, edit, delete and manage
              welding works, photos and videos.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/manage-works")
              }
            >
              Manage Works
            </button>
          </div>


          {/* ADD WORK */}
          <div className="admin-dashboard-card">
            <h2>
              Add New Work
            </h2>

            <p>
              Add a new welding or fabrication
              work to the website.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/add-work")
              }
            >
              Add New Work
            </button>
          </div>


          {/* CATEGORIES */}
          <div className="admin-dashboard-card">
            <h2>
              Categories
            </h2>

            <p>
              Create and manage welding work
              categories.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/categories")
              }
            >
              Manage Categories
            </button>
          </div>


          {/* WEBSITE */}
          <div className="admin-dashboard-card">
            <h2>
              Website
            </h2>

            <p>
              Open and view the public RK Welding
              website.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/")
              }
            >
              View Website
            </button>
          </div>

        </div>


        {/* LOGOUT */}
        <div className="admin-dashboard-footer">
          <button
            type="button"
            className="admin-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>
    </main>
  );
}

export default AdminDashboard;