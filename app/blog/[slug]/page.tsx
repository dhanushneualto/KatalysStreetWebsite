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

export default function SingleBlogPost() {
  const params = useParams(); 
  const rawSlug = params?.slug as string;
  const slug = rawSlug ? decodeURIComponent(rawSlug) : "";

  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchSinglePost() {
      try {
        // Query the post list directly with RICH_CONTENT fieldset included
        const allPostsResponse = await (wixClient.posts.queryPosts({ 
          fieldsets: ['RICH_CONTENT'] 
        } as any) as any).find();

        const foundPost = allPostsResponse.items.find(
          (p: any) => p.slug === slug || p.slug === decodeURIComponent(slug)
        );

        if (foundPost) {
          setPost(foundPost);
        }
      } catch (error) {
        console.error("Error fetching single post:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSinglePost();
  }, [slug]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white text-black pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="w-24 h-4 bg-zinc-200 rounded mb-12"></div>
          <div className="h-10 md:h-16 bg-zinc-200 rounded w-4/5 mb-4"></div>
          <div className="h-10 md:h-16 bg-zinc-200 rounded w-2/3 mb-10"></div>
          <div className="w-full h-[400px] md:h-[600px] bg-zinc-200/80 rounded-2xl mb-12 shadow-sm"></div>
          <div className="space-y-4">
            <div className="h-4 bg-zinc-200 rounded w-full"></div>
            <div className="h-4 bg-zinc-200 rounded w-full"></div>
            <div className="h-4 bg-zinc-200 rounded w-11/12"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    notFound(); 
  }

  const rawImageUrl = post.coverMedia?.image || post.media?.wixMedia?.image;
  const finalCoverImage = rawImageUrl ? media.getImageUrl(rawImageUrl).url : "";
  
  return (
    <main className="min-h-screen bg-white text-black pt-32 pb-24 px-6">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
          {post.title}
        </h1>
        
        {finalCoverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
              src={finalCoverImage as string} 
              alt={post.title || "Blog cover image"} 
              className="w-full h-auto max-h-[600px] object-cover rounded-2xl mb-12 shadow-lg" 
          />
        )}

       <div className="prose prose-lg max-w-none">
          {renderWixRichContent(post.richContent?.nodes)}
        </div>
      </article>
    </main>
  );
}