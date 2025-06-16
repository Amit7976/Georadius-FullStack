import MainContent from './MainContent';
import type { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
  title: "Cookie Policy | Geo Radius News",
  description:
    "Understand how Geo Radius News uses cookies to enhance user experience and site functionality.",
  keywords: [
    "cookie policy",
    "cookies on geo radius",
    "how cookies are used",
    "user tracking",
    "cookie usage policy",
  ],
  alternates: {
    canonical: "https://georadiusnews.vercel.app/cookies",
  },
  openGraph: {
    title: "Cookie Policy | Geo Radius News",
    description:
      "Learn how cookies are used on our site to provide personalized and secure services.",
    url: "https://georadiusnews.vercel.app/cookies",
    siteName: "Geo Radius News",
    images: [
      {
        url: "https://georadiusnews.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Cookie Policy - Geo Radius",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | Geo Radius News",
    description:
      "Detailed info on how and why we use cookies on Geo Radius News.",
    images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
  },
};


/////////////////////////////////////////////////////////////////////////////////////////////////////

function Page() {
  return <MainContent />;
}

export default Page;
