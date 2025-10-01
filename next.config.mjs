import createMDX from "@next/mdx";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: { providerImportSource: "@mdx-js/react" }
});

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
});

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts", "mdx"],
  experimental: {
    mdxRs: true,                  // RSC-friendly MDX
    optimizePackageImports: ["react"]
  },
  images: { formats: ["image/avif", "image/webp"] }
};

export default withAnalyzer(withMDX(nextConfig));
