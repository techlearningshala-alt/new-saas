import GtmScript from './GtmScript';
import PageShell from './PageShell';
import TemplateRenderer from './TemplateRenderer';

export default function LandingPageView({ page }) {
  const sections =
    page.sections?.length > 0
      ? page.sections
      : page.template?.sections ?? [];
  const theme =
    page.theme && Object.keys(page.theme).length
      ? page.theme
      : page.template?.defaultTheme;

  return (
    <>
      <GtmScript gtmId={page.gtmContainerId} />
      <PageShell theme={theme}>
        <main className="mx-auto max-w-6xl px-6 pb-24 pt-16">
          {page.isFallback ? (
            <div className="mb-8 rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm text-white/80 backdrop-blur">
              Rendering static fallback content because Strapi was unreachable.
            </div>
          ) : null}

          <TemplateRenderer sections={sections} />
        </main>
      </PageShell>
    </>
  );
}
