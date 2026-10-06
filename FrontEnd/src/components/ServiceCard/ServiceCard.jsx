import "./ServiceCard.css";

function ServiceCard({ number, title, description }) {
  return (
    <div className="service-card">

      <span className="service-number">
        {number}
      </span>

      <h3>{title}</h3>

      <p>{description}</p>

      <span className="service-arrow">
        →
      </span>

    </div>
  );
}

export default ServiceCard;