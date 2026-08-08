"use client";

import React, { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { createClient, OAuthStrategy, media } from "@wix/sdk";
import { posts } from "@wix/blog";

const wixClient = createClient({
  modules: { posts },
  auth: OAuthStrategy({
    clientId: "4fe783ed-517a-45c5-bd3d-f8f26ce0792b",
  }),
});

// This function reads the Wix nodes and converts them to React HTML
const renderWixRichContent = (nodes: any[]) => {
  if (!nodes) return null;

  return nodes.map((node, index) => {
    // 1. Render Paragraphs
    if (node.type === "PARAGRAPH") {
      return (
        <p key={index} className="mb-6 leading-relaxed text-zinc-800">
          {node.nodes?.map((textNode: any, i: number) => {
            // Check for bold text
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

    // 2. Render Headings
    if (node.type === "HEADING") {
      const text = node.nodes?.map((n: any) => n.textData?.text).join("") || "";
      const level = node.headingData?.level || 2;
      
      if (level === 2) return <h2 key={index} className="text-3xl font-bold mt-12 mb-6">{text}</h2>;
      if (level === 3) return <h3 key={index} className="text-2xl font-bold mt-10 mb-4">{text}</h3>;
      return <h4 key={index} className="text-xl font-bold mt-8 mb-4">{text}</h4>;
    }

    // 3. Render Bulleted Lists
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

    // Return nothing for unknown node types so the page doesn't crash
    return null;
  });
};

export default function SingleBlogPost() {
  // ⚡ Safely extract the slug from the URL
  const params = useParams(); 
  const slug = params?.slug as string;

  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ⚡ Wait until the slug is fully ready in production before fetching
    if (!slug) return;

    async function fetchSinglePost() {
      try {
        // Fetch individual blog post using Get Post By Slug and explicitly ask for full rich content data
        const response = await wixClient.posts.getPostBySlug(slug, { 
          fieldsets: ['RICH_CONTENT'] 
        });
        
        if (response.post) {
          setPost(response.post);
        }
      } catch (error) {
        console.error("Error fetching single post:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSinglePost();
  }, [slug]); // ⚡ Ensure the effect is listening to our safe 'slug' variable

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white text-black pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto animate-pulse">
          
          {/* Back button or Breadcrumb placeholder */}
          <div className="w-24 h-4 bg-zinc-200 rounded mb-12"></div>

          {/* Huge Article Title Skeleton */}
          <div className="h-10 md:h-16 bg-zinc-200 rounded w-4/5 mb-4"></div>
          <div className="h-10 md:h-16 bg-zinc-200 rounded w-2/3 mb-10"></div>
          
          {/* Meta Data Placeholder (Date / Read time) */}
          <div className="flex gap-4 mb-10">
            <div className="w-32 h-4 bg-zinc-200 rounded"></div>
            <div className="w-24 h-4 bg-zinc-200 rounded"></div>
          </div>

          {/* Massive Cover Image Skeleton */}
          <div className="w-full h-[400px] md:h-[600px] bg-zinc-200/80 rounded-2xl mb-12 shadow-sm"></div>

          {/* Article Body Content Skeleton (Paragraphs) */}
          <div className="space-y-4">
            <div className="h-4 bg-zinc-200 rounded w-full"></div>
            <div className="h-4 bg-zinc-200 rounded w-full"></div>
            <div className="h-4 bg-zinc-200 rounded w-11/12"></div>
            <div className="h-4 bg-zinc-200 rounded w-full pt-6"></div>
            <div className="h-4 bg-zinc-200 rounded w-10/12"></div>
            <div className="h-4 bg-zinc-200 rounded w-full"></div>
            <div className="h-4 bg-zinc-200 rounded w-9/12 pt-6"></div>
            <div className="h-4 bg-zinc-200 rounded w-full"></div>
          </div>

        </div>
      </main>
    );
  }

  if (!post) {
    notFound(); // This instantly redirects them to your custom not-found.tsx page!
  }

  console.log("WIX POST DATA:", post);
  const rawImageUrl = post.coverMedia?.image || post.media?.wixMedia?.image;
  const finalCoverImage = rawImageUrl ? media.getImageUrl(rawImageUrl).url : "";
  
  return (
    <main className="min-h-screen bg-white text-black pt-32 pb-24 px-6">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
          {post.title}
        </h1>
        
        {/* If the post has a cover image, display it */}
            {finalCoverImage && (
            <img 
                src={finalCoverImage as string} 
                alt={post.title || "Blog cover image"} 
                className="w-full h-auto max-h-[600px] object-cover rounded-2xl mb-12 shadow-lg" 
            />
            )}

        {/* Wix sends the blog content as HTML, so we dangerouslySetInnerHTML to render it */}
       <div className="prose prose-lg max-w-none">
          {renderWixRichContent(post.richContent?.nodes)}
        </div>
      </article>
    </main>
  );
}