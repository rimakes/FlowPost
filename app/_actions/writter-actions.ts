"use server";

import { db } from "@/lib/prisma";
import { wait } from "@/lib/utils";
import { Pure } from "@/types/types";
import { LinkedinPost, Post } from "@prisma/client";
import { MutableRefObject } from "react";
import fs from "fs";
import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";
import path from "path";
import cloudinary from "cloudinary";

export async function testingServer(input: string) {
  await wait(3000);
  console.log(input);
}

export async function createLinkedinPost(post: string) {
  console.log("holasssss");
  const user = await db.linkedinPost.create({
    data: {
      content: post,
      author: {
        handle: "Ricardo Sala",
        name: "Ricardo Sala",
        pictureUrl: "Ricardo Sala",
      },
    },
  });
  console.log(user);
}

export const createWebmFile = async (formData: FormData) => {
  try {
    console.log(formData);
    // Save the formdata to a file
    const fileRaw = formData.get("audio") as File;
    const buffer = await fileRaw.arrayBuffer();
    const file = Buffer.from(buffer);
    const fileName = `audio.webm`;
    const filePath = `audio/${fileName}`;
    fs.writeFileSync(filePath, file);

    // Process the file using OpenAIWhisperAudio
    const loader = new OpenAIWhisperAudio(filePath, {
      clientOptions: {
        // TODO: How can we add parameters to the client?
        // response_format: 'vtt',
      },
    });
    const docs = await loader.load();
    console.log(docs);

    // Retrieve the content from the processed file
    const content = docs[0].pageContent;

    // Delete the file after processing
    fs.unlinkSync(filePath);

    return content;
  } catch (error) {
    console.error("Error processing the audio file:", error);
    throw error; // Rethrow the error for handling at a higher level
  }
};
