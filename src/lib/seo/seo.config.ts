import { DefaultSeoProps } from 'next-seo';

const seoConfig: DefaultSeoProps = {
  defaultTitle: 'Daabo',
  titleTemplate: '%s | Daabo',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: process.env.SITE_URL || 'https://app.getdaabo.com.ng',
    site_name: 'Daabo',
  },
  twitter: {
    handle: '@daaboprotection',
    site: '@daaboprotection',
    cardType: 'summary_large_image',
  },
};

export default seoConfig;
