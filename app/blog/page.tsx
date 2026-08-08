"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient, OAuthStrategy, media } from "@wix/sdk"; // ⚡ Added 'media' here
import { posts } from "@wix/blog";

const wixClient = createClient({
  modules: { posts },
  // Make sure your Client ID is correct below!
  auth: OAuthStrategy({ clientId: "4fe783ed-517a-45c5-bd3d-f8f26ce0792b" }),
});

export default function BlogListingPage() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await wixClient.posts.queryPosts().find();
        setBlogPosts(response.items);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

 if (loading) {
    return (
      <main className="min-h-screen bg-white text-black pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* We show the header immediately so the page doesn't feel blank */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase mb-16">
            Strategic Insights
          </h1>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* We map 6 empty items to create a full grid of skeleton cards */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="bg-zinc-100 border border-zinc-200 rounded-2xl overflow-hidden flex flex-col h-full animate-pulse"
              >
                {/* Image Skeleton */}
                <div className="w-full h-48 bg-zinc-200/60 border-b border-zinc-200/60"></div>
                
                {/* Text Content Skeleton */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Title Skeleton (Two lines) */}
                    <div className="h-6 bg-zinc-200/80 rounded w-3/4 mb-3"></div>
                    <div className="h-6 bg-zinc-200/80 rounded w-1/2 mb-6"></div>
                    
                    {/* Excerpt Skeleton (Three lines) */}
                    <div className="h-3 bg-zinc-200/60 rounded w-full mb-2"></div>
                    <div className="h-3 bg-zinc-200/60 rounded w-full mb-2"></div>
                    <div className="h-3 bg-zinc-200/60 rounded w-4/5"></div>
                  </div>
                  
                  {/* Button Skeleton */}
                  <div className="mt-6 pt-4 border-t border-zinc-200/60">
                    <div className="h-3 bg-zinc-200/80 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    // ⚡ Changed main container to white background and black text
    <main className="min-h-screen bg-white text-black pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase mb-16">
          Strategic Insights
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => {
            // ⚡ Extract and convert the Wix image URL for each card
            const rawImageUrl = post.coverMedia?.image || post.media?.wixMedia?.image;
            const finalImageUrl = rawImageUrl ? media.getImageUrl(rawImageUrl).url : "";

            return (
              <Link key={post._id} href={`/blog/${post.slug}`} className="block group">
              
                <div className="bg-zinc-100 border border-zinc-200 rounded-2xl overflow-hidden flex flex-col h-full transition-shadow hover:shadow-lg">
                  
                 
                  {finalImageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={finalImageUrl as string}
                      alt={post.title}
                      className="w-full h-48 object-cover border-b border-zinc-200/60"
                    />
                  )}
                  
                  {/* Text Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-black group-hover:underline mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      {/* ⚡ Using line-clamp-3 so long excerpts don't break the card heights */}
                      <p className="text-sm text-zinc-600 line-clamp-3">
                        {post.excerpt || "Read more about this insight..."}
                      </p>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-zinc-200/60 text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      Read Article →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}