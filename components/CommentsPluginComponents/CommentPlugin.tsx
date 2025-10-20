"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useComments } from "@/context/CommentsContext";

export default function CommentPlugin({ pageName }: { pageName: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [selectedComment, setSelectedComment] = useState<any | null>(null);
  // const [userName, setUserName] = useState("Guest");
  const { userName } = useComments();

  // useEffect(() => {
  //   const saved = localStorage.getItem("commentUserName");
  //   if (saved && saved.trim()) {
  //     setUserName(saved);
  //   }
  // }, []);

  useEffect(() => {
    fetch(`/api/comments/${pageName}`)
      .then((res) => res.json())
      .then(setComments);
  }, [pageName]);

  const addPin = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const comment = {
      text: "New comment",
      user: userName || "Guest",
      x,
      y,
    };
    fetch(`/api/comments/${pageName}`, {
      method: "POST",
      body: JSON.stringify(comment),
    })
      .then((res) => res.json())
      .then((c) => setComments((prev) => [...prev, c]));
  };

  const addReply = (commentId: string, text: string) => {
    fetch(`/api/comments/${pageName}`, {
      method: "PUT",
      body: JSON.stringify({ reply: true, commentId, text, user: "admin" }),
    })
      .then((res) => res.json())
      .then((reply) => {
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, replies: [...c.replies, reply] } : c
          )
        );
      });
  };

  return (
    <div className="relative">
      {/* Overlay pins */}
      <div className="absolute inset-0" onClick={addPin}>
        {comments.map((c) => (
          <div
            key={c.id}
            className="absolute w-4 h-4 bg-red-500 rounded-full cursor-pointer"
            style={{ top: c.y, left: c.x }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedComment(c);
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <Card className="fixed right-0 top-0 w-80 h-full p-4 overflow-y-auto">
        <h2 className="font-bold mb-2">Comments - {pageName}</h2>
        {comments.map((c) => (
          <div key={c.id} className="mb-4">
            <p className="text-sm">{c.text}</p>
            {c.replies.map((r: any) => (
              <p key={r.id} className="text-xs ml-4 text-gray-500">
                {r.user}: {r.text}
              </p>
            ))}
            <Input
              placeholder="Reply (admin only)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addReply(c.id, (e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
          </div>
        ))}
      </Card>
    </div>
  );
}
