import MainContent from './MainContent';
import type { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
  title: "Community Guidelines | Geo Radius News",
  description:
    "Read the community rules and guidelines to ensure a respectful and safe experience for everyone on Geo Radius News.",
  keywords: [
    "community guidelines",
    "posting rules",
    "safe community practices",
    "news sharing rules",
    "geo radius community",
  ],
  alternates: {
    canonical: "https://georadiusnews.vercel.app/guidelines",
  },
  openGraph: {
    title: "Community Guidelines | Geo Radius News",
    description:
      "Follow our community rules to keep the platform respectful, inclusive, and helpful.",
    url: "https://georadiusnews.vercel.app/guidelines",
    siteName: "Geo Radius News",
    images: [
      {
        url: "https://georadiusnews.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Community Guidelines - Geo Radius",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Guidelines | Geo Radius News",
    description:
      "Help build a better local news space. See what’s allowed and what’s not on Geo Radius News.",
    images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
  },
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

function Page() {
  return <MainContent />;
}

export default Page;
