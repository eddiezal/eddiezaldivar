import type { MDXComponents } from "mdx/types";

/**
 * You can map MDX elements to styled React components here.
 * Returning `components` unchanged is fine; presence of this file
 * stabilizes Next’s MDX runtime.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
