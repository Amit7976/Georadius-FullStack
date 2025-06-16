import MainContent from './MainContent';
import type { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
  title: "Privacy Policy | Geo Radius News",
  description:
    "Learn how Geo Radius News collects, uses, and protects your personal information while using our platform.",
  keywords: [
    "privacy policy",
    "data protection",
    "user data privacy",
    "geo radius privacy",
    "how we use data",
  ],
  alternates: {
    canonical: "https://georadiusnews.vercel.app/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Geo Radius News",
    description:
      "We value your privacy. Find out how we handle and safeguard your information.",
    url: "https://georadiusnews.vercel.app/privacy",
    siteName: "Geo Radius News",
    images: [
      {
        url: "https://georadiusnews.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Geo Radius",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Geo Radius News",
    description:
      "Your privacy is important to us. See how we manage your data.",
    images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
  },
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

function Page() {
  return <MainContent />;
}

export default Page;
