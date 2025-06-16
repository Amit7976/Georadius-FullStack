import MainContent from './MainContent';
import type { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
  title: "Terms & Conditions | Geo Radius News",
  description:
    "Read the official Terms & Conditions for using Geo Radius News. Understand your rights and responsibilities as a user.",
  keywords: [
    "terms and conditions",
    "geo radius terms",
    "user agreement",
    "terms of service",
    "Geo Radius News legal",
  ],
  alternates: {
    canonical: "https://georadiusnews.vercel.app/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Geo Radius News",
    description:
      "Explore the user agreement and terms of using Geo Radius News platform.",
    url: "https://georadiusnews.vercel.app/terms",
    siteName: "Geo Radius News",
    images: [
      {
        url: "https://georadiusnews.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Terms & Conditions - Geo Radius",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Geo Radius News",
    description:
      "Understand how to use Geo Radius News responsibly and legally.",
    images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
  },
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

function Page() {
  return <MainContent />;
}

export default Page;
