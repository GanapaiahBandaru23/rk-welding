import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://rk-welding-backend.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Invalid email or password");
        return;
      }

      // Save JWT token
      localStorage.setItem("adminToken", data.token);

      // Go to Admin Dashboard
      navigate("/admin");
    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-login-header">
          <p className="admin-login-label">
            RK WELDING
          </p>

          <h1>Admin Login</h1>

          <p>
            Sign in to manage welding works and portfolio content.
          </p>
        </div>

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          {error && (
            <p
              style={{
                margin: 0,
                color: "#ff6b6b",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login to Admin Panel"}
          </button>

        </form>

        <div className="admin-login-footer">
          <p>
            RK Welding • Konijerla
          </p>
        </div>

      </div>
    </main>
  );
}

export default AdminLogin;