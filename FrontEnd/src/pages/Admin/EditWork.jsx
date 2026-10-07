import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./EditWork.css";

const API_BASE_URL =
  "https://rk-welding-backend.onrender.com";

function EditWork() {
  const navigate = useNavigate();
  const { workId } = useParams();

  const [work, setWork] = useState(null);
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [workType, setWorkType] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ========================================
  // LOAD WORK + CATEGORIES
  // ========================================
  const loadData = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      // ========================================
      // GET ALL WORKS
      // ========================================

      const worksResponse = await fetch(
        `${API_BASE_URL}/api/works`
      );

      const worksData =
        await worksResponse.json();

      if (!worksResponse.ok || !worksData.success) {
        alert(
          worksData.message ||
            "Unable to load works."
        );
        return;
      }

      // ========================================
      // FIND SELECTED WORK
      // ========================================

      const selectedWork =
        worksData.works.find(
          (item) =>
            String(item.work_id).trim() ===
            String(workId).trim()
        );

      if (!selectedWork) {
        alert("Work not found.");

        navigate("/admin/manage-works");

        return;
      }

      setWork(selectedWork);

      // ========================================
      // FILL EXISTING DATA
      // ========================================

      setTitle(
        selectedWork.title || ""
      );

      setCategoryId(
        selectedWork.category_id
          ? String(selectedWork.category_id)
          : ""
      );

      setWorkType(
        selectedWork.work_type || ""
      );

      setSize(
        selectedWork.size || ""
      );

      setLocation(
        selectedWork.location || ""
      );

      setDescription(
        selectedWork.description || ""
      );

      // ========================================
      // GET CATEGORIES
      // ========================================

      const categoriesResponse =
        await fetch(
          `${API_BASE_URL}/api/categories`
        );

      const categoriesData =
        await categoriesResponse.json();

      if (
        categoriesResponse.ok &&
        categoriesData.success
      ) {
        setCategories(
          categoriesData.categories || []
        );
      }
    } catch (error) {
      console.error(
        "Edit work loading error:",
        error
      );

      alert(
        "Unable to connect to backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD DATA ON PAGE LOAD
  // ========================================
  useEffect(() => {
    loadData();
  }, [workId]);

  // ========================================
  // UPDATE WORK
  // ========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter work title.");
      return;
    }

    if (!categoryId) {
      alert("Please select a category.");
      return;
    }

    try {
      setSaving(true);

      const token =
        localStorage.getItem("adminToken");

      if (!token) {
        alert("Admin login required.");

        navigate("/admin/login");

        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/works/${workId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: title.trim(),
            category_id: Number(categoryId),
            work_type: workType.trim(),
            size: size.trim(),
            location: location.trim(),
            description: description.trim(),
          }),
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
            "Failed to update work."
        );

        return;
      }

      alert(
        "Work updated successfully!"
      );

      navigate("/admin/manage-works");
    } catch (error) {
      console.error(
        "Update work error:",
        error
      );

      alert(
        "Unable to update work."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================
  if (loading) {
    return (
      <main className="edit-work-page">
        <div className="edit-work-container">
          <p>Loading work...</p>
        </div>
      </main>
    );
  }

  // ========================================
  // WORK NOT FOUND
  // ========================================
  if (!work) {
    return (
      <main className="edit-work-page">
        <div className="edit-work-container">
          <h1>
            Work not found
          </h1>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/manage-works"
              )
            }
          >
            Back to Manage Works
          </button>
        </div>
      </main>
    );
  }

  // ========================================
  // PAGE
  // ========================================
  return (
    <main className="edit-work-page">
      <div className="edit-work-container">

        {/* BACK BUTTON */}

        <button
          type="button"
          className="edit-back-button"
          onClick={() =>
            navigate(
              "/admin/manage-works"
            )
          }
        >
          ← Back to Manage Works
        </button>

        {/* HEADER */}

        <div className="edit-work-header">
          <p className="edit-work-id">
            {work.work_id}
          </p>

          <h1>
            Edit Work
          </h1>

          <p>
            Update the details of this work.
          </p>
        </div>

        {/* FORM */}

        <form
          className="edit-work-form"
          onSubmit={handleSubmit}
        >

          {/* WORK ID */}

          <div className="form-group">
            <label>
              Work ID
            </label>

            <input
              type="text"
              value={work.work_id}
              disabled
            />
          </div>

          {/* TITLE */}

          <div className="form-group">
            <label>
              Work Title
            </label>

            <input
              type="text"
              placeholder="Example: Modern Main Gate"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
            />
          </div>

          {/* CATEGORY */}

          <div className="form-group">
            <label>
              Category
            </label>

            <select
              value={categoryId}
              onChange={(event) =>
                setCategoryId(
                  event.target.value
                )
              }
            >
              <option value="">
                Select Category
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* WORK TYPE */}

          <div className="form-group">
            <label>
              Work Type
            </label>

            <input
              type="text"
              placeholder="Example: MS Gate Fabrication"
              value={workType}
              onChange={(event) =>
                setWorkType(
                  event.target.value
                )
              }
            />
          </div>

          {/* SIZE */}

          <div className="form-group">
            <label>
              Size
            </label>

            <input
              type="text"
              placeholder="Example: 12 × 7 ft"
              value={size}
              onChange={(event) =>
                setSize(
                  event.target.value
                )
              }
            />
          </div>

          {/* LOCATION */}

          <div className="form-group">
            <label>
              Location
            </label>

            <input
              type="text"
              placeholder="Example: Konijerla"
              value={location}
              onChange={(event) =>
                setLocation(
                  event.target.value
                )
              }
            />
          </div>

          {/* DESCRIPTION */}

          <div className="form-group">
            <label>
              Description
            </label>

            <textarea
              rows="6"
              placeholder="Describe this work..."
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
            />
          </div>

          {/* BUTTONS */}

          <div className="edit-work-actions">

            {/* CANCEL */}

            <button
              type="button"
              className="cancel-button"
              onClick={() =>
                navigate(
                  "/admin/manage-works"
                )
              }
            >
              Cancel
            </button>

            {/* UPDATE */}

            <button
              type="submit"
              className="update-button"
              disabled={saving}
            >
              {saving
                ? "Updating..."
                : "Update Work"}
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}

export default EditWork;