"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const handleHashClick = (e: MouseEvent) => {
      // Find out if the user clicked an anchor tag
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (!link) return;

      const href = link.getAttribute("href");
      
      // If the link starts with a "#", hijack the click and scroll smoothly!
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const destination = document.querySelector(href);
        if (destination) {
          destination.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Listen to all clicks on the page
    document.addEventListener("click", handleHashClick);
    
    // Clean up the listener when unmounting
    return () => document.removeEventListener("click", handleHashClick);
  }, []);

  return null; // This component is invisible!
}