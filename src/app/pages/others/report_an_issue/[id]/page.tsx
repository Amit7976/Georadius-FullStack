import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import MainContent from "./MainContent";
import { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata:Metadata = {
    title: "Report an Issue | Geo Radius News",
    description: "Spotted something wrong? Let us know. Report news issues, bugs, or violations on Geo Radius News.",
    keywords: ["report", "report issue", "flag news", "bug report", "help", "Geo Radius support"],
    alternates: {
        canonical: "https://georadiusnews.vercel.app/report",
    },
    openGraph: {
        title: "Report an Issue | Geo Radius News",
        description: "Help us maintain community standards by reporting content or technical issues.",
        url: "https://georadiusnews.vercel.app/report",
        siteName: "Geo Radius News",
        images: [{
            url: "https://georadiusnews.vercel.app/opengraph-image.png",
            width: 1200,
            height: 630,
            alt: "Report a Problem"
        }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Report an Issue | Geo Radius News",
        description: "Let us know if something needs fixing or review.",
        images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function ReportAnIssuePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const session = await auth();
    if (!session?.user) redirect("/pages/auth/signin");

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MainContent id={id} />
        </Suspense>
    );
}
