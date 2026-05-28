const TAPE_COLORS = ["#f8d7a5", "#f6b6c3", "#d5e3bb", "#c7dbea"];

const Cards = ({ title, items }) => (
  <div className="cards-wrapper">
    <h2 className="cards-title">{title}</h2>
    <div className="cards-grid">
      {items.map((item, i) => (
        <div
          key={i}
          className="card-item"
          style={{ transform: `rotate(${(i - 1.5) * 2.5}deg)` }}
        >
          <div
            className="card-tape"
            style={{ background: TAPE_COLORS[i % TAPE_COLORS.length] }}
          />
          <h3 className="card-item-title">{item.title}</h3>
          <p className="card-item-body">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Cards;
