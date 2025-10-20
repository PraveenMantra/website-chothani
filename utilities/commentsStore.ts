// import fs from "fs";
// import path from "path";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

// const filePath = path.join(process.cwd(), "data", "comments.json");

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY!,
  },
});
const BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET || "comments-plugin";

function isReadable(x: any): x is Readable {
  return x && typeof x.pipe === "function";
}

async function streamToString(stream: Readable): Promise<string> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

type CommentStatus = "open" | "resolved" | "DELETED";

interface Comment {
  id: string;
  text: string;
  user: string;
  x: number;
  y: number;
  pageName: string;
  createdAt: string;
  updatedAt: string;
  status: CommentStatus;
  siteId?: string

}


interface SuccessResponse {
  success: true;
  data: any;
}

interface ErrorResponse {
  success: false;
  error: string;
}

type OperationResponse = SuccessResponse | ErrorResponse;

const keyFor = (siteId: string, pageName: string) => `comments/${siteId}/${pageName}.json`;

async function loadArray(siteId: string, pageName: string): Promise<Comment[]> {
  const Key = keyFor(siteId, pageName);
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key }));
    const body = res.Body;
    if (isReadable(body)) {
      const txt = await streamToString(body);
      return JSON.parse(txt) as Comment[];
    } else {
      // body might be a blob/string in some runtimes
      const txt = (body as any).toString ? (body as any).toString() : "";
      return txt ? (JSON.parse(txt) as Comment[]) : [];
    }
  } catch (err: any) {
    // NoSuchKey / NotFound -> empty
    if (err?.$metadata?.httpStatusCode === 404 || err?.name === "NoSuchKey" || err?.code === "NoSuchKey") {
      return [];
    }
    console.error("Error loading comments from S3:", err);
    throw err;
  }
}

async function saveArray(siteId: string, pageName: string, arr: Comment[]): Promise<void> {
  const Key = keyFor(siteId, pageName);
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key,
    Body: JSON.stringify(arr, null, 2),
    ContentType: "application/json",
  }));
}

// function initializeCommentsFile() {
//   const dir = path.dirname(filePath);
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }
//   if (!fs.existsSync(filePath)) {
//     fs.writeFileSync(filePath, JSON.stringify({}, null, 2), 'utf-8');
//   }
// }

// Initialize data store
// let commentsData: Record<string, Comment[]>;

// try {
//   initializeCommentsFile();
//   const fileContent = fs.readFileSync(filePath, "utf-8");
//   commentsData = JSON.parse(fileContent);
//   console.log('Loaded initial comments data');
// } catch (error) {
//   console.error('Error loading initial comments data:', error);
//   commentsData = {};
// }

// function saveCommentsToFile() {
//   try {
//     // Create directory if it doesn't exist
//     const dir = path.dirname(filePath);
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     // Write the data with pretty formatting
//     fs.writeFileSync(filePath, JSON.stringify(commentsData, null, 2), 'utf-8');

//     // Verify the write was successful
//     const verifyContent = fs.readFileSync(filePath, 'utf-8');
//     const verifyData = JSON.parse(verifyContent);

//     // Compare the data
//     if (JSON.stringify(verifyData) !== JSON.stringify(commentsData)) {
//       throw new Error('Data verification failed after save');
//     }

//     console.log('Successfully saved and verified comments to file');
//     return true;
//   } catch (error) {
//     console.error('Error saving comments to file:', error);
//     return false;
//   }
// }

// export async function getComments(pageName: string, siteId: string,) {
//   try {
//     // Always read fresh data from file
//     const fileContent = await fs.promises.readFile(filePath, 'utf-8');
//     const freshData = JSON.parse(fileContent);
//     // Update the in-memory data
//     commentsData = freshData;
//     return freshData[pageName] || [];
//   } catch (error) {
//     console.error('Error reading comments file:', error);
//     return [];
//   }
// }

export async function getComments(siteId: string, pageName: string): Promise<Comment[]> {
  return await loadArray(siteId, pageName);
}




// export function updateReply(
//   pageName: string,
//   commentId: string,
//   replyId: string,
//   text: string
// ): OperationResponse {
//   try {
//     console.log("� Saving updated reply to file...");

//     // Load latest data
//     const fileContent = fs.readFileSync(filePath, "utf-8");
//     commentsData = JSON.parse(fileContent);

//     // Get the page comments
//     const pageComments = commentsData[pageName];
//     if (!pageComments) {
//       return { success: false, error: "Page not found" };
//     }

//     // Find and update the comment
//     const commentIndex = pageComments.findIndex(c => c.id === commentId);
//     if (commentIndex === -1) {
//       return { success: false, error: "Comment not found" };
//     }

//     // Update the JSON file
//     if (!saveCommentsToFile()) {
//       return { success: false, error: "Failed to save to file" };
//     }

//     // Return success
//     return {
//       success: true,
//       data: { id: replyId, text, updatedAt: new Date().toISOString() }
//     };
//   } catch (error) {
//     console.error("Error saving reply to file:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Failed to save to file"
//     };
//   }
// }




