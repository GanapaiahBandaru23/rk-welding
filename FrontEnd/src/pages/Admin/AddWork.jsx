import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddWork.css";

function AddWork() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [saving, setSaving] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [formData, setFormData] = useState({
    work_id: "",
    title: "",
    category_id: "",
    work_type: "",
    size: "",
    location: "Konijerla",
    description: "",
  });

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(
          "https://rk-welding-backend.onrender.com/api/categories"
        );

        const data = await response.json();

        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Category loading error:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Input change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Image select
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setSelectedImage(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      event.target.value = "";
      setSelectedImage(null);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG and WEBP images are allowed.");
      event.target.value = "";
      setSelectedImage(null);
      return;
    }

    setSelectedImage(file);
  };

  // Video select
  const handleVideoChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setSelectedVideo(null);
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert("Video size must be less than 50 MB.");
      event.target.value = "";
      setSelectedVideo(null);
      return;
    }

    const allowedTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only MP4, WEBM, MOV, AVI and MKV videos are allowed.");
      event.target.value = "";
      setSelectedVideo(null);
      return;
    }

    setSelectedVideo(file);
  };

  // Submit
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

      // ==========================================
      // STEP 1: CREATE WORK
      // ==========================================

      const workResponse = await fetch(
        "https://rk-welding-backend.onrender.com/api/works",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            category_id: Number(formData.category_id),
          }),
        }
      );

      const workData = await workResponse.json();

      if (!workResponse.ok || !workData.success) {
        alert(
          workData.message || "Failed to create work."
        );
        return;
      }

      const createdWork = workData.work;

      // ==========================================
      // STEP 2: UPLOAD IMAGE
      // ==========================================

      if (selectedImage) {
        const imageFormData = new FormData();

        imageFormData.append(
          "work_id",
          createdWork.id
        );

        imageFormData.append(
          "image",
          selectedImage
        );

        imageFormData.append(
          "sort_order",
          "0"
        );

        const imageResponse = await fetch(
          "https://rk-welding-backend.onrender.com/api/work-images",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: imageFormData,
          }
        );

        const imageData = await imageResponse.json();

        if (!imageResponse.ok || !imageData.success) {
          alert(
            imageData.message ||
              "Work created, but image upload failed."
          );

          navigate(
            `/works/${createdWork.work_id}`
          );

          return;
        }
      }

      // ==========================================
      // STEP 3: UPLOAD VIDEO
      // ==========================================

      if (selectedVideo) {
        const videoFormData = new FormData();

        videoFormData.append(
          "work_id",
          createdWork.id
        );

        videoFormData.append(
          "video",
          selectedVideo
        );

        videoFormData.append(
          "title",
          formData.title
        );

        const videoResponse = await fetch(
          "https://rk-welding-backend.onrender.com/api/work-videos",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: videoFormData,
          }
        );

        const videoData = await videoResponse.json();

        if (!videoResponse.ok || !videoData.success) {
          alert(
            videoData.message ||
              "Work and image added, but video upload failed."
          );

          navigate(
            `/works/${createdWork.work_id}`
          );

          return;
        }
      }

      // ==========================================
      // SUCCESS
      // ==========================================

      alert(
        "Work, image and video added successfully!"
      );

      navigate(
        `/works/${createdWork.work_id}`
      );

    } catch (error) {
      console.error("Add work error:", error);

      alert(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="add-work-page">

      {/* HEADER */}

      <section className="add-work-header">

        <div className="container">

          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/admin")}
          >
            ← Back to Dashboard
          </button>

          <p className="add-work-label">
            RK WELDING
          </p>

          <h1>
            Add New Work
          </h1>

          <p>
            Add a completed welding or fabrication
            project to your portfolio.
          </p>

        </div>

      </section>


      {/* FORM */}

      <section className="add-work-section">

        <div className="container">

          <form
            className="add-work-form"
            onSubmit={handleSubmit}
          >

            <div className="form-grid">

              {/* WORK ID */}

              <div className="form-group">

                <label htmlFor="work_id">
                  Work ID
                </label>

                <input
                  id="work_id"
                  name="work_id"
                  type="text"
                  placeholder="Example: RW-JCB001"
                  value={formData.work_id}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* TITLE */}

              <div className="form-group">

                <label htmlFor="title">
                  Work Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Example: JCB Welding Work"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* CATEGORY */}

              <div className="form-group">

                <label htmlFor="category_id">
                  Category
                </label>

                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    {loadingCategories
                      ? "Loading categories..."
                      : "Select Category"}
                  </option>

                  {categories.map((category) => (

                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>

                  ))}

                </select>

              </div>


              {/* WORK TYPE */}

              <div className="form-group">

                <label htmlFor="work_type">
                  Work Type
                </label>

                <input
                  id="work_type"
                  name="work_type"
                  type="text"
                  placeholder="Example: JCB Welding & Repair"
                  value={formData.work_type}
                  onChange={handleChange}
                />

              </div>


              {/* SIZE */}

              <div className="form-group">

                <label htmlFor="size">
                  Size
                </label>

                <input
                  id="size"
                  name="size"
                  type="text"
                  placeholder="Example: 12 × 7 feet"
                  value={formData.size}
                  onChange={handleChange}
                />

              </div>


              {/* LOCATION */}

              <div className="form-group">

                <label htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Example: Konijerla"
                  value={formData.location}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="6"
                placeholder="Describe this welding work..."
                value={formData.description}
                onChange={handleChange}
              />

            </div>


            {/* IMAGE */}

            <div className="form-group">

              <label htmlFor="work-image">
                Work Image
              </label>

              <input
                id="work-image"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
              />

              <small>
                JPG, JPEG, PNG or WEBP — Maximum 5 MB
              </small>

              {selectedImage && (
                <p>
                  Selected: {selectedImage.name}
                </p>
              )}

            </div>


            {/* VIDEO */}

            <div className="form-group">

              <label htmlFor="work-video">
                Work Video
              </label>

              <input
                id="work-video"
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/x-matroska"
                onChange={handleVideoChange}
              />

              <small>
                MP4, WEBM, MOV, AVI or MKV — Maximum 50 MB
              </small>

              {selectedVideo && (
                <p>
                  Selected: {selectedVideo.name}
                </p>
              )}

            </div>


            {/* BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate("/admin")}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Work"}
              </button>

            </div>

          </form>

        </div>

      </section>

    </main>
  );
}

export default AddWork;