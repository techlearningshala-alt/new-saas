export default function CtaBanner({ heading, body, ctaLabel, ctaUrl, variant = 'solid' }) {
  const baseClasses =
    variant === 'outline'
      ? 'border border-white/40 bg-transparent'
      : 'bg-[var(--theme-primary)]';

  return (
    <section className="rounded-[32px] border border-white/10 bg-white/5 px-8 py-12">
      <div className="flex flex-col gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div>
          <h3 className="text-3xl font-semibold text-white">{heading}</h3>
          {body ? <p className="mt-3 text-white/70">{body}</p> : null}
        </div>
        {ctaLabel ? (
          <a
            href={ctaUrl ?? '#'}
            className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold text-white shadow-card ${baseClasses}`}
          >
            {ctaLabel}
          </a>
        ) : null}
      </div>
    </section>
  );
}
