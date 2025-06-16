// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { auth } from "@/src/auth";
// import SearchResultsClient from "./SearchResultsClient";
// import type { Metadata } from "next";


// /////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////


// type Props = {
//     searchParams: { q?: string };
// };

// export function generateMetadata({ searchParams }: Props): Metadata {
//     const rawQuery = searchParams.q || "your search";
//     const decodedQuery = decodeURIComponent(rawQuery).trim();
//     const formatted =
//         decodedQuery.charAt(0).toUpperCase() + decodedQuery.slice(1);

//     return {
//         title: `${formatted} — Geo Radius News`,
//         description: `Explore HyperLocal news updates for "${formatted}". Discover verified stories shared by your local community in real-time.`,
//         keywords: [
//             `${formatted} local news`,
//             `news near me about ${formatted}`,
//             `geo news ${formatted}`,
//             "hyperlocal search results",
//             "location-based news",
//             "Geo Radius News",
//         ],
//         alternates: {
//             canonical: `https://georadiusnews.vercel.app/search/results?q=${encodeURIComponent(rawQuery)}`,
//         },
//         openGraph: {
//             title: `Search: "${formatted}" — Geo Radius News`,
//             description: `Find live local updates for "${formatted}" shared and verified by your neighborhood.`,
//             url: `https://georadiusnews.vercel.app/search/results?q=${encodeURIComponent(rawQuery)}`,
//             siteName: "Geo Radius News",
//             images: [
//                 {
//                     url: "https://georadiusnews.vercel.app/opengraph-image.png",
//                     width: 1200,
//                     height: 630,
//                     alt: "Geo Radius News Search",
//                 },
//             ],
//             locale: "en_US",
//             type: "website",
//         },
//         twitter: {
//             card: "summary_large_image",
//             title: `Search: "${formatted}" — Geo Radius News`,
//             description: `Get real-time local news updates related to "${formatted}".`,
//             images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
//         },
//     };
// }

// /////////////////////////////////////////////////////////////////////////////////////////////////////

// export default async function page() {

//     const cookieStore = await cookies();

//     /////////////////////////////////////////////////////////////////////////////////////////////////////

//     const LPS = cookieStore.get("LPS")?.value;
//     if (!LPS) redirect("/pages/onboarding/permissions/location");

//     /////////////////////////////////////////////////////////////////////////////////////////////////////

//     const session = await auth();
//     if (!session?.user) redirect("/pages/auth/signin");

//     /////////////////////////////////////////////////////////////////////////////////////////////////////

//     return (
//         <>
//             <SearchResultsClient />
//         </>
//     );
// }
