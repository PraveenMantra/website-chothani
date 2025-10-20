import { NextResponse } from "next/server";
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "@/utilities/commentsStore";
import {
  getReplies,
  addReply,
  updateReply,
  deleteRepliesForComment,
} from "@/utilities/repliesStore";

const siteId = process.env.NEXT_PUBLIC_WEBSITE_NAME_COMMENTSPLUG || "RockHeads-Survey";


// ✅ FIXED HANDLER (works for GET/POST/PUT/DELETE)
export async function GET(
  request: Request,
  context: { params: Promise<{ pageName: string }> }
) {
  try {
    const { pageName } = await context.params; // 👈 FIXED

    const [comments, replies] = await Promise.all([
      getComments(siteId, pageName),
      getReplies(siteId, pageName),
    ]);

    const commentsWithReplies = comments.map((comment: any) => ({
      ...comment,
      replies: replies.filter((reply: any) => reply.commentId === comment.id),
    }));

    return NextResponse.json(commentsWithReplies);
  } catch (error) {
    console.error("Error in GET comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ pageName: string }> }
) {
  try {
    const { pageName } = await context.params;
    const siteId = process.env.NEXT_PUBLIC_WEBSITE_NAME_COMMENTSPLUG || "Web-Dev-Chothani";
    if (!pageName?.trim()) {
      return NextResponse.json({ success: false, error: "Page name is required" }, { status: 400 });
    }

    const comment = await request.json();

    // Validate all required fields with proper type checking
    if (!comment) {
      return NextResponse.json({ success: false, error: "Comment data is required" }, { status: 400 });
    }

    // Validate text and user
    if (typeof comment.text !== 'string' || !comment.text.trim()) {
      return NextResponse.json({ success: false, error: "Comment text is required" }, { status: 400 });
    }
    if (typeof comment.user !== 'string' || !comment.user.trim()) {
      return NextResponse.json({ success: false, error: "User is required" }, { status: 400 });
    }

    // Validate coordinates
    if (typeof comment.x !== 'number' || typeof comment.y !== 'number' ||
      isNaN(comment.x) || isNaN(comment.y)) {
      return NextResponse.json({
        success: false,
        error: "Valid x and y coordinates are required"
      }, { status: 400 });
    }

    console.log("Creating comment:", {
      pageName,
      text: comment.text,
      user: comment.user,
      x: comment.x,
      y: comment.y
    });

    const result = await addComment(siteId, pageName, comment);

    if (!result.success) {
      console.error("Failed to add comment:", result.error);
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: result.data });

    if (!result.success) {
      console.error("Failed to add comment:", result.error);
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("Error in POST handler:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to add comment";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ pageName: string }> }
) {
  try {
    const { pageName } = await context.params; // 👈 FIXED
    const { commentId } = await request.json();

    if (!commentId) {
      return NextResponse.json(
        { success: false, error: "Comment ID is required" },
        { status: 400 }
      );
    }

    const commentResult = await deleteComment(siteId, pageName, commentId);
    if (!commentResult.success) {
      return NextResponse.json({ success: false, error: commentResult.error }, { status: 400 });
    }

    const repliesResult = await deleteRepliesForComment(pageName, commentId, siteId);
    if (!repliesResult.success) {
      console.error("Failed to delete replies:", repliesResult.error);
    }

    return NextResponse.json({ success: true, data: { id: commentId } });
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete comment",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ pageName: string }> }
) {
  try {
    const { pageName } = await context.params; // 👈 FIXED
    const { commentId, text, user, reply, edit, replyId, status } = await request.json();

    // Reply edit
    if (edit && replyId) {
      // const result = updateReply(pageName, commentId, replyId, text);
      const result = await updateReply(pageName, replyId, text, siteId);
      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: result.data });
    }

    // Add new reply
    if (reply) {
      if (!commentId || !text || !user) {
        return NextResponse.json(
          { success: false, error: "Missing required fields" },
          { status: 400 }
        );
      }
      const result = await addReply(siteId, pageName, commentId, commentId, { text, user });
      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }
      return NextResponse.json(result);
    }

    if (status && commentId) {
      const result = await updateComment(siteId, pageName, commentId, undefined, status);
      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, data: result.data });
    }
    // Edit comment
    if (edit && commentId) {
      if (!text) {
        return NextResponse.json(
          { success: false, error: "Text is required for comment update" },
          { status: 400 }
        );
      }
      const result = await updateComment(siteId, pageName, commentId, text);
      if (!result?.success) {
        return NextResponse.json(
          { success: false, error: result?.error || "Failed to update comment" },
          { status: 400 }
        );
      }
      if (!result.data || result.data.id !== commentId) {
        return NextResponse.json(
          { success: false, error: "Invalid comment data structure" },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: true, data: result.data });
    }


    return NextResponse.json({ success: false, error: "Invalid request type" }, { status: 400 });
  } catch (error) {
    console.error("Error in PUT handler:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
}
