const Notebook = ({ title, body }) => (
  <div className="notebook-wrapper">
    <div className="notebook-spread">
      {/* left page */}
      <div className="notebook-page notebook-left">
        {[1, 2, 3].map((n) => (
          <div key={n} className="notebook-hole" />
        ))}
        <div className="notebook-margin-line" />
        <h2 className="notebook-title">{title}</h2>
        <div className="notebook-lines">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="notebook-line" />
          ))}
        </div>
      </div>

      {/* binding */}
      <div className="notebook-binding">
        {[1, 2, 3].map((n) => (
          <div key={n} className="notebook-ring" />
        ))}
      </div>

      {/* right page */}
      <div className="notebook-page notebook-right">
        <p className="notebook-body">{body}</p>
        <p className="notebook-date">2026.5</p>
      </div>
    </div>
  </div>
);

export default Notebook;
