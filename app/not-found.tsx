import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    // Added relative positioning and hidden overflow for the background elements
    <main className="relative min-h-screen bg-[#f4f3ef] flex items-center justify-center px-6 md:px-12 py-20 overflow-hidden">
      
      {/* ⚡ PRO ADDITION 1: Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000055_1px,transparent_1px)] [background-size:24px_24px] opacity-70 z-0"></div>

      {/* ⚡ PRO ADDITION 2: Giant Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-black/[0.03] select-none pointer-events-none z-0 tracking-tighter">
        404
      </div>
      
      {/* 2-Column Grid Layout (Added relative & z-10 to sit above the background) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full max-w-6xl mx-auto">
        
        {/* Left Column: Text and Button */}
        <div className="flex flex-col items-start space-y-4">
          
          
          
          <h1 className="text-6xl md:text-[6rem] font-black tracking-tight text-black leading-none pb-2">
            Grrr...!
          </h1>
          
          <p className="text-base md:text-lg text-black font-medium max-w-md leading-relaxed pb-6">
            We're so sorry! It looks like you are trying to access a page
            that either has been deleted or never existed.
          </p>
          
          {/* Neo-Brutalist Button */}
          <Link
            href="/"
            className="inline-block px-10 py-4 bg-[#b5b5b5] border-2 border-black rounded-full text-sm font-bold text-black uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none mb-8"
          >
            Go Back Home
          </Link>

          {/* ⚡ PRO ADDITION 3: Helpful Alternative Links */}
          <div className="pt-6 border-t-2 border-black/10 w-full max-w-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-black/50 block mb-4">
              Helpful Links
            </span>
            <div className="flex flex-wrap gap-4">
              <Link href="/#insights" className="text-sm font-bold text-black hover:underline underline-offset-4">
                Read Insights
              </Link>
              <Link href="/#platforms" className="text-sm font-bold text-black hover:underline underline-offset-4">
                Our Platforms
              </Link>
              <Link href="/#contact" className="text-sm font-bold text-black hover:underline underline-offset-4">
                Contact Us
              </Link>
            </div>
          </div>
          
        </div>

        {/* Right Column: Illustration */}
        <div className="flex justify-center w-full relative">
          {/* Added a subtle floating animation to the tiger to make it feel alive! */}
          <div className="w-full max-w-[500px] animate-[bounce_6s_ease-in-out_infinite]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tigernew.png"
              alt="404 Tiger Illustration"
              className="w-full h-auto object-contain mix-blend-multiply"
            />
          </div>
        </div>
        
      </div>
    </main>
  );
}