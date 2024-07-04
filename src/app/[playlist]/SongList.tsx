"use client";
import { Shippori_Antique } from "next/font/google";
import SongElement from "./SongElement";
import { useEffect, useState } from "react";
import Song from "./RenamePlaylist";
import { supabase } from "../api/db";

interface SongElementProps {
  id: number;
  track_id: string;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  previewUrl: string;
  enableDelete: boolean;
  votes: number;
  deleteTrack: (id: number) => void;
}
export default function SongList({pl, songData, plData, deleteTrack, liveUpdateTrackAction}) {
  const [songElements, setSongElements] = useState<SongElementProps[]>([]);
  useEffect(() => {
    const result = songData.map((song : any, index:number) => {
      return ({
        id: plData.tracks[index].id,
        track_id: song.id,
        title: song.name,
        artist: song.artists[0].name,
        album: song.album.name,
        albumArt: song.album.images[0].url,
        previewUrl: song.preview_url,
        enableDelete: false,
        votes: plData.tracks[index].votes,
        deleteTrack: deleteTrack,
      });
    });
    console.log('res', result)
    setSongElements(result);
  }, [songData, plData]);

  useEffect(() => {
  const listenToDb = supabase.channel(pl + "_listenToDb");
  listenToDb
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "tracks",
      },
      (p) => {
       console.log("INSERTED", p)
       liveUpdateTrackAction()
      },
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "tracks" },
      (p) => {
       console.log("UPDATED", p)
       liveUpdateTrackAction()
      },
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "tracks" },
      (p) => {
        console.log(p)
        liveUpdateTrackAction()
      },
    )
    .subscribe();

    return () => { listenToDb.unsubscribe()  };
  }, [pl]);

    return songElements?.map((song : any, index:number) => {
        return <SongElement
          key={song.id}
          id={song.id}
          track_id={song.track_id}
          title={song.title}
          artist={song.artist}
          album={song.album}
          albumArt={song.albumArt}
          previewUrl={song.previewUrl}
          enableDelete={false}
          votes={song.votes}
          deleteTrack={deleteTrack}
        />
      } )
  }
