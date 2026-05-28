const Envelope = ({ title, intro, lines }) => (
  <div className="envelope-wrapper">
    <div className="envelope-flap" />
    <div className="envelope-bottom-left" />
    <div className="envelope-bottom-right" />

    <div className="envelope-letter">
      <div className="envelope-header-bar" />
      <h2 className="envelope-title">{title}</h2>
      <p className="envelope-intro">{intro}</p>
      <div className="envelope-divider" />

      <ul className="envelope-lines">
        {lines.map((line, i) => (
          <li key={i} className="envelope-line">
            <span className="envelope-icon">{line.icon}</span>
            <span className="envelope-label">{line.label}</span>
            <span className="envelope-value">{line.value}</span>
          </li>
        ))}
      </ul>

      <div className="envelope-seal">
        <span className="envelope-seal-char">封</span>
      </div>
    </div>
  </div>
);

export default Envelope;
