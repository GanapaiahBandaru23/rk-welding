import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

const API_BASE_URL =
  "https://rk-welding-backend.onrender.com";

function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  // ========================================
  // LOAD CATEGORIES
  // ========================================
  const loadCategories = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/categories`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error(
          data.message ||
            "Failed to load categories."
        );
        return;
      }

      setCategories(
        data.categories || []
      );
    } catch (error) {
      console.error(
        "Category loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD ON PAGE OPEN
  // ========================================
  useEffect(() => {
    loadCategories();
  }, []);

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================
  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ========================================
  // HANDLE CATEGORY NAME
  // AUTO GENERATE SLUG
  // ========================================
  const handleNameChange = (event) => {
    const name = event.target.value;

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((previousData) => ({
      ...previousData,
      name,
      slug,
    }));
  };

  // ========================================
  // ADD CATEGORY
  // ========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter category name.");
      return;
    }

    if (!formData.slug.trim()) {
      alert("Please enter category slug.");
      return;
    }

    try {
      setSaving(true);

      const token =
        localStorage.getItem(
          "adminToken"
        );

      if (!token) {
        alert("Admin login required.");
        navigate("/admin/login");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/categories`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: formData.name.trim(),
            slug: formData.slug.trim(),
            description:
              formData.description.trim(),
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
            "Failed to add category."
        );

        return;
      }

      alert(
        "Category added successfully!"
      );

      // Clear form
      setFormData({
        name: "",
        slug: "",
        description: "",
      });

      // Reload categories
      await loadCategories();

    } catch (error) {
      console.error(
        "Add category error:",
        error
      );

      alert(
        "Unable to connect to backend server."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // PAGE
  // ========================================
  return (
    <main className="categories-page">
      <div className="categories-container">

        {/* BACK BUTTON */}

        <button
          type="button"
          className="categories-back-button"
          onClick={() =>
            navigate("/admin")
          }
        >
          ← Back to Dashboard
        </button>

        {/* HEADER */}

        <div className="categories-header">
          <h1>
            Manage Categories
          </h1>

          <p>
            Add and manage RK Welding
            work categories.
          </p>
        </div>

        {/* ADD CATEGORY */}

        <section className="category-section">
          <h2>
            Add New Category
          </h2>

          <form
            onSubmit={handleSubmit}
          >

            {/* CATEGORY NAME */}

            <div className="category-form-group">
              <label htmlFor="category-name">
                Category Name
              </label>

              <input
                id="category-name"
                type="text"
                name="name"
                placeholder="Example: Harvester Works"
                value={formData.name}
                onChange={
                  handleNameChange
                }
                required
              />
            </div>

            {/* SLUG */}

            <div className="category-form-group">
              <label htmlFor="category-slug">
                Slug
              </label>

              <input
                id="category-slug"
                type="text"
                name="slug"
                value={formData.slug}
                onChange={
                  handleChange
                }
                required
              />

              <small className="category-help-text">
                Example:
                harvester-works
              </small>
            </div>

            {/* DESCRIPTION */}

            <div className="category-form-group">
              <label htmlFor="category-description">
                Description
              </label>

              <textarea
                id="category-description"
                name="description"
                placeholder="Describe this category..."
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                rows="4"
              />
            </div>

            {/* ADD BUTTON */}

            <button
              type="submit"
              className="add-category-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Add Category"}
            </button>

          </form>
        </section>

        {/* EXISTING CATEGORIES */}

        <section className="category-section">
          <h2>
            Existing Categories
          </h2>

          {loading ? (
            <p className="no-categories">
              Loading categories...
            </p>
          ) : categories.length ===
            0 ? (
            <p className="no-categories">
              No categories found.
            </p>
          ) : (
            <div className="categories-list">

              {categories.map(
                (category) => (
                  <div
                    className="category-card"
                    key={category.id}
                  >

                    <span className="category-id">
                      CATEGORY #
                      {category.id}
                    </span>

                    <h3>
                      {category.name}
                    </h3>

                    <p>
                      {category.description ||
                        "No description"}
                    </p>

                  </div>
                )
              )}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}

export default Categories;