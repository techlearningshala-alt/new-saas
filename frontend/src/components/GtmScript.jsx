/* eslint-disable @next/next/no-sync-scripts */
'use client';

import Script from 'next/script';

export default function GtmScript({ gtmId }) {
  if (!gtmId) return null;

  const snippet = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${gtmId}');`;

  return (
    <>
      <Script id={`gtm-base-${gtmId}`} dangerouslySetInnerHTML={{ __html: snippet }} />
      <noscript>
        <iframe
          title="gtm"
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