export async function addComment(siteId: string, pageName: string, comment: Omit<Comment, 'id' | 'pageName' | 'createdAt' | 'updatedAt' | 'siteId'>) {
  try {
    // Validate required fields
    if (!pageName?.trim()) {
      return { success: false, error: 'Page name is required' };
    }
    if (!comment.text?.trim()) {
      return { success: false, error: 'Comment text is required' };
    }
    if (!comment.user?.trim()) {
      return { success: false, error: 'User is required' };
    }
    if (typeof comment.x !== 'number' || typeof comment.y !== 'number') {
      return { success: false, error: 'Valid x and y coordinates are required' };
    }

    const arr = await loadArray(siteId, pageName);
    // Ensure we have fresh data
    // const fileContent = fs.readFileSync(filePath, 'utf-8');
    // commentsData = JSON.parse(fileContent);

    // Initialize the array for this page if it doesn't exist
    // if (!commentsData[pageName]) {
    //   commentsData[pageName] = [];
    // }

    const now = new Date().toISOString();
    // Add the comment with the page name and metadata
    const commentWithMetadata: Comment = {
      ...comment,
      id: `c${Date.now()}`,
      pageName,
      createdAt: now,
      updatedAt: now,
      // Ensure all required fields are present
      text: comment.text.trim(),
      user: comment.user.trim(),
      x: comment.x,
      y: comment.y,
      status: "open",
      siteId
    };
    arr.push(commentWithMetadata);
    await saveArray(siteId, pageName, arr);

    // Add to data structure
    // commentsData[pageName].push(commentWithMetadata);

    // Save and verify
    // if (!saveCommentsToFile()) {
    //   throw new Error('Failed to save comment to file');
    // }
    await saveArray(siteId, pageName, arr);

    return {
      success: true,
      data: commentWithMetadata
    };
  } catch (error) {
    console.error('Error in addComment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add comment'
    };
  }
}

export async function updateComment(
  siteId: string,
  pageName: string,
  commentId: string,
  text?: string,
  status?: "open" | "resolved" | "DELETED",
): Promise<OperationResponse> {
  // Parameter validation
  if (!pageName?.trim()) {
    return { success: false, error: 'Page name is required' };
  }
  if (!commentId?.trim()) {
    return { success: false, error: 'Comment ID is required' };
  }
  // if (!text?.trim()) {
  //   return { success: false, error: 'Comment text is required' };
  // }
  try {
    const arr = await loadArray(siteId, pageName);
    const idx = arr.findIndex(c => c.id === commentId);
    if (idx === -1) return { success: false, error: "Comment not found" };

    const old = arr[idx];
    arr[idx] = {
      ...old,
      text: text !== undefined ? text.trim() : old.text,
      status: status ?? old.status,
      updatedAt: new Date().toISOString(),
    };
    await saveArray(siteId, pageName, arr);
    // Always read fresh data
    // const fileContent = fs.readFileSync(filePath, 'utf-8');
    // commentsData = JSON.parse(fileContent);

    // const pageComments = commentsData[pageName];
    // if (!pageComments) {
    //   return { success: false, error: 'Page not found' };
    // }

    // const commentIndex = pageComments.findIndex(c => c.id === commentId);
    // if (commentIndex === -1) {
    //   return { success: false, error: 'Comment not found' };
    // }

    // const comment = commentsData[pageName][commentIndex];

    // const oldComment = pageComments[commentIndex];

    // Create updated comment
    // commentsData[pageName][commentIndex] = {
    //   ...commentsData[pageName][commentIndex],
    //   text,
    //   updatedAt: new Date().toISOString(),
    //   status: status ?? comment.status,
    // };

    // commentsData[pageName][commentIndex] = {
    //   ...oldComment,
    //   text: text !== undefined ? text.trim() : oldComment.text,
    //   status: status ?? oldComment.status ?? "open",
    //   updatedAt: new Date().toISOString()
    // };

    // if (!saveCommentsToFile()) {
    //   return { success: false, error: 'Failed to save to file' };
    // }
    return { success: true, data: arr[idx] };
    // return {
    //   success: true,
    //   data: commentsData[pageName][commentIndex]
    // };
  } catch (error) {
    console.error('Error in updateComment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update comment'
    };
  }
}

// export function deleteComment(pageName: string, commentId: string, siteId: string,) {
export async function deleteComment(siteId: string, pageName: string, commentId: string): Promise<OperationResponse> {
  try {
    const arr = await loadArray(siteId, pageName);
    if (!arr.some(c => c.id === commentId)) return { success: false, error: "Comment not found" };
    const filtered = arr.filter(c => c.id !== commentId);

    await saveArray(siteId, pageName, filtered);
    // Ensure we have fresh data
    // const fileContent = fs.readFileSync(filePath, 'utf-8');
    // commentsData = JSON.parse(fileContent);

    // Check if comment exists
    // if (!commentsData[pageName]?.some(c => c.id === commentId)) {
    //   return {
    //     success: false,
    //     error: 'Comment not found'
    //   };
    // }

    // Remove the comment
    // commentsData[pageName] = commentsData[pageName].filter(
    //   (c) => c.id !== commentId
    // );

    // Save and verify
    // if (!saveCommentsToFile()) {
    //   throw new Error('Failed to save changes to file');
    // }

    return {
      success: true,
      data: { id: commentId }
    };
  } catch (error) {
    console.error('Error in deleteComment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete comment'
    };
  }
}


