"use server";
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
