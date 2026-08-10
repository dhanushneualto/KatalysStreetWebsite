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
const calculateReadTime = (post: any) => {
  const extractText = (nodes: any[]): string => {
    if (!nodes) return "";
    return nodes.map(node => {
      if (node.textData?.text) return node.textData.text;
      if (node.nodes) return extractText(node.nodes);
      return "";
    }).join(" ");
  };

  const wordCount = extractText(post.richContent?.nodes || []).trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
};

const renderWixRichContent = (nodes: any[]) => {
  if (!nodes) return null;

  return nodes.map((node, index) => {
    if (node.type === "PARAGRAPH") {
      return (
        <p key={index} className="mb-6 leading-relaxed text-zinc-800">
          {node.nodes?.map((textNode: any, i: number) => {
            const isBold = textNode.textData?.decorations?.some((d: any) => d.type === "BOLD");
            const isLink = textNode.textData?.decorations?.some((d: any) => d.type === "LINK");
            const linkUrl = isLink ? textNode.textData.decorations.find((d: any) => d.type === "LINK")?.link?.url : null;

            const textContent = textNode.textData?.text;

            if (linkUrl) {
              return (
                <a key={i} href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
                  {textContent}
                </a>
              );
            }

            return (
              <span key={i} className={isBold ? "font-bold text-black" : ""}>
                {textContent}
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

    if (node.type === "BULLETED_LIST" || node.type === "ORDERED_LIST") {
      const ListTag = node.type === "ORDERED_LIST" ? "ol" : "ul";
      const listStyle = node.type === "ORDERED_LIST" ? "list-decimal" : "list-disc";
      
      return (
        <React.Fragment key={index}>
          {node.heading && <h4 className="font-bold mt-4 mb-2">{node.heading}</h4>}
          <ListTag className={`${listStyle} pl-6 mb-8 space-y-2 text-zinc-800`}>
            {node.nodes?.map((listItem: any, i: number) => (
              <li key={i}>
                {listItem.nodes?.map((p: any) => 
                  p.nodes?.map((t: any, j: number) => <span key={j}>{t.textData?.text}</span>)
                )}
              </li>
            ))}
          </ListTag>
        </React.Fragment>
      );
    }

    // ⚡ THE CATCH-ALL SAFETY NET: If Wix uses a custom block for references/footnotes
    if (node.nodes) {
      const extractedText = node.nodes
        .map((n: any) => n.textData?.text || n.nodes?.map((sub: any) => sub.textData?.text).join(""))
        .join(" ");

      if (extractedText.trim()) {
        return (
          <div key={index} className="mb-4 text-zinc-700">
            {extractedText}
          </div>
        );
      }
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
       {/* AUTHOR & METADATA SECTION */}
        <div className="mb-8 pb-6 border-b border-zinc-100">
          <p className="font-semibold text-zinc-900">
            {post.authorName || "Rajesh Koppula"}
          </p>
          
          {post.firstPublishedDate && (
  <p className="text-sm text-zinc-500 mt-1">
    {(() => {
      const d = new Date(post.firstPublishedDate);
      // Fallback to UTC methods to extract the exact day stored
      const month = d.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
      const day = d.getUTCDate();
      const year = d.getUTCFullYear();
      return `${month} ${day}, ${year}`;
    })()}
  </p>
)}
        </div>
        <span>{calculateReadTime(post)}</span>
        
        
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