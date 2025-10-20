"use client";
import { useEffect } from "react";
import { useComments } from "@/context/CommentsContext";

export function useCommentsPage(pageName: string) {
  const context = useComments();

  if (!context) {
    throw new Error('useCommentsPage must be used within a CommentsProvider');
  }

  useEffect(() => {
    if (!pageName) return;

    // Normalize the path to match the API's normalization
    const normalizedPath = pageName.replace(/\//g, '-');
    
    // Initialize comments for the page
    const initializeComments = async () => {
      if (!context.isInitialized || context.pageName !== normalizedPath) {
        await context.initializePage(normalizedPath);
      }
    };

    initializeComments();
  }, [pageName]);

  return context;
}
