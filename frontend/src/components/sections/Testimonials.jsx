export default function Testimonials({ heading, description, items, variant = 'grid' }) {
  return (
    <section className="mb-16 rounded-[32px] border border-white/10 bg-white/5 px-8 py-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-white">{heading}</h2>
        {description ? <p className="mt-3 text-white/70">{description}</p> : null}
      </div>

      <div
        className={`mt-10 grid gap-6 ${variant === 'carousel' ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}
      >
        {items?.map((item, index) => (
          <figure
            // eslint-disable-next-line react/no-array-index-key
            key={`${item.authorName}-${index}`}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80"
          >
            <blockquote className="text-base italic text-white/80">“{item.quote}”</blockquote>
            <figcaption className="mt-6 text-sm text-white/60">
              <p className="font-semibold text-white">{item.authorName}</p>
              <p>{item.authorTitle}</p>
              {item.company ? <p>{item.company}</p> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
