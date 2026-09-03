import {
  ArrowUpRight,
  Check,
  ImagePlus,
  MessageCircle,
  MessagesSquare,
  RefreshCcw,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import type { StudioBrief } from "@/hooks/useStudioBrief";
import { AI_GUIDE_EVENTS, trackAIGuideEvent } from "@/lib/roomGuideUx";
import {
  aiLoadingMessages,
  budgetOptions,
  feelingOptions,
  roomOptions,
  timingOptions,
} from "@/data/studioContent";

export function StudioBriefSection(brief: StudioBrief) {
  return (
    <section id="studio-brief" className="brief-section">
      <div className="brief-intro">
        <div className="section-index">
          08 <span>—</span> Your studio brief
        </div>
        <h2>
          Give us a<br />
          <i>place to start.</i>
        </h2>
        <p>
          Four practical choices help us understand what you’re imagining. Your
          note will open a direct WhatsApp conversation with our team.
        </p>
        <div className="brief-side-note">
          <MessageCircle size={15} /> No forms. No pressure. Just a useful first
          conversation.
        </div>
      </div>

      <div className="brief-panel">
        <div className="brief-progress" role="status" aria-live="polite">
          <div className="brief-progress-track">
            <div
              className="brief-progress-fill"
              style={{ width: `${(brief.completedSteps / 4) * 100}%` }}
            />
          </div>
          <span>{brief.completedSteps} / 4 selected</span>
        </div>

        <div className="image-upload-block">
          <div>
            <span className="handoff-label">Optional / see your room</span>
            <p>
              Upload a room photo for visual notes on layout, light, materials,
              and scale.
            </p>
          </div>
          <label
            className={`upload-drop ${brief.roomImage ? "has-image" : ""}`}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={brief.handleRoomImage}
            />
            <span className="upload-icon">
              {brief.roomImage ? (
                <img src={brief.roomImage} alt="Your uploaded room preview" />
              ) : (
                <ImagePlus size={20} />
              )}
            </span>
            <span>{brief.roomImageName || "Add a room photo"}</span>
            <small>JPG, PNG or WEBP / max 5MB</small>
          </label>
          {brief.roomImage && (
            <button className="clear-upload" onClick={brief.clearRoomImage}>
              Remove photo
            </button>
          )}
          {brief.uploadError && (
            <p className="upload-error" role="alert">
              {brief.uploadError}
            </p>
          )}
        </div>

        <div className="brief-steps">
          <BriefStep
            number="01"
            label="Which room are we shaping?"
            options={roomOptions}
            value={brief.room}
            onSelect={brief.setRoom}
          />
          <BriefStep
            number="02"
            label="What should it feel like?"
            options={feelingOptions}
            value={brief.feeling}
            onSelect={brief.setFeeling}
          />
          <BriefStep
            number="03"
            label="Where are you in the process?"
            options={timingOptions}
            value={brief.timing}
            onSelect={brief.setTiming}
          />
          <BriefStep
            number="04"
            label="How should we think about budget?"
            options={budgetOptions}
            value={brief.budget}
            onSelect={brief.setBudget}
          />
        </div>

        <div className={`brief-handoff ${brief.briefReady ? "ready" : ""}`}>
          <div>
            <span className="handoff-label">Your note to Heaven</span>
            <p>
              {brief.briefReady
                ? `A ${brief.feeling.toLowerCase()} ${brief.room.toLowerCase()} project, ${brief.timing.toLowerCase()}, with a ${brief.budget.toLowerCase()}.`
                : "Choose four options above and your handoff will appear here."}
            </p>
          </div>
          <button
            className="button button-ai"
            onClick={brief.runRoomGuide}
            disabled={!brief.briefReady || brief.isPending}
          >
            {brief.isPending ? "Reading your room" : "Get my room guide"}{" "}
            <ArrowUpRight size={16} />
          </button>
        </div>

        {brief.isPending && (
          <div className="ai-loading" role="status" aria-live="polite">
            <div className="ai-loader">
              <span />
              <span />
              <span />
            </div>
            <div>
              <span className="handoff-label">
                Heaven intelligence / in progress
              </span>
              <p>{aiLoadingMessages[brief.loadingStage]}</p>
              <div className="loading-track">
                <span style={{ width: `${35 + brief.loadingStage * 28}%` }} />
              </div>
            </div>
          </div>
        )}

        {(brief.guideResult || brief.guideHasError) && (
          <div className={`guide-result ${brief.guideHasError ? "error" : ""}`}>
            {brief.guideHasError ? (
              <>
                <div className="guide-error-copy">
                  <span className="handoff-label">
                    {brief.guideErrorCopy.title}
                  </span>
                  <p>{brief.guideErrorCopy.copy}</p>
                </div>
                <div className="error-actions">
                  <button
                    className="button button-ai"
                    onClick={brief.runRoomGuide}
                  >
                    Try again <RefreshCcw size={15} />
                  </button>
                  <a
                    className="button button-brass"
                    href={brief.whatsappLink}
                    onClick={() =>
                      trackAIGuideEvent(AI_GUIDE_EVENTS.whatsappHandoff, {
                        source: "error",
                      })
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    Send my brief on WhatsApp <ArrowUpRight size={16} />
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="guide-result-heading">
                  <div>
                    <span className="handoff-label">
                      Your room guide / {brief.guideResult?.title}
                    </span>
                    <p>{brief.guideResult?.summary}</p>
                  </div>
                  <span className="result-badge">
                    <Sparkles size={13} /> intelligence ready
                  </span>
                </div>
                <div className="guide-signal-rail">
                  <span>
                    <ScanSearch size={14} />
                    <small>01 / see</small>
                    <strong>Room signals</strong>
                  </span>
                  <span>
                    <Sparkles size={14} />
                    <small>02 / shape</small>
                    <strong>Personal direction</strong>
                  </span>
                  <span>
                    <MessagesSquare size={14} />
                    <small>03 / meet</small>
                    <strong>Consultation ready</strong>
                  </span>
                </div>
                <div className="visual-read">
                  <span className="guide-block-label">01 / See the room</span>
                  <strong>Visual read</strong>
                  <span>{brief.guideResult?.visualRead}</span>
                </div>
                <div className="guide-grid">
                  <div>
                    <span className="guide-block-label">
                      02 / Shape the room
                    </span>
                    <strong>Start here</strong>
                    <span>{brief.guideResult?.startingPoint}</span>
                  </div>
                  <div>
                    <span className="guide-block-label">Material cue</span>
                    <strong>Material direction</strong>
                    <span>{brief.guideResult?.materialDirection}</span>
                  </div>
                  <div>
                    <span className="guide-block-label">Room logic</span>
                    <strong>Practical note</strong>
                    <span>{brief.guideResult?.planningTip}</span>
                  </div>
                  <div>
                    <span className="guide-block-label">
                      03 / Meet the maker
                    </span>
                    <strong>Ask your consultant</strong>
                    <span>{brief.guideResult?.consultationQuestion}</span>
                  </div>
                </div>
                <div className="next-steps">
                  <strong>Next steps for your room</strong>
                  <ol>
                    {brief.guideResult?.personalizedNextSteps?.map(step => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
                <a
                  className="button button-brass"
                  href={brief.whatsappLink}
                  onClick={() =>
                    trackAIGuideEvent(AI_GUIDE_EVENTS.whatsappHandoff, {
                      source: "guide_result",
                    })
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Share this brief on WhatsApp <ArrowUpRight size={16} />
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function BriefStep({
  number,
  label,
  options,
  value,
  onSelect,
}: {
  number: string;
  label: string;
  options: string[];
  value: string;
  onSelect: (option: string) => void;
}) {
  return (
    <div className="brief-step">
      <span className={value ? "step-done" : ""}>{number}</span>
      <div>
        <strong>{label}</strong>
        <div className="choice-list">
          {options.map(option => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={value === option ? "selected" : ""}
            >
              {option}
              {value === option && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
