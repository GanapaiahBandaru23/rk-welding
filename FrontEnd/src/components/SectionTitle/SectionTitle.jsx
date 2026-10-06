import "./SectionTitle.css";

function SectionTitle({ label, title, description }) {
  return (
    <div className="section-title">

      <p className="section-title-label">
        {label}
      </p>

      <h2>
        {title}
      </h2>

      {description && (
        <p className="section-title-description">
          {description}
        </p>
      )}

    </div>
  );
}

export default SectionTitle;