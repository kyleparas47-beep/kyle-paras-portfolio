import GlowButton from "../components/GlowButton";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta({ title: "Page not found" });
  return (
    <section className="page not-found">
      <div className="eyebrow">404</div>
      <h1 className="cs-title">bash: page: command not found</h1>
      <p className="lede">That page doesn't exist — it may have moved, or the link has a typo.</p>
      <div className="actions">
        <GlowButton className="btn primary" to="/">
          Back to home
        </GlowButton>
        <GlowButton className="btn ghost" to="/#projects">
          See projects
        </GlowButton>
      </div>
    </section>
  );
}
