import Hero from './sections/Hero';
import FeatureGrid from './sections/FeatureGrid';
import Testimonials from './sections/Testimonials';
import CtaBanner from './sections/CtaBanner';

const SECTION_COMPONENTS = {
  'sections.hero': Hero,
  'sections.feature-grid': FeatureGrid,
  'sections.testimonials': Testimonials,
  'sections.cta-banner': CtaBanner
};

export default function TemplateRenderer({ sections }) {
  if (!sections?.length) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center text-white/80">
        <p>No sections configured yet. Add a hero, feature grid or CTA from Strapi.</p>
      </div>
    );
  }

  return sections.map((section, index) => {
    const Component = SECTION_COMPONENTS[section.__component];
    if (!Component) {
      return (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`${section.__component}-${index}`}
          className="mx-auto my-8 max-w-5xl rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-sm text-white/70"
        >
          Unsupported section type: <span className="font-mono">{section.__component}</span>
        </div>
      );
    }

    return (
      <Component
        // eslint-disable-next-line react/no-array-index-key
        key={`${section.__component}-${index}`}
        {...section}
      />
    );
  });
}
