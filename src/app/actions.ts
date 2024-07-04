"use server";
import { revalidatePath } from "next/cache";
import { throttle } from "lodash";
import db from "./api/db";

export async function addPlaylist(playlistName: string) {
  const randomString = Math.random().toString(36).substring(2, 12);
  const path = "/" + randomString;
  try {
    await db.addPlaylist(path, playlistName, 0);
    return randomString;
  } catch (e) {
    console.error(e);
  }
}

export async function renamePlaylist(playlistPath:string, newName : string) {
  const path = "/" + playlistPath;
  try {
    return await db.renamePlaylist(path, newName);
  } catch (e) {
    console.error(e);
  }
}

export async function upvoteTrack(index: number) {
  try {
    return await db.upvoteTrack(index);
  } catch (e) {
    console.error(e);
    return e;
  }
}

export async function downvoteTrack(index: number) {
  try {
    return await db.downvoteTrack(index);
  } catch (e) {
    console.error(e);
    return e;
  }
}
export const refresh = throttle(async (path: string) => {
  console.log("refreshing", path);
  revalidatePath(path);
}, 1000);
