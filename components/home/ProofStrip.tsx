/** A slim strip of deployment facts under the hero. No client names or logos. */
export default function ProofStrip() {
  return (
    <section aria-labelledby="proof-title" className="relative border-y border-line bg-surface/30 py-8">
      <div className="container-page">
        <h2 id="proof-title" className="sr-only">
          How Mise deploys
        </h2>
        <ul className="flex flex-wrap gap-2.5">
          {["0 integrations required", "Any phone", "1-property pilot"].map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[0.74rem] tracking-wide text-muted"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
