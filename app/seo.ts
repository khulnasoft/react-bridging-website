import { getSeo } from "./modules/remix-seo";

export const seo = getSeo({
  host: "https://reactbridging.com",
  titleTemplate: "%s | React Bridging",
  defaultTitle: "React Bridging",
  twitter: {
    site: "@remix_run",
    creator: "@remix_run",
    title: "React Bridging",
    card: "summary_large_image",
    image: {
      url: "/og-image.png",
      alt: "React Bridging logo",
    },
  },
  openGraph: {
    images: [
      {
        url: "/og-image.png",
        alt: "React Bridging logo",
        height: 627,
        width: 1200,
      },
    ],
    defaultImageHeight: 250,
    defaultImageWidth: 500,
  },
});
