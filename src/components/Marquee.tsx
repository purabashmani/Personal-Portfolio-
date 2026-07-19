"use client";

const items = [
  "Venture Capital",
  "Private Equity",
  "Early-Stage Investing",
  "Entrepreneurship",
  "Startups",
  "Go-To-Market",
  "Founder Mindset",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <section className="relative py-5 overflow-hidden bg-canvas-alt border-y border-line">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-canvas-alt to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-canvas-alt to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`a-${i}`}
            className="mx-5 display text-xl font-semibold text-ink-soft select-none"
          >
            {item}
            <span className="ml-5 gradient-brand font-bold">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
