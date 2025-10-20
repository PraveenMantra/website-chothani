// import fs from "fs";
// import path from "path";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

// const repliesFilePath = path.join(process.cwd(), "data", "replies.json");

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

interface Reply {
  id: string;
  commentId: string;
  text: string;
  user: string;
  pageName: string;
  createdAt: string;
  updatedAt: string;
  parentId?: string;
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

const keyFor = (siteId: string, pageName: string) => `replies/${siteId}/${pageName}.json`;

async function loadArray(siteId: string, pageName: string): Promise<Reply[]> {
  const Key = keyFor(siteId, pageName);
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key }));
    const body = res.Body;
    if (isReadable(body)) {
      const txt = await streamToString(body);
      return JSON.parse(txt) as Reply[];
    } else {
      const txt = (body as any).toString ? (body as any).toString() : "";
      return txt ? (JSON.parse(txt) as Reply[]) : [];
    }
  } catch (err: any) {
    if (err?.$metadata?.httpStatusCode === 404 || err?.name === "NoSuchKey" || err?.code === "NoSuchKey") {
      return [];
    }
    console.error("Error loading replies from S3:", err);
    throw err;
  }
}

async function saveArray(siteId: string, pageName: string, arr: Reply[]): Promise<void> {
  const Key = keyFor(siteId, pageName);
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key,
    Body: JSON.stringify(arr, null, 2),
    ContentType: "application/json",
  }));
}

// Load initial data
// let repliesData: Record<string, Reply[]>;

// function initializeRepliesFile() {
//   const dir = path.dirname(repliesFilePath);
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }
//   if (!fs.existsSync(repliesFilePath)) {
//     fs.writeFileSync(repliesFilePath, JSON.stringify({}, null, 2), 'utf-8');
//   }
// }

// try {
//   initializeRepliesFile();
//   const fileContent = fs.readFileSync(repliesFilePath, "utf-8");
//   repliesData = JSON.parse(fileContent);
//   console.log('Loaded initial replies data');
// } catch (error) {
//   console.error('Error loading initial replies data:', error);
//   repliesData = {};
// }

// function saveRepliesToFile() {
//   try {
//     // Create directory if it doesn't exist
//     const dir = path.dirname(repliesFilePath);
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     // Write the data
//     fs.writeFileSync(repliesFilePath, JSON.stringify(repliesData, null, 2), 'utf-8');

//     // Verify the write was successful
//     const verifyContent = fs.readFileSync(repliesFilePath, 'utf-8');
//     const verifyData = JSON.parse(verifyContent);

//     if (JSON.stringify(verifyData) !== JSON.stringify(repliesData)) {
//       throw new Error('Data verification failed after save');
//     }

//     console.log('Successfully saved and verified replies to file');
//     return true;
//   } catch (error) {
//     console.error('Error saving replies to file:', error);
//     return false;
//   }
// }


// export async function getReplies(siteId: string, pageName: string, commentId?: string) {
//   try {
//     const fileContent = await fs.promises.readFile(repliesFilePath, "utf-8");
//     const freshData = JSON.parse(fileContent);
//     repliesData = freshData;

//     const pageReplies: Reply[] = freshData[pageName] || [];

//     // Optionally filter by comment
//     let relevantReplies = commentId
//       ? pageReplies.filter(r => r.commentId === commentId)
//       : pageReplies;

//     // Build tree
//     const replyMap: Record<string, Reply & { replies: Reply[] }> = {};
//     relevantReplies.forEach(r => {
//       replyMap[r.id] = { ...r, replies: [] };
//     });

//     const roots: (Reply & { replies: Reply[] })[] = [];

//     relevantReplies.forEach(r => {
//       if (r.parentId && replyMap[r.parentId]) {
//         replyMap[r.parentId].replies.push(replyMap[r.id]);
//       } else {
//         roots.push(replyMap[r.id]);
//       }
//     });

//     return roots;
//   } catch (error) {
//     console.error("Error reading replies file:", error);
//     return [];
//   }
// }

export async function getReplies(siteId: string, pageName: string, commentId?: string) {
  const arr = await loadArray(siteId, pageName);
  const filtered = commentId ? arr.filter(r => r.commentId === commentId) : arr;

  // build hierarchical tree (roots + nested replies)
  const map: Record<string, (Reply & { replies: Reply[] })> = {};
  filtered.forEach(r => map[r.id] = { ...r, replies: [] });

  const roots: (Reply & { replies: Reply[] })[] = [];
  filtered.forEach(r => {
    if (r.parentId && map[r.parentId]) {
      map[r.parentId].replies.push(map[r.id]);
    } else {
      roots.push(map[r.id]);
    }
  });

  return roots;
}



