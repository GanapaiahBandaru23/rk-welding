
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageWorks() {
  const navigate = useNavigate();

  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // LOAD WORKS
  // ========================================
  const loadWorks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/works"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Failed to load works."
        );
        return;
      }

      setWorks(data.works || []);

    } catch (error) {
      console.error(
        "Manage works loading error:",
        error
      );

      setError(
        "Unable to connect to backend server."
      );

    } finally {
      setLoading(false);
    }
  };


  // ========================================
  // DELETE WORK
  // ========================================
  const handleDeleteWork = async (
    workId,
    title
  ) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}"?\n\nThis will also remove its photos and videos from the database.`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token =
        localStorage.getItem("adminToken");

      if (!token) {
        alert("Admin login required.");
        navigate("/admin/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/works/${workId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        alert(
          data.message ||
            "Failed to delete work."
        );

        return;
      }

      alert(
        "Work deleted successfully!"
      );

      // Refresh works
      await loadWorks();

    } catch (error) {
      console.error(
        "Delete work error:",
        error
      );

      alert(
        "Unable to connect to backend server."
      );
    }
  };


  // ========================================
  // LOAD WORKS ON PAGE LOAD
  // ========================================
  useEffect(() => {
    loadWorks();
  }, []);


  // ========================================
  // PAGE
  // ========================================
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "50px 20px",
      }}
    >

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

        {/* BACK BUTTON */}

        <button
          type="button"
          onClick={() =>
            navigate("/admin")
          }
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "15px",
            marginBottom: "25px",
          }}
        >
          ← Back to Dashboard
        </button>


        {/* HEADER */}

        <div
          style={{
            marginBottom: "30px",
          }}
        >

          <p
            style={{
              margin: "0 0 8px",
              color: "#6b7280",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "1px",
            }}
          >
            RK WELDING
          </p>

          <h1
            style={{
              margin: "0 0 10px",
              color: "#111827",
              fontSize: "36px",
            }}
          >
            Manage Works
          </h1>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
            }}
          >
            View and manage existing
            welding and fabrication works.
          </p>

        </div>


        {/* LOADING */}

        {loading && (
          <div
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "12px",
            }}
          >
            Loading works...
          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "12px",
              color: "#b91c1c",
            }}
          >
            {error}
          </div>
        )}


        {/* WORKS */}

        {!loading &&
          !error &&
          works.length > 0 && (

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >

              {works.map((work) => (

                <div
                  key={work.id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "14px",
                    overflow: "hidden",
                    boxShadow:
                      "0 6px 20px rgba(0,0,0,0.07)",
                  }}
                >

                  {/* IMAGE */}

                  <div
                    style={{
                      height: "220px",
                      background: "#e5e7eb",
                    }}
                  >

                    {work.image_url ? (

                      <img
                        src={
                          work.image_url.startsWith(
                            "http"
                          )
                            ? work.image_url
                            : `http://localhost:5000${work.image_url}`
                        }
                        alt={work.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />

                    ) : (

                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#6b7280",
                        }}
                      >
                        No Image
                      </div>

                    )}

                  </div>


                  {/* CONTENT */}

                  <div
                    style={{
                      padding: "20px",
                    }}
                  >

                    {/* WORK ID */}

                    <span
                      style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        fontWeight: "600",
                      }}
                    >
                      {work.work_id}
                    </span>


                    {/* TITLE */}

                    <h2
                      style={{
                        margin: "8px 0",
                        color: "#111827",
                        fontSize: "21px",
                      }}
                    >
                      {work.title}
                    </h2>


                    {/* CATEGORY */}

                    <p
                      style={{
                        margin: "0 0 8px",
                        color: "#6b7280",
                      }}
                    >
                      Category:{" "}
                      {work.category_name}
                    </p>


                    {/* DESCRIPTION */}

                    <p
                      style={{
                        margin: "0 0 18px",
                        color: "#6b7280",
                      }}
                    >
                      {work.description ||
                        "No description"}
                    </p>


                    {/* EDIT WORK */}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/admin/edit-work/${work.work_id}`
                        )
                      }
                      style={{
                        width: "100%",
                        border:
                          "1px solid #111827",
                        background: "#ffffff",
                        color: "#111827",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginBottom: "10px",
                      }}
                    >
                      Edit Work
                    </button>


                    {/* MANAGE MEDIA */}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/admin/manage-works/${work.work_id}`
                        )
                      }
                      style={{
                        width: "100%",
                        border: "none",
                        background: "#111827",
                        color: "#ffffff",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginBottom: "10px",
                      }}
                    >
                      Manage Photos & Videos
                    </button>


                    {/* DELETE WORK */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteWork(
                          work.id,
                          work.title
                        )
                      }
                      style={{
                        width: "100%",
                        border: "none",
                        background: "#dc2626",
                        color: "#ffffff",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "15px",
                        fontWeight: "600",
                      }}
                    >
                      Delete Work
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}


        {/* NO WORKS */}

        {!loading &&
          !error &&
          works.length === 0 && (

            <div
              style={{
                background: "#ffffff",
                padding: "40px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              No works found.
            </div>

          )}

      </div>

    </main>
  );
}

export default ManageWorks;