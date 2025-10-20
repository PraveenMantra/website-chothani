"use client";
import { MessageCircle } from "lucide-react";

export default function CommentPin({ comment, onHover, onLeave, isHovered, onClick, status = "open", }: {
  comment: any,
  onHover?: () => void,
  onLeave?: () => void,
  isHovered?: boolean;
  onClick?: () => void;
  status?: "open" | "resolved" | "DELETED";
}) {
  const pinColor =
    status === "resolved" ? "bg-green-500" :
      status === "DELETED" ? "hidden" : "bg-red-500";
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="z-50 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110">
      <div className="relative">
        {/* ✅ Only blink if hovered */}
        {isHovered && (
          <div className={`absolute -top-1 -left-1 w-6 h-6 ${pinColor} rounded-full animate-ping opacity-75`}></div>
        )}
        <div className={`relative z-10 w-4 h-4 ${pinColor} rounded-full flex items-center justify-center`}>
          <MessageCircle className="h-2.5 w-2.5 text-white" />
        </div>
      </div>
    </div>
  );
}
