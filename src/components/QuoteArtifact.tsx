import type { Quote } from "@/data/quotes";

/** Deliberately varied treatments so no two artifacts on the wall feel templated. */
export type Treatment = "surface" | "ink" | "note" | "terminal" | "plain";

const SPAN: Record<number, string> = {
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  12: "md:col-span-12",
};

function Dialogue({ quote, muted }: { quote: Quote; muted?: boolean }) {
  return (
    <div className="space-y-5">
      {quote.dialogue!.map((turn, i) => (
        <div key={i} className="flex gap-4">
          <span
            className={`shrink-0 text-xs tracking-widest ${
              i === 0 ? "text-accent-amber/60" : "text-accent-amber font-bold"
            }`}
          >
            {turn.speaker}:
          </span>
          <p
            className={`max-w-[46ch] text-pretty text-sm sm:text-base ${
              i === 0
                ? muted
                  ? "text-note-foreground/60"
                  : "text-ink/60"
                : "font-semibold" + (muted ? " text-note-foreground" : " text-ink")
            }`}
          >
            {turn.line}
          </p>
        </div>
      ))}
    </div>
  );
}

export function QuoteArtifact({
  quote,
  treatment,
  span = 4,
  index = 0,
}: {
  quote: Quote;
  treatment: Treatment;
  span?: number;
  index?: number;
}) {
  const base = `${SPAN[span]} artifact-in p-6 md:p-8 flex flex-col`;
  const delay = { animationDelay: `${Math.min(index, 12) * 60}ms` };

  if (treatment === "note") {
    return (
      <article
        className={`${base} bg-note text-note-foreground shadow-xl ring-1 ring-black/5 ${
          index % 2 ? "rotate-[1.2deg]" : "-rotate-[1.5deg]"
        }`}
        style={delay}
      >
        <p className="mb-6 border-b border-black/10 pb-2 text-[10px] font-bold uppercase tracking-widest">
          {quote.subject ?? "Note to self"}
        </p>
        {quote.dialogue ? (
          <Dialogue quote={quote} muted />
        ) : (
          <p className="font-serif text-2xl font-semibold leading-tight">“{quote.text}”</p>
        )}
        {quote.note && <p className="mt-4 text-xs italic opacity-70">({quote.note})</p>}
        <p className="mt-auto pt-6 text-[10px] uppercase tracking-widest opacity-50">
          REF_{quote.id}
        </p>
      </article>
    );
  }

  if (treatment === "ink") {
    return (
      <article className={`${base} bg-ink text-canvas justify-between`} style={delay}>
        <p className="text-[10px] font-bold uppercase tracking-widest">
          FILE_{quote.id} / {quote.subject}
        </p>
        {quote.dialogue ? (
          <div className="my-10 space-y-4">
            {quote.dialogue.map((t, i) => (
              <p
                key={i}
                className={`font-serif uppercase leading-none ${
                  i === 0 ? "text-xl opacity-50" : "text-3xl"
                }`}
              >
                {t.speaker}: {t.line}
              </p>
            ))}
          </div>
        ) : (
          <h3
            className={`my-10 font-serif font-medium leading-tight ${
              (quote.text?.length ?? 0) > 60
                ? "text-2xl"
                : "text-3xl uppercase leading-none md:text-4xl"
            }`}
          >
            {quote.text}
          </h3>
        )}
        <p className="text-xs italic opacity-60">
          {quote.note ? `(${quote.note})` : "Transcribed verbatim, no edits"}
        </p>
      </article>
    );
  }

  if (treatment === "terminal") {
    return (
      <article
        className={`${base} mask-slant min-h-[200px] justify-center bg-black/60 ring-1 ring-white/10`}
        style={delay}
      >
        <div className="mb-3 text-[10px] tracking-[0.3em] text-accent-amber/70">
          [SYSTEM_ALERT_{quote.id}]
        </div>
        {quote.dialogue ? (
          <Dialogue quote={quote} />
        ) : (
          <p className="text-xl tracking-tight text-ink md:text-2xl">“{quote.text}”</p>
        )}
        <div className="mt-4 text-[10px] text-ink/30">
          {quote.subject?.toUpperCase()} // {quote.note ? quote.note.toUpperCase() : "UNRESOLVED"}
        </div>
      </article>
    );
  }

  if (treatment === "plain") {
    return (
      <article className={`${base} border border-ink/10 justify-center`} style={delay}>
        <p className="mb-4 text-[10px] uppercase tracking-widest text-ink/30">
          {quote.id} — {quote.subject}
        </p>
        {quote.dialogue ? (
          <Dialogue quote={quote} />
        ) : (
          <p className="font-serif text-2xl italic leading-snug text-balance text-ink">
            “{quote.text}”
          </p>
        )}
        {quote.note && (
          <p className="mt-4 text-[10px] uppercase tracking-widest text-accent-amber/50">
            {quote.note}
          </p>
        )}
      </article>
    );
  }

  return (
    <article className={`${base} bg-surface/60 ring-1 ring-white/5`} style={delay}>
      <p className="mb-4 text-[10px] uppercase tracking-widest text-ink/40">
        Subject: {quote.subject}
      </p>
      {quote.dialogue ? (
        <Dialogue quote={quote} />
      ) : (
        <p className="font-serif text-xl italic text-pretty text-ink md:text-2xl">“{quote.text}”</p>
      )}
      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        {quote.note ? (
          <p className="text-[10px] uppercase tracking-widest text-accent-amber/50">{quote.note}</p>
        ) : (
          <span />
        )}
        <p className="text-[10px] text-ink/20">REF_{quote.id}</p>
      </div>
    </article>
  );
}
