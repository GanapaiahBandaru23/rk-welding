
import "./WorkCard.css";

function WorkCard({
  image,
  title,
  category,
  workId = "RW-G001",
}) {
  return (
    <div className="work-card">

      <div className="work-card-image">

        <img
          src={image}
          alt={title}
        />

      </div>


      <div className="work-card-content">

        <p className="work-card-category">
          {category}
        </p>

        <h3>
          {title}
        </h3>

        <a href={`/works/${workId.toLowerCase()}`}>
          View Details →
        </a>

      </div>

    </div>
  );
}

export default WorkCard;