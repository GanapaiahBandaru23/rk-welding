
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import WorkCard from "../../components/WorkCard/WorkCard";

import {
  getWorks,
  getWorkDetails,
  getWorkImages,
  getWorkVideos,
} from "../../api/worksApi";

import "./WorkDetails.css";

const API_BASE_URL = "http://localhost:5000";

function WorkDetails() {
  const { workId } = useParams();

  const [currentWork, setCurrentWork] = useState(null);
  const [similarWorks, setSimilarWorks] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWorkDetails = async () => {
      try {
        setLoading(true);
        setError("");

        // Get selected work
        const workData = await getWorkDetails(workId);

        if (!workData.success) {
          setError("Work not found");
          return;
        }

        const work = workData.work || workData.data;

        setCurrentWork(work);

        // Get all works for Similar Designs
        const worksData = await getWorks();

        if (worksData.success) {
          const allWorks = worksData.works || [];

          const similar = allWorks.filter(
            (item) =>
              item.work_id !== work.work_id &&
              item.category_name === work.category_name
          );

          setSimilarWorks(similar);
        }

        // Get work images
        const imageData = await getWorkImages(work.id);

        if (imageData.success) {
          setImages(imageData.images || []);
        }

        // Get work videos
        const videoData = await getWorkVideos(work.id);

        if (videoData.success) {
          setVideos(videoData.videos || []);
        }
      } catch (error) {
        console.error("Work details loading error:", error);

        setError("Unable to load work details");
      } finally {
        setLoading(false);
      }
    };

    loadWorkDetails();
  }, [workId]);

  // Loading
  if (loading) {
    return (
      <div className="work-details-page">
        <Navbar />

        <main>
          <section className="work-not-found">
            <div className="container">
              <p>LOADING</p>

              <h1>
                Loading <span>work...</span>
              </h1>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Error / Work not found
  if (error || !currentWork) {
    return (
      <div className="work-details-page">
        <Navbar />

        <main>
          <section className="work-not-found">
            <div className="container">
              <p>WORK NOT FOUND</p>

              <h1>
                This work does not
                <span> exist.</span>
              </h1>

              <p>
                The work you are looking for could not be found.
              </p>

              <Link
                to="/works"
                className="back-to-works-button"
              >
                ← Back to Our Work
              </Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Main image
  const mainImage =
    images.length > 0
      ? `${API_BASE_URL}${images[0].image_url}`
      : currentWork.image_url
        ? `${API_BASE_URL}${currentWork.image_url}`
        : "";

  return (
    <div className="work-details-page">

      <Navbar />

      <main>

        {/* =========================
            HEADER
        ========================= */}

        <section className="work-details-header">

          <div className="container">

            <p className="work-details-category">
              {currentWork.category_name}
            </p>

            <h1>
              {currentWork.title}
            </h1>

            <p className="work-details-id">
              Work ID: {currentWork.work_id}
            </p>

          </div>

        </section>


        {/* =========================
            WORK DETAILS
        ========================= */}

        <section className="work-details-content">

          <div className="container">

            <div className="work-details-layout">

              {/* =========================
                  MAIN IMAGE
              ========================= */}

              <div className="work-details-image">

                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={`${currentWork.title} by RK Welding`}
                  />
                ) : (
                  <div className="work-image-placeholder">
                    {currentWork.title}
                  </div>
                )}

              </div>


              {/* =========================
                  INFORMATION
              ========================= */}

              <div className="work-details-info">

                <p className="work-info-label">
                  WORK DETAILS
                </p>

                <h2>
                  {currentWork.title}
                </h2>

                <p className="work-details-description">
                  {currentWork.description ||
                    "RK Welding fabrication work completed in Konijerla."}
                </p>


                {/* SPECIFICATIONS */}

                <div className="work-specifications">

                  <div className="work-specification">

                    <span>
                      Size
                    </span>

                    <strong>
                      {currentWork.size || "Custom"}
                    </strong>

                  </div>


                  <div className="work-specification">

                    <span>
                      Work Type
                    </span>

                    <strong>
                      {currentWork.work_type || "Custom Work"}
                    </strong>

                  </div>


                  <div className="work-specification">

                    <span>
                      Location
                    </span>

                    <strong>
                      {currentWork.location || "Konijerla"}
                    </strong>

                  </div>

                </div>


                {/* CONTACT BUTTONS */}

                <div className="work-details-buttons">

                  <a
                    href="tel:+917036903065"
                    className="work-call-button"
                  >
                    Call RK Welding
                  </a>

                  <a
                    href={`https://wa.me/7036903065?text=${encodeURIComponent(
                      `Hi RK Welding, I liked ${currentWork.title} (${currentWork.work_id}). I am interested in a similar design.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="work-whatsapp-button"
                  >
                    WhatsApp About This Design
                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            ALL PHOTOS
        ========================= */}

        {images.length > 0 && (

          <section className="work-gallery">

            <div className="container">

              <div className="similar-heading">

                <p>
                  PROJECT GALLERY
                </p>

                <h2>
                  Photos
                </h2>

              </div>

              <div className="work-gallery-grid">

                {images.map((image) => (

                  <div
                    className="work-gallery-item"
                    key={image.id}
                  >

                    <img
                      src={`${API_BASE_URL}${image.image_url}`}
                      alt={`${currentWork.title} - RK Welding`}
                      loading="lazy"
                    />

                  </div>

                ))}

              </div>

            </div>

          </section>

        )}


        {/* =========================
            VIDEOS
        ========================= */}

        {videos.length > 0 && (

          <section className="work-videos">

            <div className="container">

              <div className="similar-heading">

                <p>
                  PROJECT VIDEO
                </p>

                <h2>
                  Work Videos
                </h2>

              </div>

              <div className="work-video-grid">

                {videos.map((video) => (

                  <div
                    className="work-video-item"
                    key={video.id}
                  >

                    <video
                      controls
                      preload="metadata"
                      width="100%"
                    >

                      <source
                        src={`${API_BASE_URL}${video.video_url}`}
                        type="video/mp4"
                      />

                      Your browser does not support
                      the video tag.

                    </video>

                    {video.title && (
                      <h3>
                        {video.title}
                      </h3>
                    )}

                  </div>

                ))}

              </div>

            </div>

          </section>

        )}


        {/* =========================
            SIMILAR DESIGNS
        ========================= */}

        <section className="similar-designs">

          <div className="container">

            <div className="similar-heading">

              <p>
                MORE INSPIRATION
              </p>

              <h2>
                Similar Designs
              </h2>

            </div>


            {similarWorks.length > 0 ? (

              <div className="similar-designs-grid">

                {similarWorks.map((work) => (

                  <WorkCard
                    key={work.work_id}
                    image={
                      work.image_url
                        ? `${API_BASE_URL}${work.image_url}`
                        : ""
                    }
                    title={work.title}
                    category={work.category_name}
                    workId={work.work_id}
                  />

                ))}

              </div>

            ) : (

              <div className="similar-placeholder">

                <p>
                  More {(
                    currentWork.work_type ||
                    "fabrication"
                  ).toLowerCase()}{" "}
                  designs will be added as new RK Welding
                  projects are completed.
                </p>

              </div>

            )}

          </div>

        </section>


        {/* =========================
            FINAL CTA
        ========================= */}

        <section className="work-details-cta">

          <div className="container">

            <p>
              LIKE THIS DESIGN?
            </p>

            <h2>
              Let's Build a Similar
              <span>
                {" "}
                {currentWork.work_type || "Work"}.
              </span>
            </h2>

            <p>
              Contact RK Welding to discuss your design,
              measurements and fabrication requirements.
            </p>

            <div className="work-details-cta-buttons">

              <a
                href="tel:+917036903065"
                className="work-call-button"
              >
                Call RK Welding
              </a>

              <a
                href="https://wa.me/7036903065"
                target="_blank"
                rel="noreferrer"
                className="work-whatsapp-button"
              >
                WhatsApp
              </a>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default WorkDetails;

