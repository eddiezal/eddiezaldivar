import createMDX from "@next/mdx";

/** @type {import("next").NextConfig} */
const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX({
  // Treat MDX as a first-class page/route extension
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: { mdxRs: true } // keep this since you’re on Next 15.x
});
