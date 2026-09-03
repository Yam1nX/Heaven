import { process } from "@/data/studioContent";

export function ProcessSection() {
  return (
    <section id="process" className="process-section section-pad">
      <div className="section-heading-row process-heading">
        <div>
          <div className="section-index">
            07 <span>—</span> From thought to room
          </div>
          <h2>
            The way we
            <br />
            <i>work together.</i>
          </h2>
        </div>
        <p>
          A clear, considered process—so the path from first idea to final
          installation feels as good as the result.
        </p>
      </div>
      <div className="process-grid">
        {process.map(({ number, title, copy, icon: Icon }) => (
          <div className="process-step" key={number}>
            <div className="process-top">
              <span>{number}</span>
              <Icon size={19} strokeWidth={1.3} />
            </div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
