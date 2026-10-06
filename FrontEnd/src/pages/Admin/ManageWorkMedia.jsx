
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./ManageWorkMedia.css";

const API_BASE_URL = "http://localhost:5000";

function ManageWorkMedia() {
  const navigate = useNavigate();
  const { workId } = useParams();

  const [work, setWork] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);


  // LOAD WORK + PHOTOS + VIDEOS
  const loadWorkMedia = async () => {
    try {
      setLoading(true);

      const worksResponse = await fetch(
        `${API_BASE_URL}/api/works`
      );

      const worksData = await worksResponse.json();

      if (!worksData.success) {
        alert("Unable to load works.");
        return;
      }

      const selectedWork = worksData.works.find(
        (item) =>
          item.work_id.trim() === workId.trim()
      );

      if (!selectedWork) {
        alert("Work not found.");
        navigate("/admin/manage-works");
        return;
      }

      setWork(selectedWork);


      // GET IMAGES
      const imageResponse = await fetch(
        `${API_BASE_URL}/api/work-images/${selectedWork.id}`
      );

      const imageData = await imageResponse.json();

      if (imageData.success) {
        setImages(imageData.images || []);
      }


      // GET VIDEOS
      const videoResponse = await fetch(
        `${API_BASE_URL}/api/work-videos/${selectedWork.id}`
      );

      const videoData = await videoResponse.json();

      if (videoData.success) {
        setVideos(videoData.videos || []);
      }

    } catch (error) {
      console.error(
        "Work media loading error:",
        error
      );

      alert(
        "Unable to connect to backend server."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadWorkMedia();
  }, [workId]);


  // IMAGE SELECT
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Image size must be less than 5 MB."
      );

      event.target.value = "";
      return;
    }

    setSelectedImage(file);
  };


  // VIDEO SELECT
  const handleVideoChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
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
      alert(
        "Only MP4, WEBM, MOV, AVI and MKV videos are allowed."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert(
        "Video size must be less than 50 MB."
      );

      event.target.value = "";
      return;
    }

    setSelectedVideo(file);
  };


  // UPLOAD IMAGE
  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    try {
      setUploadingImage(true);

      const token =
        localStorage.getItem("adminToken");

      if (!token) {
        alert("Admin login required.");
        navigate("/admin/login");
        return;
      }

      const formData = new FormData();

      formData.append(
        "work_id",
        work.id
      );

      formData.append(
        "image",
        selectedImage
      );

      formData.append(
        "sort_order",
        images.length
      );

      const response = await fetch(
        `${API_BASE_URL}/api/work-images`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        alert(
          data.message ||
            "Failed to upload image."
        );

        return;
      }

      alert(
        "Image added successfully!"
      );

      setSelectedImage(null);

      await loadWorkMedia();

    } catch (error) {
      console.error(
        "Image upload error:",
        error
      );

      alert(
        "Unable to upload image."
      );
    } finally {
      setUploadingImage(false);
    }
  };


  // DELETE IMAGE
  const handleDeleteImage = async (imageId) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this photo?"
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
        `${API_BASE_URL}/api/work-images/${imageId}`,
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
            "Failed to delete photo."
        );

        return;
      }

      alert(
        "Photo deleted successfully!"
      );

      await loadWorkMedia();

    } catch (error) {
      console.error(
        "Delete image error:",
        error
      );

      alert(
        "Unable to delete photo."
      );
    }
  };


  // UPLOAD VIDEO
  const handleVideoUpload = async () => {
    if (!selectedVideo) {
      alert("Please select a video first.");
      return;
    }

    try {
      setUploadingVideo(true);

      const token =
        localStorage.getItem("adminToken");

      if (!token) {
        alert("Admin login required.");
        navigate("/admin/login");
        return;
      }

      const formData = new FormData();

      formData.append(
        "work_id",
        work.id
      );

      formData.append(
        "video",
        selectedVideo
      );

      formData.append(
        "title",
        `${work.title} Video`
      );

      const response = await fetch(
        `${API_BASE_URL}/api/work-videos`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
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
            "Failed to upload video."
        );

        return;
      }

      alert(
        "Video added successfully!"
      );

      setSelectedVideo(null);

      await loadWorkMedia();

    } catch (error) {
      console.error(
        "Video upload error:",
        error
      );

      alert(
        "Unable to upload video."
      );
    } finally {
      setUploadingVideo(false);
    }
  };


  // DELETE VIDEO
  const handleDeleteVideo = async (videoId) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this video?"
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
        `${API_BASE_URL}/api/work-videos/${videoId}`,
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
            "Failed to delete video."
        );

        return;
      }

      alert(
        "Video deleted successfully!"
      );

      await loadWorkMedia();

    } catch (error) {
      console.error(
        "Delete video error:",
        error
      );

      alert(
        "Unable to delete video."
      );
    }
  };


  // LOADING
  if (loading) {
    return (
      <main className="manage-work-media-page">

        <div className="manage-work-media-container">

          <p>
            Loading work...
          </p>

        </div>

      </main>
    );
  }


  // WORK NOT FOUND
  if (!work) {
    return (
      <main className="manage-work-media-page">

        <div className="manage-work-media-container">

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


  return (
    <main className="manage-work-media-page">

      <div className="manage-work-media-container">


        {/* BACK BUTTON */}

        <button
          type="button"
          className="media-back-button"
          onClick={() =>
            navigate(
              "/admin/manage-works"
            )
          }
        >
          ← Back to Manage Works
        </button>


        {/* WORK HEADER */}

        <div className="media-header">

          <p>
            {work.work_id}
          </p>

          <h1>
            {work.title}
          </h1>

          <span>
            {work.category_name}
          </span>

        </div>


        {/* ADD PHOTOS */}

        <section className="media-section">

          <h2>
            Add Photos
          </h2>

          <p>
            Add more photos to this work.
          </p>

          <div className="upload-box">

            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
            />

            {selectedImage && (
              <p className="selected-file">
                Selected:{" "}
                {selectedImage.name}
              </p>
            )}

            <button
              type="button"
              onClick={handleImageUpload}
              disabled={
                uploadingImage ||
                !selectedImage
              }
            >
              {uploadingImage
                ? "Uploading..."
                : "Add Photo"}
            </button>

          </div>

        </section>


        {/* EXISTING PHOTOS */}

        <section className="media-section">

          <h2>
            Existing Photos
          </h2>

          {images.length === 0 ? (

            <p className="empty-media">
              No photos added yet.
            </p>

          ) : (

            <div className="media-image-grid">

              {images.map((image) => (

                <div
                  className="media-image-card"
                  key={image.id}
                >

                  <img
                    src={`${API_BASE_URL}${image.image_url}`}
                    alt={work.title}
                  />

                  <button
                    type="button"
                    className="delete-media-button"
                    onClick={() =>
                      handleDeleteImage(
                        image.id
                      )
                    }
                  >
                    Delete Photo
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* ADD VIDEOS */}

        <section className="media-section">

          <h2>
            Add Videos
          </h2>

          <p>
            Add a video showing this work.
          </p>

          <div className="upload-box">

            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/x-matroska"
              onChange={handleVideoChange}
            />

            {selectedVideo && (
              <p className="selected-file">
                Selected:{" "}
                {selectedVideo.name}
              </p>
            )}

            <button
              type="button"
              onClick={handleVideoUpload}
              disabled={
                uploadingVideo ||
                !selectedVideo
              }
            >
              {uploadingVideo
                ? "Uploading..."
                : "Add Video"}
            </button>

          </div>

        </section>


        {/* EXISTING VIDEOS */}

        <section className="media-section">

          <h2>
            Existing Videos
          </h2>

          {videos.length === 0 ? (

            <p className="empty-media">
              No videos added yet.
            </p>

          ) : (

            <div className="media-video-grid">

              {videos.map((video) => (

                <div
                  className="media-video-card"
                  key={video.id}
                >

                  <video
                    controls
                    preload="metadata"
                  >

                    <source
                      src={`${API_BASE_URL}${video.video_url}`}
                      type="video/mp4"
                    />

                    Your browser does not
                    support the video tag.

                  </video>

                  {video.title && (
                    <h3>
                      {video.title}
                    </h3>
                  )}

                  <button
                    type="button"
                    className="delete-media-button"
                    onClick={() =>
                      handleDeleteVideo(
                        video.id
                      )
                    }
                  >
                    Delete Video
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

export default ManageWorkMedia;