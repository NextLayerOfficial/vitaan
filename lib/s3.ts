/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME,
} = process.env;

if (
  !AWS_REGION ||
  !AWS_ACCESS_KEY_ID ||
  !AWS_SECRET_ACCESS_KEY ||
  !AWS_S3_BUCKET_NAME
) {
  throw new Error("Missing AWS S3 environment variables");
}

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export async function getObjectUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 60 }); // 60 seconds
}

export async function getPresignedUploadUrl({
  filename,
  filetype,
}: {
  filename: string;
  filetype: string;
}) {
  // const key = `users/${filename}`;
  const ext = filename.split(".").pop();
  const uuid = uuidv4();
  const key = `private/${uuid}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME!,
    Key: key,
    ContentType: filetype,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 120 });

  return { uploadUrl, key };
}

export async function getPresignedPublicUploadUrl({
  filename,
  filetype,
}: {
  filename: string;
  filetype: string;
}) {
  const ext = filename.split(".").pop();
  const uuid = uuidv4();
  const key = `public/${uuid}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME!,
    Key: key,
    ContentType: filetype,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  const publicUrl = `https://${AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  return { uploadUrl, key, publicUrl };
}

// lib/s3.ts
export async function deleteObject(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
  });

  try {
    await s3Client.send(command);
    console.log(`Successfully deleted ${key} from S3`);
  } catch (error) {
    console.error(`Error deleting ${key} from S3:`, error);
    throw new Error("Failed to delete file from S3");
  }
}

