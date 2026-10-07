import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWorks } from "../../api/worksApi";
import "./Works.css";

const API_BASE_URL =
  "https://rk-welding-backend.onrender.com";

const Works = () => {
  const [works, setWorks] = useState([]);
  const [activeCategory, setActiveCategory] =
    useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWorks = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getWorks();

        if (data.success) {
          setWorks(data.works || []);
        } else {
          setError("Failed to load works");
        }
      } catch (error) {
        console.error(
          "Works loading error:",
          error
        );

        setError("Unable to load works");
      } finally {
        setLoading(false);
      }
    };

    loadWorks();
  }, []);

  const categories = [
    "All",
    ...new Set(
      works
        .map((work) => work.category_name)
        .filter(Boolean)
    ),
  ];

  const filteredWorks =
    activeCategory === "All"
      ? works
      : works.filter(
          (work) =>
            work.category_name ===
            activeCategory
        );

  return (
    <main className="works-page">

      {/* HERO */}

      <section className="works-hero">

        <div className="container">

          <p className="section-label">
            OUR WORK
          </p>

          <h1>
            Our Welding & Fabrication Works
          </h1>

          <p>
            Explore completed welding and
            fabrication works by RK Welding.
          </p>

        </div>

      </section>


      {/* WORKS */}

      <section className="works-section">

        <div className="container">

          {/* Loading */}

          {loading && (
            <div className="works-message">
              Loading works...
            </div>
          )}


          {/* Error */}

          {error && (
            <div className="works-message error">
              {error}
            </div>
          )}


          {/* Works Loaded */}

          {!loading && !error && (
            <>

              {/* CATEGORY FILTERS */}

              <div className="works-filters">

                {categories.map(
                  (category) => (

                    <button
                      key={category}
                      type="button"
                      className={
                        activeCategory ===
                        category
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setActiveCategory(
                          category
                        )
                      }
                    >
                      {category}
                    </button>

                  )
                )}

              </div>


              {/* WORK GRID */}

              <div className="works-grid">

                {filteredWorks.map(
                  (work) => (

                    <article
                      className="work-card"
                      key={work.work_id}
                    >

                      <Link
                        to={`/works/${work.work_id}`}
                        className="work-card-link"
                      >

                        {/* WORK IMAGE */}

                        <div className="work-card-image">

                          {work.image_url ? (

                            <img
                              src={
                                work.image_url.startsWith(
                                  "http"
                                )
                                  ? work.image_url
                                  : `${API_BASE_URL}${work.image_url}`
                              }
                              alt={work.title}
                              loading="lazy"
                            />

                          ) : (

                            <div className="work-card-placeholder">
                              {
                                work.category_name
                              }
                            </div>

                          )}

                        </div>


                        {/* WORK CONTENT */}

                        <div className="work-card-content">

                          <span className="work-card-id">
                            {work.work_id}
                          </span>

                          <h2>
                            {work.title}
                          </h2>

                          <p>
                            {work.description ||
                              "RK Welding fabrication work."}
                          </p>


                          {/* WORK META */}

                          <div className="work-card-meta">

                            <span>
                              {work.work_type ||
                                "Custom Work"}
                            </span>

                            <span>
                              {work.location ||
                                "Konijerla"}
                            </span>

                          </div>

                        </div>

                      </Link>

                    </article>

                  )
                )}

              </div>


              {/* NO WORKS */}

              {filteredWorks.length ===
                0 && (

                <div className="works-message">
                  No works found in this
                  category.
                </div>

              )}

            </>
          )}

        </div>

      </section>

    </main>
  );
};

export default Works;