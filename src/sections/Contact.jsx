import { useState } from "react";
import GlowButton from "../components/GlowButton";
import { site } from "../data";
import { useToast } from "../hooks/useToast";

// Set VITE_FORM_ENDPOINT (e.g. a Formspree URL) to deliver messages directly.
// Without it, the form falls back to opening the visitor's email app.
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const mailtoFor = ({ name, email, message }) => {
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
};

const EMPTY = { name: "", email: "", message: "", _gotcha: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: "idle", text: "" });
  const [toast, showToast] = useToast();

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!FORM_ENDPOINT) {
      window.location.href = mailtoFor(form);
      setStatus({ state: "sent", text: "Your email app will open with this message ready to send." });
      return;
    }
    setStatus({ state: "sending", text: "Sending…" });
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setForm(EMPTY);
      setStatus({ state: "sent", text: "Thanks — your message was sent. I'll reply by email." });
    } catch {
      setStatus({ state: "error", text: "Couldn't send right now." });
    }
  };

  const copy = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast(`${label} copied`);
    } catch {
      showToast("Could not copy");
    }
  };

  const socials = site.socials.filter((s) => s.url);

  return (
    <section className="page" id="contact">
      <div className="contact-layout">
        <div className="cta-band">
          <div className="eyebrow">Get in touch</div>
          <h2 className="cta-title">
            Let's build
            <br />
            something useful
          </h2>
          <p className="contact-copy">
            Open to internships, freelance improvement work, and full-stack projects. Send a message, or reach me directly.
          </p>
          <ul className="contact-list">
            <li>
              <a href={`mailto:${site.email}`} onClick={() => copy("Email", site.email)}>
                <span className="label">Email</span>
                {site.email}
              </a>
            </li>
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  <span className="label">{s.label}</span>
                  {s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗
                </a>
              </li>
            ))}
            <li>
              <span className="label">Location</span>
              {site.location} · remote or on-site
            </li>
          </ul>
        </div>
        <form className="mail-form card" onSubmit={submit}>
          <h3 className="card-title full">Send a message</h3>
          <label>
            Your name
            <input required name="name" autoComplete="name" value={form.name} onChange={update("name")} />
          </label>
          <label>
            Your email
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={update("email")}
            />
          </label>
          <label className="full">
            Message
            <textarea
              required
              name="message"
              rows={6}
              value={form.message}
              onChange={update("message")}
              placeholder="Hello Kyle — I'd like to talk about..."
            />
          </label>
          {/* Honeypot: hidden from people, filled in by spam bots. */}
          <input
            className="honeypot"
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form._gotcha}
            onChange={update("_gotcha")}
          />
          <div className="form-actions">
            <GlowButton className="btn primary" type="submit" disabled={status.state === "sending"}>
              {FORM_ENDPOINT ? "Send message" : "Send email"}
            </GlowButton>
            {status.text ? (
              <p className={`form-status${status.state === "error" ? " error" : ""}`} role="status">
                {status.text}
                {status.state === "error" ? (
                  <>
                    {" "}
                    <a href={mailtoFor(form)}>Email it instead</a>.
                  </>
                ) : null}
              </p>
            ) : null}
          </div>
        </form>
      </div>
      <div className={`toast${toast ? " show" : ""}`} role="status">
        {toast}
      </div>
    </section>
  );
}
