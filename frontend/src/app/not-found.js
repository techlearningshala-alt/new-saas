export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-10 py-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">404</p>
        <h1 className="mt-4 text-3xl font-semibold">Landing page not found</h1>
        <p className="mt-4 text-white/70">
          Confirm that the domain and path exist inside Strapi or seed demo content.
        </p>
      </div>
    </div>
  );
}