export async function addReply(
  siteId: string,
  pageName: string,
  commentId: string,
  parentId: string | undefined,
  reply: Omit<Reply, 'id' | 'pageName' | 'createdAt' | 'updatedAt' | 'siteId' | 'commentId'>
): Promise<OperationResponse> {
  try {
    if (!pageName?.trim()) return { success: false, error: "Page name required" };
    if (!commentId) return { success: false, error: "Comment id required" };
    if (!reply.text?.trim()) return { success: false, error: "Reply text required" };
    if (!reply.user?.trim()) return { success: false, error: "User required" };

    const arr = await loadArray(siteId, pageName);
    // Ensure we have fresh data
    // const fileContent = fs.readFileSync(repliesFilePath, 'utf-8');
    // repliesData = JSON.parse(fileContent);

    // Initialize replies array for the page if it doesn't exist
    // if (!repliesData[pageName]) {
    //   repliesData[pageName] = [];
    // }

    const now = new Date().toISOString();
    // const newReply: Reply = {
    //   id: Date.now().toString(),
    //   commentId,
    //   parentId: targetId, // could be commentId or replyId
    //   ...reply,
    //   pageName,
    //   createdAt: now,
    //   updatedAt: now,
    //   siteId
    // };
    const newReply: Reply = {
      id: Date.now().toString(),
      commentId,
      parentId,
      ...reply,
      pageName,
      createdAt: now,
      updatedAt: now,
      siteId,
    };

    arr.push(newReply);
    await saveArray(siteId, pageName, arr);

    // repliesData[pageName].push(newReply);

    // if (!saveRepliesToFile()) {
    //   throw new Error('Failed to save reply to file');
    // }

    return {
      success: true,
      data: newReply
    };
  } catch (error) {
    console.error('Error in addReply:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add reply'
    };
  }
}

export async function updateReply(
  pageName: string,
  replyId: string,
  text: string,
  siteId: string,): Promise<OperationResponse> {
  // try {
  //   // Load latest data
  //   const fileContent = fs.readFileSync(repliesFilePath, 'utf-8');
  //   repliesData = JSON.parse(fileContent);

  //   const pageReplies = repliesData[pageName];
  //   if (!pageReplies) {
  //     return { success: false, error: "Page not found" };
  //   }

  //   // const replyIndex = pageReplies.findIndex(r => r.id === replyId && r.commentId === commentId);
  //   const replyIndex = pageReplies.findIndex(r => r.id === replyId);
  //   if (replyIndex === -1) {
  //     return { success: false, error: "Reply not found" };
  //   }

  //   // Update the reply
  //   repliesData[pageName][replyIndex] = {
  //     ...repliesData[pageName][replyIndex],
  //     text,
  //     updatedAt: new Date().toISOString()
  //   };

  //   if (!saveRepliesToFile()) {
  //     return { success: false, error: "Failed to save to file" };
  //   }

  //   return {
  //     success: true,
  //     data: repliesData[pageName][replyIndex]
  //   };
  // } catch (error) {
  //   console.error('Error updating reply:', error);
  //   return {
  //     success: false,
  //     error: error instanceof Error ? error.message : "Failed to update reply"
  //   };
  // }
  try {
    const arr = await loadArray(siteId, pageName);
    const idx = arr.findIndex(r => r.id === replyId);
    if (idx === -1) return { success: false, error: "Reply not found" };
    arr[idx] = { ...arr[idx], text: text !== undefined ? text.trim() : arr[idx].text, updatedAt: new Date().toISOString() };
    await saveArray(siteId, pageName, arr);
    return { success: true, data: arr[idx] };
  } catch (err) {
    console.error("updateReply error:", err);
    return { success: false, error: err instanceof Error ? err.message : "Failed to update reply" };
  }
}



// export function deleteRepliesForComment(pageName: string, commentId: string, siteId: string): OperationResponse {
//   try {
//     const fileContent = fs.readFileSync(repliesFilePath, "utf-8");
//     repliesData = JSON.parse(fileContent);

//     if (!repliesData[pageName]) {
//       return { success: true, data: null };
//     }

//     // Keep only replies not belonging to this comment
//     repliesData[pageName] = repliesData[pageName].filter(r => r.commentId !== commentId);

//     if (!saveRepliesToFile()) {
//       return { success: false, error: "Failed to save to file" };
//     }

//     return { success: true, data: null };
//   } catch (error) {
//     console.error("Error deleting replies:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Failed to delete replies"
//     };
//   }
// }

export async function deleteRepliesForComment(pageName: string, commentId: string, siteId: string): Promise<OperationResponse> {
  try {
    const arr = await loadArray(siteId, pageName);
    const filtered = arr.filter(r => r.commentId !== commentId);
    await saveArray(siteId, pageName, filtered);
    return { success: true, data: null };
  } catch (err) {
    console.error("deleteRepliesForComment error:", err);
    return { success: false, error: err instanceof Error ? err.message : "Failed to delete replies" };
  }
}

