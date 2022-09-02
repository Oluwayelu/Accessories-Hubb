/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  type: "website",
  titleTemplate: "%s | Accessories Hubb",
  defaultTitle: "Accessories Hubb",
  description:
    "🦸‍♀️ A super template for Next.js with a pack of incredible tools",
  canonical: "https://accessoriesshubb.vercel.app",
  site_name: "Accessories Hubb",
  openGraph: {
    url: "https://accessoriesshubb.vercel.app",
    title: "Accessories Hubb",
    description:
      "🦸‍♀️ A super template for Next.js with a pack of incredible tools",
    images: [
      {
        url: "https://accessoriesshubb.vercel.app/static/images/banner.jpg",
        width: 512,
        height: 256,
        alt: "Next-Plate Banner Image",
      },
    ],
    site_name: "Accessories Hubb",
  },
};

export default defaultSEOConfig;
