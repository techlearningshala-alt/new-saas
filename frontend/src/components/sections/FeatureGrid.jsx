export default function FeatureGrid({ heading, description, features, layout = 'grid' }) {
  return (
    <section id="features" className="mb-16 rounded-[32px] border border-white/10 bg-white/5 px-8 py-10 backdrop-blur">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-semibold text-white">{heading}</h2>
        {description ? <p className="mt-3 text-white/70">{description}</p> : null}
      </div>

      <div
        className={`mt-10 grid gap-6 ${
          layout === 'two-column' ? 'md:grid-cols-2' : 'md:grid-cols-3'
        }`}
      >
        {features?.map((feature, index) => (
          <article
            // eslint-disable-next-line react/no-array-index-key
            key={`${feature.title}-${index}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left text-white/80"
          >
            {feature.badge ? (
              <span className="text-xs uppercase tracking-[0.2em] text-white/60">{feature.badge}</span>
            ) : null}
            <h3 className="mt-2 text-xl font-semibold text-white">{feature.title}</h3>
            {feature.description ? <p className="mt-2 text-white/70">{feature.description}</p> : null}
            {feature.stat ? <p className="mt-4 text-3xl font-semibold text-white">{feature.stat}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
