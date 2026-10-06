import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

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

  const loadCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/categories"
      );

      const data = await response.json();

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Category loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);

    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        alert("Admin login required.");
        navigate("/admin/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message || "Failed to add category."
        );
        return;
      }

      alert("Category added successfully!");

      setFormData({
        name: "",
        slug: "",
        description: "",
      });

      loadCategories();
    } catch (error) {
      console.error("Add category error:", error);

      alert(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="categories-page">
      <div className="categories-container">

        <button
          type="button"
          className="categories-back-button"
          onClick={() => navigate("/admin")}
        >
          ← Back to Dashboard
        </button>

        <div className="categories-header">
          <h1>Manage Categories</h1>
          <p>
            Add and manage RK Welding work categories.
          </p>
        </div>

        {/* Add Category */}
        <section className="category-section">
          <h2>Add New Category</h2>

          <form onSubmit={handleSubmit}>

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
                onChange={handleNameChange}
                required
              />
            </div>

            <div className="category-form-group">
              <label htmlFor="category-slug">
                Slug
              </label>

              <input
                id="category-slug"
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />

              <small className="category-help-text">
                Example: harvester-works
              </small>
            </div>

            <div className="category-form-group">
              <label htmlFor="category-description">
                Description
              </label>

              <textarea
                id="category-description"
                name="description"
                placeholder="Describe this category..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

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

        {/* Existing Categories */}
        <section className="category-section">
          <h2>Existing Categories</h2>

          {loading ? (
            <p className="no-categories">
              Loading categories...
            </p>
          ) : categories.length === 0 ? (
            <p className="no-categories">
              No categories found.
            </p>
          ) : (
            <div className="categories-list">

              {categories.map((category) => (
                <div
                  className="category-card"
                  key={category.id}
                >
                  <span className="category-id">
                    CATEGORY #{category.id}
                  </span>

                  <h3>
                    {category.name}
                  </h3>

                  <p>
                    {category.description ||
                      "No description"}
                  </p>
                </div>
              ))}

            </div>
          )}
        </section>

      </div>
    </main>
  );
}

export default Categories;