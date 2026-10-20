import { useId, useState } from "react";

// Horizontal bar chart in plain HTML. Bars grow from a zero baseline so small
// differences aren't exaggerated; one bar can be emphasized and the rest stay neutral.
// Every value is labeled at the bar tip and also available as a table.
export default function BarChart({ title, caption, data, max, format = (v) => v, reference, highlight, valueLabel = "Value" }) {
  const id = useId();
  const [active, setActive] = useState(null);
  const top = max ?? Math.max(...data.map((d) => d.value));
  const pct = (v) => `${(v / top) * 100}%`;
  const ticks = [0, 0.2, 0.4, 0.6, 0.8, 1].map((f) => f * top);
  const tick = (v) => (v === 0 ? "0" : String(Number(v.toFixed(2))));

  return (
    <figure className="chart" aria-labelledby={`${id}-title`}>
      <figcaption>
        <div className="chart-title" id={`${id}-title`}>
          {title}
        </div>
        {caption ? <p className="chart-caption">{caption}</p> : null}
      </figcaption>

      <div className="chart-plot" aria-hidden="true">
        {data.map((d) => {
          const emphasized = highlight ? highlight === d.label : true;
          return (
            <div
              key={d.label}
              className={`chart-row${active === d.label ? " active" : ""}`}
              onMouseEnter={() => setActive(d.label)}
              onMouseLeave={() => setActive(null)}
            >
              <span className={`chart-label${highlight === d.label ? " strong" : ""}`}>{d.label}</span>
              <span className="chart-track">
                {reference ? <span className="chart-ref-line" style={{ left: pct(reference.value) }} /> : null}
                <span className={`chart-bar${emphasized ? " emph" : ""}`} style={{ width: pct(d.value) }} />
                <span className="chart-value" style={{ left: pct(d.value) }}>
                  {format(d.value)}
                </span>
                {active === d.label && d.note ? <span className="chart-tip">{d.note}</span> : null}
              </span>
            </div>
          );
        })}

        <div className="chart-axis">
          <span />
          <span className="chart-scale">
            {ticks.map((t) => (
              <span key={t} style={{ left: pct(t) }}>
                {tick(t)}
              </span>
            ))}
            {reference ? (
              <span className="chart-ref" style={{ left: pct(reference.value) }}>
                <span className="chart-ref-line" />
                <b>{reference.label}</b>
              </span>
            ) : null}
          </span>
        </div>
      </div>

      <details className="chart-table">
        <summary>View as table</summary>
        <table>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">{valueLabel}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.label}>
                <th scope="row">{d.label}</th>
                <td>{format(d.value)}</td>
              </tr>
            ))}
            {reference ? (
              <tr>
                <th scope="row">{reference.label}</th>
                <td>{format(reference.value)}</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
