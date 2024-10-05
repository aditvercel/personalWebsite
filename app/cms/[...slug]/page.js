// app/cms/[slug]/page.js
import { notFound } from "next/navigation";

export default function CmsPage({ params }) {
  const { slug } = params;

  // Logic to determine if the slug exists
  const validPages = ["latestProject"]; // Define valid slugs

  if (!validPages.includes(slug)) {
    // If the slug is invalid, show the CMS-specific not-found page
    notFound();
  }

  return (
    <div>
      <h1>{slug} Page</h1>
      <p>Welcome to the {slug} page in CMS!</p>
    </div>
  );
}
