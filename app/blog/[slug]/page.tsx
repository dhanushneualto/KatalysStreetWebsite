import React from "react";
import { notFound } from "next/navigation";
import { createClient, OAuthStrategy, media } from "@wix/sdk";
import { posts } from "@wix/blog";

// ⚡ No "use client"! We are doing this Server-Side to bypass CORS completely.

const wixClient = createClient({
  modules: { posts },
  auth: OAuthStrategy({
    clientId: "4fe783ed-517a-45c5-bd3d-f8f26ce0792b",
  }),
});

// The same render function you already have!
const renderWixRichContent = (nodes: any[]) => {
  if (!nodes) return null;
  return nodes.map((node, index) => {
    if (node.type === "PARAGRAPH") {
      return (
        <p key={index} className="mb-6 leading-relaxed text-zinc-800">
          {node.nodes?.map((textNode: any, i: number) => {
            const isBold = textNode.textData?.decorations?.some((d: any) => d.type === "BOLD");
            return (
              <span key={i} className={isBold ? "font-bold text-black" : ""}>
                {textNode.textData?.text}
              </span>
            );
          })}
        </p>
      );
    }
    if (node.type === "HEADING") {
      const text = node.nodes?.map((n: any) => n.textData?.text).join("") || "";
      const level = node.headingData?.level || 2;
      if (level === 2) return <h2 key={index} className="text-3xl font-bold mt-12 mb-6">{text}</h2>;
      if (level === 3) return <h3 key={index} className="text-2xl font-bold mt-10 mb-4">{text}</h3>;
      return <h4 key={index} className="text-xl font-bold mt-8 mb-4">{text}</h4>;
    }
    if (node.type === "BULLETED_LIST") {
      return (
        <ul key={index} className="list-disc pl-6 mb-8 space-y-2 text-zinc-800">
          {node.nodes?.map((listItem: any, i: number) => (
            <li key={i}>
              {listItem.nodes?.map((p: any) => 
                p.nodes?.map((t: any, j: number) => <span key={j}>{t.textData?.text}</span>)
              )}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  });
};

// ⚡ Server Components pass params automatically!
// ⚡ Server Components pass params automatically!
export default async function SingleBlogPost({ params }: { params: { slug: string } }) {
  // Decode the slug to prevent special character bugs
  const slug = decodeURIComponent(params.slug);

  // ⚡ FIXED: Tell TypeScript this can be 'any' data, not just 'null'
  let post: any = null;

  try {
    // Fetching data directly on the Next.js server (Goodbye CORS!)
    const response = await wixClient.posts.getPostBySlug(slug, { 
      fieldsets: ['RICH_CONTENT'] 
    });
    
    if (response.post) {
      post = response.post;
    }
  } catch (error) {
    console.error("Error fetching single post:", error);
  }

  // If no post is found, show the Tiger!
  if (!post) {
    notFound(); 
  }

  // safely access coverMedia now that TypeScript knows 'post' is an object
  const rawImageUrl = post?.coverMedia?.image || post?.media?.wixMedia?.image;
  const finalCoverImage = rawImageUrl ? media.getImageUrl(rawImageUrl).url : "";
  
  return (
    <main className="min-h-screen bg-white text-black pt-32 pb-24 px-6">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
          {post?.title}
        </h1>
        
        {finalCoverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
              src={finalCoverImage} 
              alt={post?.title || "Blog cover image"} 
              className="w-full h-auto max-h-[600px] object-cover rounded-2xl mb-12 shadow-lg" 
          />
        )}

       <div className="prose prose-lg max-w-none">
          {/* Safely pass the rich content nodes */}
          {renderWixRichContent(post?.richContent?.nodes)}
        </div>
      </article>
    </main>
  );
}