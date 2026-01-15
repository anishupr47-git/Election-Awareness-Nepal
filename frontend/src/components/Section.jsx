export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-20 py-10">
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
          {subtitle ? <p className="text-slate-600 mt-1 max-w-2xl">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}
