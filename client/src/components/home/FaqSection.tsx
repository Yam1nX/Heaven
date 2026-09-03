import { useState, useId, type KeyboardEvent } from "react";
import { ChevronDown, MessageCircle, ArrowUpRight } from "lucide-react";
import { faqs } from "@/data/studioContent";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const listId = useId();

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleItem(index);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = (index + 1) % faqs.length;
      setOpenIndex(next);
      document.getElementById(`${listId}-btn-${next}`)?.focus();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = (index - 1 + faqs.length) % faqs.length;
      setOpenIndex(prev);
      document.getElementById(`${listId}-btn-${prev}`)?.focus();
    }
  };

  return (
    <section
      id="faq"
      className="faq-section section-pad"
      aria-labelledby="faq-title"
    >
      <div className="section-heading-row">
        <div>
          <div className="section-index">
            11 <span>—</span> Good to know
          </div>

          <h2 id="faq-title">
            Questions,
            <br />
            <i>answered.</i>
          </h2>
        </div>

        <p>
          Everything homeowners usually ask before their first visit. Still
          curious? Send it straight to WhatsApp.
        </p>
      </div>

      <div className="faq-layout reveal">
        <div className="faq-list-wrapper">
          <div className="faq-list" role="region" aria-labelledby="faq-title">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              const btnId = `${listId}-btn-${index}`;
              const panelId = `${listId}-panel-${index}`;

              return (
                <div
                  className={`faq-item ${isOpen ? "open" : ""}`}
                  key={item.q}
                >
                  <button
                    id={btnId}
                    className="faq-question"
                    onClick={() => toggleItem(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="faq-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="faq-question-text">{item.q}</span>

                    <ChevronDown
                      size={16}
                      className="faq-chevron"
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={panelId}
                    className="faq-answer-wrapper"
                    role="region"
                    aria-labelledby={btnId}
                    hidden={!isOpen}
                  >
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="faq-side-panel">
          <div className="faq-side-content">
            <div className="faq-side-header">
              <MessageCircle size={24} aria-hidden="true" />
              <h3>Still have questions?</h3>
            </div>

            <p>
              Our team is here to help with anything specific to your space.
              Share your floor plan, room dimensions, or style preferences, and
              we'll guide you through the right choices.
            </p>

            <div className="faq-side-actions">
              <a href="https://wa.me/8801XXXXXXXXX" className="button button-brass">
                Chat on WhatsApp
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>

              <a href="#consultation" className="text-link">
                Book a consultation
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>

            <div className="faq-side-note">
              <span className="faq-side-note-label">Response time</span>
              <p>Usually within 2 hours during showroom hours</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}