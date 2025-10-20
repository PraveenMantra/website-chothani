"use client";
import { useEffect, useRef, useState } from "react";
import { useComments } from "@/context/CommentsContext";
import CommentPin from "./CommentPin";
import DropCommentBox from "./DropCommentBox";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import CommentSidebar from "./CommentSidebar";

export default function CommentOverlay() {
  const { active, toggle, comments, isInitialized, pageName, setActive }: any = useComments();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [hoveredComment, setHoveredComment] = useState<any | null>(null);
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);
  // const [filter, setFilter] = useState<"all" | "open" | "resolved">("all");
  // const [commentStatus, setCommentStatus] = useState<Record<string, "open" | "resolved">>({});
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const commentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [commentsActive, setCommentsActive] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("commentsActive");
      if (saved) {
        setCommentsActive(JSON.parse(saved));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("commentsActive", JSON.stringify(commentsActive));
    }
    if (typeof setActive === "function") {
      setActive(commentsActive);
    }
  }, [commentsActive, setActive]);

  // Don't render anything if comments are not initialized for this page
  if (!isInitialized || !pageName) {
    return null;
  }




  return (
    <>
      {sidebarVisible && (
        <CommentSidebar
          onClose={() => {
            setSidebarVisible(false);
            toggle();
          }}
          setHoveredCommentId={setHoveredCommentId}
          activeCommentId={activeCommentId}
          setActiveCommentId={setActiveCommentId}
          commentRefs={commentRefs}
          commentsActive={commentsActive}
          setCommentsActive={setCommentsActive}
        />
      )}
      <Button
        variant="ghost"
        className="fixed bottom-4 right-4 z-[60] shadow-lg flex items-center gap-2 bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
        onClick={() => {
          setSidebarVisible(prev => !prev);
          if (!sidebarVisible) {
            toggle();
          }
        }}
        size="sm"
      >
        <MessageCircle className="h-4 w-4 text-white dark:text-black transition-colors duration-300" />
      </Button>




      {/* Active comments overlay and functionality */}
      {active && (
        <>
          {/* Semi-transparent overlay */}
          <div className="fixed inset-0 bg-black/5 z-[40]" />

          {/* Click capture and pins container */}
          <div className="absolute top-0 left-0 w-full h-full" style={{
            minHeight: '100vh',
            position: 'absolute'
          }}>
            {/* Pins layer - positioned based on page scroll */}
            <div className="absolute top-0 left-0 w-full h-full">
              {comments
              .filter((c: any) => c.status !== "DELETED")
              .map((c: any) => {
                // Show pin only if it matches the filter
                // if (filter !== "all" && commentStatus[c.id] !== filter) return null;


                return (
                  <div
                    key={c.id}
                    // id={`comment-pin-${c.id}`}
                    style={{
                      position: "absolute",
                      left: `${c.x}px`,
                      top: `${c.y}px`,
                      zIndex: 42,
                    }}
                    onClick={() => {
                      setActiveCommentId(c.id); // ✅ set active comment
                      setSidebarVisible(true);  // ✅ open sidebar
                      toggle();                 // ensure context is active
                    }}
                  >
                    <CommentPin
                      comment={c}
                      status={c.status}
                      onHover={() => {
                        setHoveredComment(c);        // show preview card
                        setHoveredCommentId(c.id);   // pin-only-blink behaviour
                      }}
                      onLeave={() => {
                        setHoveredComment(null);
                        setHoveredCommentId(null);  // back to default: all blink
                      }}
                      isHovered={
                        hoveredCommentId === null || hoveredCommentId === c.id
                      }
                      onClick={() => {
                        // ✅ Open sidebar if closed
                        setSidebarVisible(true);

                        // ✅ Ensure comments are active
                        if (typeof setActive === "function") {
                          setActive(true);
                        }

                        // ✅ Highlight this comment in sidebar
                        setActiveCommentId(c.id);

                        // ✅ Scroll into view inside sidebar
                        const el = commentRefs.current[c.id];
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>


            {hoveredComment && (() => {
              // viewport width/height
              const vw = window.innerWidth;
              const vh = window.innerHeight;

              const cardWidth = 300;  // ~ w-72 (18rem = 288px)
              const cardHeight = 150; // rough estimate, or measure with ref

              const margin = 12; // padding from edges
              let top = hoveredComment.y;
              let left = hoveredComment.x;
              let transform = "";

              // Try to place above by default
              if (hoveredComment.y - cardHeight - margin > 0) {
                top = hoveredComment.y;
                transform = "translate(-50%, -100%)"; // above
              } else if (hoveredComment.y + cardHeight + margin < vh) {
                top = hoveredComment.y;
                transform = "translate(-50%, 0)"; // below
              } else {
                // fallback center vertically
                top = Math.min(Math.max(margin, hoveredComment.y), vh - margin);
                transform = "translate(-50%, -50%)";
              }

              // Horizontal positioning
              if (hoveredComment.x + cardWidth / 2 + margin > vw) {
                left = vw - cardWidth / 2 - margin;
              } else if (hoveredComment.x - cardWidth / 2 - margin < 0) {
                left = cardWidth / 2 + margin;
              }

              return (
                <Card
                  style={{
                    position: "absolute",
                    top: top + "px",
                    left: left + "px",
                    transform,
                  }}
                  className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-4 rounded-lg shadow-md w-72 z-40"
                >
                  {/* Main comment */}
                  <div className="mb-2">
                    <p className="text-sm font-semibold text-black dark:text-white">
                      {hoveredComment.user}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {hoveredComment.text}
                    </p>
                  </div>

                  {/* Replies */}
                  {hoveredComment.replies?.length > 0 && (
                    <div className="mb-2 space-y-2">
                      {hoveredComment.replies.map((reply: any) => (
                        <div
                          key={reply.id}
                          className="border-l-2 border-gray-300 dark:border-gray-700 pl-2"
                        >
                          <p className="text-xs font-semibold text-black dark:text-white">
                            {reply.user}
                          </p>
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            {reply.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })()}




            {/* Click capture layer - covers entire document */}
            <div
              className="absolute top-0 left-0 w-full h-full z-[41]"
              style={{ minHeight: document.documentElement.scrollHeight + 'px' }}
            >
              <DropCommentBox />
            </div>
          </div>
        </>
      )}

      {/* Sidebar */}
      {sidebarVisible && <CommentSidebar
        onClose={() => setSidebarVisible(false)}
        setHoveredCommentId={setHoveredCommentId}
        activeCommentId={activeCommentId} // ✅ pass down
        setActiveCommentId={setActiveCommentId}
        commentRefs={commentRefs}
        commentsActive={commentsActive}
        setCommentsActive={setCommentsActive}
      />}
    </>
  );
}
