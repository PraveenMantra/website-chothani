"use client";
import { useState, useEffect, useRef } from "react";
import { useComments } from "@/context/CommentsContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Reply, Loader2, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CommentSidebarProps {
  onClose: () => void;
  setHoveredCommentId: React.Dispatch<React.SetStateAction<string | null>>;
  activeCommentId?: string | null;
  setActiveCommentId?: React.Dispatch<React.SetStateAction<string | null>>;
  commentRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  commentsActive: boolean; // ✅ from parent
  setCommentsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function timeAgo(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval > 1 ? "s" : ""} ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval > 1 ? "s" : ""} ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval > 1 ? "s" : ""} ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} minute${interval > 1 ? "s" : ""} ago`;

  return "Just now";
}

export default function CommentSidebar({ onClose, setHoveredCommentId, activeCommentId, setActiveCommentId, commentRefs, commentsActive,
  setCommentsActive }: CommentSidebarProps) {
  const context = useComments();

  if (!context) {
    return null;
  }

  const {
    userName,
    setUserName,
    active,
    toggle,
    comments = [],
    isInitialized,
    pageName,
    reply,
    editReply: updateReply,
    setActive,
    deleteComment
  } = context;

  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(true);
  // const [commentsActive, setCommentsActive] = useState(false);
  const [editingReply, setEditingReply] = useState<{ commentId: string, replyId: string, text: string } | null>(null);
  const [showReplyInput, setShowReplyInput] = useState<Record<string, boolean>>({});
  const currentUserRole = "admin";
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("open");
  const [commentStatus, setCommentStatus] = useState<Record<string, "open" | "resolved" | "DELETED">>({});
  const [newCommentText, setNewCommentText] = useState("");
  // const [userName, setUserName] = useState(() => localStorage.getItem("commentUserName") || "Guest");
  // const [userName, setUserName] = useState("Guest");
  const [expandedComment, setExpandedComment] = useState<string | null>(null);
  const [loadingReplies, setLoadingReplies] = useState<Record<string, boolean>>({});


  useEffect(() => {
    const saved = localStorage.getItem("commentUserName");
    // if (saved) setUserName(saved);
    if (saved && saved.trim()) {
      setUserName(saved);
    }
  }, []);

  // ✅ Keep `DropCommentBox` in sync
  useEffect(() => {
    if (userName) {
      localStorage.setItem("commentUserName", userName);
    }
  }, [userName]);

  const handleReply = async (commentId: string, text: string) => {
    try {
      setLoadingReplies((prev) => ({ ...prev, [commentId]: true }));
      await reply(commentId, { text, user: userName });
      setReplyText({ ...replyText, [commentId]: "" });
      setShowReplyInput({ ...showReplyInput, [commentId]: false });
    } catch (error) {
      console.error('Failed to add reply:', error);
      alert('Failed to add reply. Please try again.');
    } finally {
      setLoadingReplies((prev) => ({ ...prev, [commentId]: false }));
    }
  };


  const editReply = (commentId: string, replyId: string, text: string) => {
    setEditingReply({ commentId, replyId, text });
  };

  const saveReplyEdit = async (commentId: string, replyId: string) => {
    if (!editingReply || !editingReply.text.trim()) {
      return;
    }

    try {
      await updateReply(commentId, replyId, editingReply.text);
      setEditingReply(null);
    } catch (error) {
      console.error('Failed to update reply:', error);
      alert('Failed to update reply. Please try again.');
    }
  };

  const cancelEdit = () => {
    setEditingReply(null);
  };

  useEffect(() => {
    setActive(commentsActive);
  }, [commentsActive, setActive]);


  useEffect(() => {
    const initialStatus: Record<string, "open" | "resolved" | "DELETED"> = {};
    comments.forEach((c: any) => {
      initialStatus[c.id] = c.status || "open"; // default open
    });
    setCommentStatus(initialStatus);
    // console.log("comments===>>>", comments);

  }, [comments]);

  const toggleExpand = (commentId: string) => {
    setExpandedComment((prev) => (prev === commentId ? null : commentId));
  };

  useEffect(() => {
    if (activeCommentId) {
      setExpandedComment(activeCommentId); // expand
      const el = commentRefs.current?.[activeCommentId];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeCommentId, commentRefs]);




  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      >
      </div>
      <div
        className={`absolute right-0 top-0 h-full transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-[calc(100%-24px)]"
          }`}
        onClick={(e) => e.stopPropagation()} // ✅ prevent closing when clicking inside
      >
        <div className="w-[390px] h-full bg-white dark:bg-black shadow-lg border-l border-gray-200 dark:border-gray-800 p-3 overflow-y-auto scrollbar-hide">
          <div className="flex items-center justify-between gap-4 mb-2 pb-2 border-b border-gray-200 dark:border-gray-800">
            {/* Left: Input with tooltip */}
            <div className="flex items-center gap-2 flex-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Input
                      id="comment-username"
                      value={userName}
                      // onChange={(e) => {
                      //   setUserName(e.target.value);
                      //   localStorage.setItem("commentUserName", e.target.value || "Guest");
                      // }}
                      // onChange={(e) => setUserName(e.target.value || "Guest")}
                      onChange={(e) => {
                        const val = e.target.value;
                        setUserName(val);
                        localStorage.setItem("commentUserName", val);
                      }}
                      placeholder="Enter your name"
                      className="text-sm flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                    />
                  </TooltipTrigger>
                  <TooltipContent>Comment as</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Middle: Comments title */}
            <div className="flex items-center gap-2 whitespace-nowrap">
              <MessageCircle className="h-5 w-5 text-black dark:text-white" />
              <h2 className="font-semibold text-black dark:text-white">Comments</h2>
            </div>

            {/* Right: Toggle */}
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Switch
                id="comments-active"
                checked={commentsActive}
                onCheckedChange={setCommentsActive}
                className="cursor-pointer"
              />
              <Label
                htmlFor="comments-active"
                className="text-sm text-gray-900 dark:text-gray-100"
              >
                {commentsActive ? "Active" : "Inactive"}
              </Label>
            </div>
          </div>



          <Tabs defaultValue="all" value={filter} onValueChange={(val) => setFilter(val as "all" | "open" | "resolved")} className="w-full mb-4">
            <TabsList className="w-full flex justify-between">
              <TabsTrigger value="all">All Comments</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </Tabs>

          {comments
            .filter((c: any) => c.status !== "DELETED")
            .filter((c: any) => {
              if (filter === "all") return true;
              return commentStatus[c.id] === filter;
            }).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((c: any) => (
              <Card
                key={c.id}
                className={`mb-4 p-4 group relative cursor-pointer border-2 ${commentStatus[c.id] === "resolved" ? "border-green-400" : "border-red-400"
                  } ${activeCommentId === c.id ? "ring-2 ring-black dark:ring-white" : ""}`}
                onMouseEnter={() => {
                  if (!commentsActive) return;

                  setHoveredCommentId(c.id);
                  const pinY = c.y;
                  const viewportHeight = window.innerHeight;

                  if (pinY < window.scrollY || pinY > window.scrollY + viewportHeight) {
                    window.scrollTo({
                      top: pinY - viewportHeight / 3,
                      behavior: "smooth",
                    });
                  }
                }}
                onMouseLeave={() => setHoveredCommentId(null)}
                onClick={() => {
                  toggleExpand(c.id);
                  if (setActiveCommentId) setActiveCommentId(c.id); // ✅ update active
                }}
                ref={(el) => {
                  commentRefs.current[c.id] = el;
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-sm">{c.user}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:hidden">
                      {timeAgo(c.createdAt)}
                    </span>
                    <div className="hidden group-hover:flex items-center gap-4">
                      <Switch
                        id={`status-${c.id}`}
                        checked={commentStatus[c.id] === "resolved"}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={async (checked) => {
                          const newStatus = checked ? "resolved" : "open";
                          try {
                            setCommentStatus({ ...commentStatus, [c.id]: newStatus });
                            const updatedComments = comments.map((comment: any) =>
                              comment.id === c.id ? { ...comment, status: newStatus } : comment
                            );

                            (context as any).setComments?.(updatedComments);

                            await fetch(`/api/comments/${pageName}`, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ commentId: c.id, status: newStatus }),
                            });
                          } catch (error) {
                            console.error("Failed to update status:", error);
                          }
                        }}
                        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted cursor-pointer"
                      />
                      <Label
                        htmlFor={`status-${c.id}`}
                        className="text-sm text-gray-900 dark:text-gray-100"
                      >
                        {commentStatus[c.id] === "resolved" ? "Resolved" : "Open"}
                      </Label>

                      {userName === "delete" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={async (e) => {
                            e.stopPropagation();
                            try {
                              setCommentStatus({ ...commentStatus, [c.id]: "DELETED" });
                              const updatedComments = comments.map((comment: any) =>
                                comment.id === c.id ? { ...comment, status: "DELETED" } : comment
                              );
                              (context as any).setComments?.(updatedComments);

                              await fetch(`/api/comments/${pageName}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ commentId: c.id, status: "DELETED" }),
                              });
                            } catch (error) {
                              console.error("Failed to soft delete comment:", error);
                            }
                          }}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm dark:text-gray-200">{c.text}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedComment(c.id);
                      setShowReplyInput({ ...showReplyInput, [c.id]: !showReplyInput[c.id] });
                    }}
                    className="p-0 h-6 w-6 bg-transparent hover:bg-transparent cursor-pointer"
                  >
                    <Reply />
                  </Button>
                </div>

                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedComment === c.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="space-y-2">
                    {c.replies.map((r: any) => (
                      <div key={r.id} className="bg-muted p-2 rounded-md group/reply relative">
                        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400" onClick={(e) => e.stopPropagation()}>
                          <span className="font-medium">{r.user}</span>
                          {editingReply?.replyId !== r.id && (
                            <button
                              onClick={() => editReply(c.id, r.id, r.text)}
                              className="hidden group-hover/reply:block absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowReplyInput({ ...showReplyInput, [c.id]: !showReplyInput[c.id] });
                              setExpandedComment(c.id);
                            }}
                            className="p-0 h-6 w-6 bg-transparent hover:bg-transparent cursor-pointer"
                          >
                            <Reply />
                          </Button>
                        </div>
                        {editingReply?.replyId === r.id ? (
                          <div className="mt-1 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <Input
                              value={editingReply?.text || ''}
                              onChange={(e) => editingReply && setEditingReply({
                                ...editingReply,
                                text: e.target.value
                              })}
                              className="text-sm flex-1 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 focus:outline-none cursor-pointer"
                              autoFocus
                              disabled={loadingReplies[c.id]}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  saveReplyEdit(c.id, r.id);
                                } else if (e.key === 'Escape') {
                                  cancelEdit();
                                }
                              }}
                            />
                            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 cursor-pointer"
                                onClick={() => cancelEdit()}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-green-600 cursor-pointer"
                                onClick={() => saveReplyEdit(c.id, r.id)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm mt-1 dark:text-gray-300">{r.text}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {currentUserRole === "admin" && showReplyInput[c.id] && (
                    <div className="mt-3 relative" onClick={(e) => e.stopPropagation()}>
                      <Input
                        placeholder="Reply to this comment..."
                        value={replyText[c.id] || ""}
                        onChange={(e) => setReplyText({ ...replyText, [c.id]: e.target.value })}
                        className="text-sm flex-1 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 focus:outline-none"
                        autoFocus
                        disabled={loadingReplies[c.id]}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          if (e.key === "Enter" && replyText[c.id]?.trim()) {
                            e.preventDefault();
                            handleReply(c.id, replyText[c.id]);
                          } else if (e.key === "Escape") {
                            setShowReplyInput({ ...showReplyInput, [c.id]: false });
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (replyText[c.id]?.trim()) {
                            handleReply(c.id, replyText[c.id]);
                          }
                        }}
                        disabled={loadingReplies[c.id]}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-black dark:text-white hover:opacity-80 cursor-pointer"
                      >
                        {loadingReplies[c.id] ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="m5 12h14M12 5l7 7-7 7" />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
