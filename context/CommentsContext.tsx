"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface Reply {
  id: string;
  commentId: string;
  text: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  pageName: string;
}

interface Comment {
  id: string;
  text: string;
  user: string;
  x: number;
  y: number;
  pageName: string;
  createdAt: string;
  updatedAt: string;
}

interface CommentWithReplies extends Comment {
  replies: Array<Reply>;
}

interface CommentsContextType {
  active: boolean;
  setActive: (active: boolean) => void;
  comments: CommentWithReplies[];
  pageName: string;
  isInitialized: boolean;
  toggle: () => void;
  load: (page: string) => Promise<void>;
  add: (comment: Omit<Comment, "pageName" | "createdAt" | "updatedAt">) => Promise<void>;
  // reply: (
  //   commentId: string,
  //   reply: { text: string; user: string }
  // ) => Promise<void>;
  reply: (commentId: string, reply: { text: string; user: string; replyId?: string }) => Promise<void>;

  editReply: (
    commentId: string,
    replyId: string,
    text: string
  ) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  initializePage: (page: string) => Promise<void>;
  setComments?: React.Dispatch<React.SetStateAction<CommentWithReplies[]>>;

  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const CommentsContext = createContext<CommentsContextType | null>(null);

export function CommentsProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [comments, setComments] = useState<CommentWithReplies[]>([]);
  const [pageName, setPageName] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const saved = localStorage.getItem("commentUserName");
    if (saved && saved.trim()) {
      setUserName(saved);
    }
  }, []);

  useEffect(() => {
    if (userName) {
      localStorage.setItem("commentUserName", userName);
    }
  }, [userName]);

  const toggle = () => setActive((prev) => !prev);

  const initializePage = async (pageName: string) => {
    if (!pageName) {
      console.error("Cannot initialize with empty page name");
      return;
    }

    try {
      console.log("Loading comments for page:", pageName);
      const res = await fetch(`/api/comments/${pageName}`);

      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setComments(data || []);
      setPageName(pageName);
      setIsInitialized(true);
      console.log("Initialized comments for page:", pageName);
    } catch (error) {
      console.error("Error loading comments:", error);
      setComments([]);
      setIsInitialized(false);
    }
  };

  async function load(page: string) {
    if (!page) {
      console.error("No page name provided");
      return;
    }

    if (!isInitialized || pageName !== page) {
      await initializePage(page);
      return;
    }

    try {
      console.log("Reloading comments for page:", page);
      const res = await fetch(`/api/comments/${page}`);

      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setComments(data || []);
    } catch (error) {
      console.error("Error loading comments:", error);
      setComments([]);
    }
  }

  async function add(comment: Omit<Comment, "pageName" | "createdAt" | "updatedAt">) {
    const currentUser = localStorage.getItem("commentUserName") || userName || "Guest";
    if (!isInitialized) {
      console.error("Comments system not initialized");
      throw new Error("Comments system not initialized");
    }

    if (!pageName) {
      console.error("No page name set for comments");
      throw new Error("No page name set for comments");
    }

    // Validate comment data before sending
    if (!comment.text?.trim()) {
      throw new Error("Comment text is required");
    }
    if (!comment.user?.trim()) {
      throw new Error("User is required");
    }
    if (typeof comment.x !== 'number' || typeof comment.y !== 'number') {
      throw new Error("Valid x and y coordinates are required");
    }

    try {
      const now = new Date().toISOString();
      console.log("Adding comment for page:", pageName);
      const commentWithPage = {
        ...comment,
        text: comment.text.trim(),
        user: currentUser.trim(),
        x: comment.x,
        y: comment.y,
        pageName: pageName.toLowerCase(),
      };

      const res = await fetch(`/api/comments/${pageName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentWithPage),
      });

      const responseText = await res.text();
      console.log("Raw response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response:", e);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      if (!res.ok || !data.success) {
        const errorMessage = data.error || "Failed to add comment";
        console.error("Server error:", errorMessage);
        throw new Error(errorMessage);
      }

      // Add the new comment to the local state with empty replies array
      const newComment = { ...data.data, replies: [] };
      setComments((prev) => [...prev, newComment]);

      // Reload all comments to ensure consistency
      await load(pageName);

      return newComment;
    } catch (error) {
      console.error("Failed to add comment:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  async function reply(commentId: string, reply: { text: string; user: string }) {
    if (!pageName) {
      console.error("No page name set for comments");
      return;
    }

    try {
      const res = await fetch(`/api/comments/${pageName}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentId,
          text: reply.text,
          user: reply.user,
          reply: true, // mark as reply
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to add reply");
      }

      // update state: attach reply to its comment
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? { ...c, replies: [...c.replies, result.data] }
            : c
        )
      );
    } catch (error) {
      console.error("Failed to add reply:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }


  async function editReply(
    commentId: string,
    replyId: string,
    text: string
  ): Promise<void> {
    if (!pageName) {
      throw new Error("No page name set for comments");
    }

    if (!commentId || !replyId || !text) {
      throw new Error("Missing required fields for editing reply");
    }

    try {
      console.log("Updating reply:", {
        commentId,
        replyId,
        text,
      });

      // Send the update request to the API
      const res = await fetch(`/api/comments/${pageName}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentId,
          replyId,
          text,
          edit: true
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const result = await res.json();

      // Update the local state with the updated reply
      setComments(prev =>
        prev.map(comment => {
          if (comment.id !== commentId) return comment;
          return {
            ...comment,
            replies: comment.replies.map((reply: any) =>
              reply.id === replyId
                ? { ...reply, ...result.data }
                : reply
            )
          };
        })
      );
    } catch (error) {
      console.error("Failed to edit reply:", error);
      await load(pageName); // revert state from server
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  async function deleteComment(commentId: string) {
    if (!pageName) {
      throw new Error("No page name set for comments");
    }

    try {
      console.log("Sending delete request:", { pageName, commentId });

      const res = await fetch(`/api/comments/${pageName}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId,
        }),
      });

      const responseText = await res.text();
      console.log("Raw response:", responseText);

      let responseData;
      try {
        responseData = responseText ? JSON.parse(responseText) : null;
        console.log("Parsed response:", responseData);
      } catch (e) {
        console.error("JSON parse error:", e);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      if (!responseData) {
        throw new Error("Empty response from server");
      }

      if (!res.ok || !responseData.success) {
        const errorMessage = responseData.error || "Failed to delete comment";
        const details = responseData.details
          ? ` (${JSON.stringify(responseData.details)})`
          : "";
        throw new Error(`${errorMessage}${details}`);
      }

      // Update local state by removing the deleted comment
      setComments((prev) => prev.filter((c) => c.id !== commentId));

      return responseData.data;
    } catch (error) {
      console.error("Failed to delete comment:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  const contextValue: CommentsContextType = {
    active,
    setActive,
    toggle,
    comments: comments || [],
    load,
    add,
    reply,
    editReply,
    deleteComment,
    pageName,
    initializePage,
    isInitialized,
    setComments,
    userName,
    setUserName,
  };

  return (
    <CommentsContext.Provider value={contextValue}>
      {children}
    </CommentsContext.Provider>
  );
}

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (context === null) {
    throw new Error(
      "useComments must be used within a CommentsProvider. Ensure CommentsProvider is wrapping your component."
    );
  }
  return context;
};
