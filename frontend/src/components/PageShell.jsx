import clsx from 'clsx';

const defaultPalette = {
  primary: '#2563eb',
  secondary: '#0f172a',
  accent: '#f97316',
  background: '#0f172a',
  text: '#f8fafc',
  muted: '#0f172a'
};

export default function PageShell({ theme, children }) {
  const palette = { ...defaultPalette, ...(theme ?? {}) };

  return (
    <div
      className={clsx(
        'min-h-screen w-full bg-[var(--theme-background)] text-[var(--theme-text)]',
        'transition-colors duration-500'
      )}
      style={{
        ['--theme-background']: palette.background,
        ['--theme-text']: palette.text,
        ['--theme-primary']: palette.primary,
        ['--theme-secondary']: palette.secondary,
        ['--theme-accent']: palette.accent,
        ['--theme-muted']: palette.muted
      }}
    >
      <div className="bg-[radial-gradient(circle_at_top,_#ffffff11,_transparent_50%)]">
        {children}
      </div>
    </div>
  );
}
