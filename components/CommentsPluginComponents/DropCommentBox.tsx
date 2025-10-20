"use client";
import { useEffect, useState } from "react";
import { useComments } from "@/context/CommentsContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DropCommentBox() {
  const pathname = usePathname();
  const context = useComments();

  if (!context) {
    throw new Error("DropCommentBox must be used within CommentsProvider");
  }

  const { add } = context;

  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userName, setUserName] = useState("")
  const [storedName, setStoredName] = useState<string>("Guest");
  const [lastMousePos, setLastMousePos] = useState<{ x: number; y: number }>({ x: 200, y: 200 });

  // useEffect(() => {
  //   const saved = localStorage.getItem("commentUserName");
  //   if (saved) {
  //     setStoredName(saved);
  //   } else {
  //     localStorage.setItem("commentUserName", "Guest");
  //   }
  // }, []);

  useEffect(() => {
    const saved = localStorage.getItem("commentUserName");
    if (saved && saved !== "Guest") {
      setStoredName(saved);
    } else if (!saved) {
      localStorage.setItem("commentUserName", "Guest");
      setStoredName("Guest");
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setLastMousePos({ x: e.pageX, y: e.pageY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input/textarea
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") {
        return;
      }
      if (e.key.toLowerCase() === "c") {
        setPos(lastMousePos); // open at last mouse position
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lastMousePos]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pos) {
      // Get the click coordinates relative to the page
      const clickX = e.pageX;
      const clickY = e.pageY;

      // Store the actual page coordinates
      setPos({
        x: clickX,
        y: clickY
      });
    }
  };

  const handleSave = async () => {
    if (!pos || !text.trim() || isSubmitting || !storedName) return;

    try {
      setIsSubmitting(true);
      const pageName = pathname.replace(/^\//, '').split('/')[0] || 'home';
      const result = await add({
        id: `temp_${Date.now()}`,
        x: pos.x,
        y: pos.y,
        text: text.trim(),
        user: storedName
      });


      setText("");
      setPos(null);
    } catch (error) {
      console.error("Error creating comment:", error);
      // Keep the dialog open if there's an error
      alert(error instanceof Error ? error.message : "Failed to create comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setPos(null);
    setText("");
  };





  return (
    <div className="absolute inset-0 w-full h-full cursor-pointer" onClick={handleCancel} >
      {storedName && pos && (
        <Card
          style={{ position: 'absolute', top: pos.y + 'px', left: pos.x + 'px', transform: 'translate(-50%, -50%)', zIndex: 999 }}
          className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-4 rounded-lg shadow-md w-72"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-black dark:text-white">Add Comment</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-black hover:bg-black dark:hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your comment..."
            className="mb-3 bg-transparent text-black dark:text-white border-gray-300 dark:border-gray-700 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              Cancel
            </Button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              disabled={!text.trim() || isSubmitting}
              className="bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black rounded-md px-3 text-sm font-medium cursor-pointer"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}
