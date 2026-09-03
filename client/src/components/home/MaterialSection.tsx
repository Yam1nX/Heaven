import { useState } from "react";
import { materials, type Material } from "@/data/studioContent";


export function MaterialSection() {
  const [activeName, setActiveName] = useState<Material["name"]>(
    materials[0].name
  );
  const selected =
    materials.find(material => material.name === activeName) ?? materials[0];


  return (
    <section className="material-section section-pad">
      <div className="material-head">
        <div className="section-index">
          05 <span>—</span> Material library
        </div>
        <p>Good rooms are felt through the hand as much as the eye.</p>
      </div>
      <div className="material-body">
        <div
          className="material-display"
          style={{ backgroundColor: selected.color }}
        >
          <span>Material note</span>
          <strong>{selected.name}</strong>
        </div>
        <div className="material-details">
          <h2>
            Start with
            <br />
            <i>the feeling.</i>
          </h2>
          <p>
            {selected.detail}. A small decision here can set the tone for an
            entire room.
          </p>
          <div
            className="material-switcher"
            role="tablist"
            aria-label="Material library"
          >
            {materials.map(material => (
              <button
                key={material.name}
                onClick={() => setActiveName(material.name)}
                className={activeName === material.name ? "active" : ""}
                aria-label={`View ${material.name}`}
              >
                <span style={{ backgroundColor: material.color }} />
                <em>{material.name}</em>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}