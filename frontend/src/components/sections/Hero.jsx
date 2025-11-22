import Image from 'next/image';

export default function Hero({
  eyebrow,
  headline,
  description,
  primaryCtaLabel,
  primaryCtaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl,
  media,
  stats
}) {
  const mediaUrl = media?.url ?? media?.data?.attributes?.url;

  return (
    <section className="mb-20 grid gap-12 lg:grid-cols-2">
      <div className="space-y-6">
        {eyebrow ? (
          <p className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-widest text-white/60">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">{headline}</h1>
        {description ? <p className="text-lg text-white/70">{description}</p> : null}
        <div className="flex flex-wrap gap-3">
          {primaryCtaLabel ? (
            <a
              className="rounded-full bg-[var(--theme-primary)] px-6 py-3 font-medium text-white shadow-card transition hover:opacity-90"
              href={primaryCtaUrl ?? '#'}
            >
              {primaryCtaLabel}
            </a>
          ) : null}
          {secondaryCtaLabel ? (
            <a
              className="rounded-full border border-white/30 px-6 py-3 font-medium text-white/90"
              href={secondaryCtaUrl ?? '#'}
            >
              {secondaryCtaLabel}
            </a>
          ) : null}
        </div>

        {stats?.length ? (
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((item, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`${item.title}-${index}`}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-white/80"
              >
                <p className="text-sm uppercase tracking-widest text-white/50">{item.title}</p>
                <p className="text-2xl font-semibold text-white">{item.stat || item.description}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative rounded-[32px] border border-white/10 bg-white/5 p-6">
        {mediaUrl ? (
          <Image
            src={mediaUrl}
            alt={headline}
            width={1200}
            height={800}
            className="rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-full min-h-[320px] flex-col justify-between rounded-2xl border border-dashed border-white/20 p-8 text-white/60">
            <p>Drop screenshots or product media on this block from Strapi.</p>
            <div className="space-y-2 text-sm">
              <p>✔ Hero headline + CTA</p>
              <p>✔ Domain aware routing</p>
              <p>✔ Multi-tenant theming</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
